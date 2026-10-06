import { supabase } from './supabase.js';
import { getProfile, updateProfile } from './profile.js';
import { trackActivity } from './activity-tracker.js';

// Expose AuthManager globally
export const AuthManager = {
  supabase,
  currentUser: null,
  currentProfile: null,

  async init() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        await this.handleUserLogin(session.user);
      } else {
        this.handleUserLogout();
      }
    } catch (err) {
      console.warn("Session check notice:", err);
      this.handleUserLogout();
    }

    supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session && session.user) {
        await this.handleUserLogin(session.user);
      } else if (event === 'SIGNED_OUT') {
        this.handleUserLogout();
      }
    });
  },

  async handleUserLogin(user) {
    this.currentUser = user;
    user.uid = user.id;

    let profile = await getProfile(user.id);
    if (!profile) {
      const userMetadata = user.user_metadata || {};
      const newProfile = {
        id: user.id,
        display_name: userMetadata.full_name || userMetadata.name || (user.email ? user.email.split('@')[0] : 'User'),
        avatar_url: userMetadata.avatar_url || userMetadata.picture || null,
        email: user.email,
        golden_tick: false,
        updated_at: new Date().toISOString(),
      };
      profile = await updateProfile(user.id, newProfile);
    }

    await trackActivity({ activity_type: 'page_view' });

    const userEmail = (user.email || '').toLowerCase();
    const isOwner = userEmail === 'harshguruji01@gmail.com';
    let isContributor = isOwner;

    try {
      const { data: contributorData } = await supabase
        .from('contributors')
        .select('id, status, verified')
        .eq('user_id', user.id)
        .in('status', ['ACTIVE', 'approved'])
        .maybeSingle();

      if (contributorData && (contributorData.verified === true || contributorData.status === 'ACTIVE')) {
        isContributor = true;
      }

      if (profile && profile.golden_tick === true && !isContributor) {
        profile.golden_tick = false;
        await supabase
          .from('profiles')
          .update({ golden_tick: false })
          .eq('id', user.id);
      }

      if (profile && profile.golden_tick !== true && isContributor) {
        profile.golden_tick = true;
        await supabase
          .from('profiles')
          .update({ golden_tick: true })
          .eq('id', user.id);
      }
    } catch(err) {
      console.warn("Contributor status check notice:", err);
    }

    this.currentProfile = profile;

    window.dispatchEvent(new CustomEvent('auth-state-changed', { 
      detail: { user: this.currentUser, profile: this.currentProfile } 
    }));
  },

  handleUserLogout() {
    this.currentUser = null;
    this.currentProfile = null;
    window.dispatchEvent(new CustomEvent('auth-state-changed', { 
      detail: { user: null, profile: null } 
    }));
  }
};

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Supabase sign out error:", error);
    throw error;
  }
  window.location.reload();
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) return null;
  return session;
}

window.AuthManager = AuthManager;
AuthManager.init();
