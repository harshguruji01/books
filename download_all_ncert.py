"""
=============================================================================
HarshGuruJi — Official NCERT Books Mass Downloader & Publisher
Downloads authentic textbooks directly from NCERT (ncert.nic.in)
Usage:
  python download_all_ncert.py --core       (Download core textbooks for Classes 1 to 12)
  python download_all_ncert.py --class 10   (Download all textbooks for specific class)
  python download_all_ncert.py --all        (Download all 1,246 textbooks)
=============================================================================
"""

import os
import sys
import json
import time
import argparse
import urllib.request
import ssl

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PDF_DIR = os.path.join(BASE_DIR, 'pdf')
CATALOG_PATH = os.path.join(BASE_DIR, 'js', 'ncert-master-catalog.json')
ENGINE_PATH = os.path.join(BASE_DIR, 'js', 'books-engine.js')

os.makedirs(PDF_DIR, exist_ok=True)

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://ncert.nic.in/textbook.php',
    'Accept': 'application/pdf,*/*'
}

def load_catalog():
    if not os.path.exists(CATALOG_PATH):
        print(f"Error: Catalog not found at {CATALOG_PATH}")
        sys.exit(1)
    with open(CATALOG_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def download_book_pdf(book, max_retries=2):
    code = book.get('code')
    if not code:
        return False

    fname = f"{code}01.pdf"
    dest = os.path.join(PDF_DIR, fname)
    if os.path.exists(dest) and os.path.getsize(dest) > 10000:
        return True

    url = f"https://ncert.nic.in/textbook/pdf/{code}01.pdf"

    for attempt in range(max_retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, context=CTX, timeout=15) as resp:
                data = resp.read()
                if len(data) > 1000:
                    with open(dest, 'wb') as f:
                        f.write(data)
                    print(f"  [OK] Class {book.get('class'):>2} | {book.get('subject'):<18} | {book.get('book'):<25} ({len(data)//1024} KB)")
                    return True
        except Exception as e:
            if attempt == max_retries - 1:
                print(f"  [Skip] Class {book.get('class'):>2} | {book.get('book'):<25} ({e})")
            time.sleep(0.3)
    return False

def update_engine_local_cache():
    if not os.path.exists(ENGINE_PATH):
        return

    existing_files = os.listdir(PDF_DIR)
    local_map = {}
    for f in existing_files:
        if f.endswith('.pdf') and len(f) > 6:
            code = f[:-6] # e.g. jemh101.pdf -> jemh1
            local_map[code] = f"pdf/{f}"

    print(f"\\nUpdating books-engine.js with {len(local_map)} local PDF maps...")
    with open(ENGINE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    import re
    # Replace LOCAL_PDFS block
    map_str = json.dumps(local_map, indent=4)
    new_block = f"const LOCAL_PDFS = {map_str};"
    content = re.sub(r'const LOCAL_PDFS = \{.*?\};', new_block, content, flags=re.DOTALL)

    with open(ENGINE_PATH, 'w', encoding='utf-8') as f:
        f.write(content)
    print("books-engine.js local PDF registry updated successfully!")

def main():
    parser = argparse.ArgumentParser(description="NCERT Mass Downloader")
    parser.add_argument('--class', dest='cls', type=str, help="Specific class to download (1-12)")
    parser.add_argument('--core', action='store_true', help="Download core textbooks for Classes 1 to 12")
    parser.add_argument('--all', action='store_true', help="Download all 1,246 textbooks")
    args = parser.parse_args()

    catalog = load_catalog()
    print(f"Loaded master catalog with {len(catalog)} textbooks across Classes 1-12.")

    to_download = []
    if args.cls:
        to_download = [b for b in catalog if str(b.get('class')) == str(args.cls)]
        print(f"Targeting Class {args.cls}: {len(to_download)} textbooks.")
    elif args.core:
        # Pick 2-3 main textbooks per class (Maths, Science, English, Hindi, Physics, Chemistry, Biology)
        core_subjects = {'Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 'Social Science'}
        for c in range(1, 13):
            class_books = [b for b in catalog if b.get('class') == str(c) and b.get('subject') in core_subjects]
            to_download.extend(class_books[:3])
        print(f"Targeting Core textbooks across Classes 1-12: {len(to_download)} textbooks.")
    elif args.all:
        to_download = catalog
        print(f"Targeting ALL {len(to_download)} textbooks from NCERT.")
    else:
        # Default: Core textbooks
        core_subjects = {'Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi'}
        for c in range(1, 13):
            class_books = [b for b in catalog if b.get('class') == str(c) and b.get('subject') in core_subjects]
            to_download.extend(class_books[:2])
        print(f"No option specified. Defaulting to Core {len(to_download)} textbooks (use --all or --class).")

    print(f"\\nStarting download routine to: {PDF_DIR}\\n")
    success_count = 0
    for idx, b in enumerate(to_download, 1):
        ok = download_book_pdf(b)
        if ok:
            success_count += 1
        time.sleep(0.15) # polite rate limiting

    print(f"\\nDownload routine finished! Successfully ready: {success_count}/{len(to_download)} textbooks.")
    update_engine_local_cache()

if __name__ == '__main__':
    main()
