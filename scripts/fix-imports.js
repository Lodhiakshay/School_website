const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, '..', 'src'));
let count = 0;
let remaining = [];

files.forEach((f) => {
  let content = fs.readFileSync(f, 'utf8');
  let updated = content
    .replace(/from\s+['"]([^'"]+)\.js['"]/g, "from '$1'")
    .replace(/import\s+['"]([^'"]+)\.js['"]/g, "import '$1'")
    .replace(/import\((['"])([^'"]+)\.js\1\)/g, "import('$2')");

  if (updated !== content) {
    fs.writeFileSync(f, updated, 'utf8');
    count++;
  }

  if (updated.includes('.js\'') || updated.includes('.js"')) {
    remaining.push(f);
  }
});

console.log(`Cleaned .js in ${count} files.`);
console.log(`Remaining files with .js in imports:`, remaining);

