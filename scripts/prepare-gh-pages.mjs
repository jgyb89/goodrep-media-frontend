import fs from 'node:fs';
import path from 'node:path';

const BASE = '/goodrep-media-frontend';

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (
      file.endsWith('.html') ||
      file.endsWith('.js') ||
      file.endsWith('.css') ||
      file.endsWith('.xml')
    ) {
      results.push(full);
    }
  }
  return results;
}

const files = walk('dist');
let modifiedCount = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Replace href="/..." except when already prefixed or external
  content = content.replace(
    /href="\/((?!goodrep-media-frontend\/|\/|http|#|mailto|tel)[^"]*)"/g,
    `href="${BASE}/$1"`,
  );
  // Replace src="/..." except when already prefixed or external
  content = content.replace(
    /src="\/((?!goodrep-media-frontend\/|\/|http|data:)[^"]*)"/g,
    `src="${BASE}/$1"`,
  );
  // Replace poster="/..."
  content = content.replace(
    /poster="\/((?!goodrep-media-frontend\/|\/|http)[^"]*)"/g,
    `poster="${BASE}/$1"`,
  );
  // Replace url("/...") or url('/...')
  content = content.replace(
    /url\((['"]?)\/((?!goodrep-media-frontend\/|\/|http|data:)[^'")]+)\1\)/g,
    `url($1${BASE}/$2$1)`,
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
  }
}

console.log(`[gh-pages] Processed ${files.length} files. Updated ${modifiedCount} files with base prefix: ${BASE}`);
