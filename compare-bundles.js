import { readFileSync, statSync } from 'fs';

function getFileSize(path) {
  try {
    return statSync(path).size;
  } catch (e) {
    return 0;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function readBundleContent(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch (e) {
    return '';
  }
}

const namedSize = getFileSize('dist/named-exports/named-exports.js');
const classOptimizedSize = getFileSize('dist/class-optimized/class-optimized.js');
const classHeavySize = getFileSize('dist/class-heavy/class-heavy.js');

console.log('\n=== Bundle Size Comparison ===');
console.log(`Named exports (BEST):              ${formatBytes(namedSize)}`);
console.log(`Class optimized (GOOD):            ${formatBytes(classOptimizedSize)}`);
console.log(`Class with heavy fields (WORST):   ${formatBytes(classHeavySize)}`);

console.log(`\n=== Tree-shaking Analysis ===`);
if (namedSize > 0 && classOptimizedSize > 0) {
  const savings = classOptimizedSize - namedSize;
  console.log(`Class overhead: ${formatBytes(savings)} (${((savings) / classOptimizedSize * 100).toFixed(1)}% larger)`);
}

if (namedSize > 0 && classHeavySize > 0) {
  const heavySavings = classHeavySize - namedSize;
  console.log(`Heavy class penalty: ${formatBytes(heavySavings)} (${((heavySavings) / classHeavySize * 100).toFixed(1)}% larger)`);
}

// Analyze bundle contents
const namedBundle = readBundleContent('dist/named-exports/named-exports.js');
const classOptimizedBundle = readBundleContent('dist/class-optimized/class-optimized.js');
const classHeavyBundle = readBundleContent('dist/class-heavy/class-heavy.js');

console.log(`\n=== Bundle Analysis ===`);

if (namedBundle) {
  console.log(`\nNamed Exports Bundle:`);
  console.log(`  Lines: ${namedBundle.split('\n').length}`);
  console.log(`  Contains heavy dependencies: ${namedBundle.includes('processHeavyData') ? 'YES ❌' : 'NO ✅'}`);
}

if (classOptimizedBundle) {
  console.log(`\nClass Optimized Bundle:`);
  console.log(`  Lines: ${classOptimizedBundle.split('\n').length}`);
  console.log(`  Contains heavy dependencies: ${classOptimizedBundle.includes('processHeavyData') ? 'YES ❌' : 'NO ✅'}`);
}

if (classHeavyBundle) {
  console.log(`\nClass Heavy Bundle:`);
  console.log(`  Lines: ${classHeavyBundle.split('\n').length}`);
  console.log(`  Contains heavy dependencies: ${classHeavyBundle.includes('processHeavyData') ? 'YES ❌' : 'NO ✅'}`);
  console.log(`  Contains static fields: ${classHeavyBundle.includes('HEAVY_DATA') ? 'YES ❌' : 'NO ✅'}`);
}

console.log(`\n=== Conclusion ===`);
console.log(`✅ Named exports provide the best tree-shaking`);
console.log(`⚠️  Classes can work well with careful import patterns`);
console.log(`❌ Static fields in classes prevent tree-shaking`);