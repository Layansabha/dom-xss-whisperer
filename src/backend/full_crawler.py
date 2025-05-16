import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import subprocess

def get_subdomains(domain):
    try:
        result = subprocess.run(["assetfinder", "--subs-only", domain], stdout=subprocess.PIPE, text=True)
        subs = result.stdout.strip().split("\n")
        return list(set([s for s in subs if s.strip()]))
    except Exception as e:
        print(f"[ERROR] Failed to get subdomains: {e}")
        return []

def is_live(url):
    try:
        res = requests.get(url, timeout=5)
        return res.status_code < 400
    except:
        return False

def crawl_links(base_url):
    found = set()
    try:
        r = requests.get(base_url, timeout=5)
        if r.status_code >= 400:
            return []
        soup = BeautifulSoup(r.text, "html.parser")
        for tag in soup.find_all(['a', 'script', 'iframe']):
            attr = 'src' if tag.name in ['script', 'iframe'] else 'href'
            link = tag.get(attr)
            if link:
                full_url = urljoin(base_url, link)
                if full_url.startswith("http"):
                    found.add(full_url)
    except:
        pass
    return list(found)

def crawl_domain_with_subs(domain):
    all_links = set()
    subdomains = get_subdomains(domain)
    subdomains.append(domain)  # include main domain

    for sub in subdomains:
        url = f"http://{sub}"
        if not is_live(url):
            continue

        pages = crawl_links(url)
        for page in pages:
            if is_live(page):
                all_links.add(page)

    return list(all_links)
