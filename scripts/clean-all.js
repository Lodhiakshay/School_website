const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
      results.push(fullPath);
    }
  });
  return results;
}

const baseDir = path.join(__dirname, '..');
const files = walk(path.join(baseDir, 'src')).concat(walk(path.join(baseDir, 'scripts')));
let fixedCount = 0;

files.forEach((f) => {
  let content = fs.readFileSync(f, 'utf8');
  let updated = content
    .replace(/from\s+['"]([^'"]+)\.js['"]/g, "from '$1'")
    .replace(/import\s+['"]([^'"]+)\.js['"]/g, "import '$1'")
    .replace(/import\((['"])([^'"]+)\.js\1\)/g, "import('$2')");

  if (updated !== content) {
    fs.writeFileSync(f, updated, 'utf8');
    fixedCount++;
    console.log('Fixed:', f);
  }
});

console.log('Total files cleaned:', fixedCount);

