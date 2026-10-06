import { supabase } from './supabase.js';

export async function trackActivity(eventParams) {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session || !session.user) return; // Only track authenticated users
        
        const userId = session.user.id;
        
        // Auto-detect missing fields
        const path = window.location.pathname;
        let defaultPageType = 'books';
        const normalPages = ['/', '/index.html', 'books.html'];
        
        if (normalPages.some(p => path.endsWith(p))) defaultPageType = 'books';
        
        let defaultPageName = document.title ? document.title.split('|')[0].split('-')[0].trim() : "HarshGuruJi Books";
        const metaTitle = document.querySelector('meta[name="hg-page-title"]');
        if (metaTitle) defaultPageName = metaTitle.content;

        const payload = {
            user_id: userId,
            activity_type: eventParams.activity_type || 'page_view',
            page_type: eventParams.page_type || defaultPageType,
            page_name: eventParams.page_name || defaultPageName,
            page_path: eventParams.page_path || path,
            metadata: eventParams.metadata || {}
        };
        
        // Prevent massive duplicate page_view floods in single session state changes
        if (payload.activity_type === 'page_view') {
            const cacheKey = `last_page_view_${payload.page_path}`;
            const lastView = sessionStorage.getItem(cacheKey);
            const now = Date.now();
            if (lastView && now - parseInt(lastView) < 60000) {
                return;
            }
            sessionStorage.setItem(cacheKey, now.toString());
        }

        await supabase.from('user_activity').insert([payload]);
    } catch (err) {
        // Silently catch tracking errors so application flow is never disrupted
        console.warn("Activity tracking notice:", err);
    }
}

// Expose globally
window.trackActivity = trackActivity;
