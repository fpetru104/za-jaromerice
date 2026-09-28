import re

with open('script.js', 'r', encoding='utf-8') as f:
    text = f.read()

ids = re.findall(r'document\.getElementById\(["\']([^"\']+)["\']\)', text)
print('IDs in script.js:', set(ids))

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

for i in set(ids):
    if f'id="{i}"' not in html and f"id='{i}'" not in html:
        print(f'MISSING ID in index.html: {i}')

print('Done checking IDs.')
