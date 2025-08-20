import { readFileSync, statSync, readdirSync } from 'fs';
import { join } from 'path';

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

function findJSFiles(dir) {
  try {
    const files = readdirSync(dir, { recursive: true });
    return files.filter(file => file.endsWith('.js') && !file.includes('webpack-runtime'))
                .map(file => join(dir, file));
  } catch (e) {
    return [];
  }
}

function getTotalBundleSize(dir) {
  const jsFiles = findJSFiles(dir);
  return jsFiles.reduce((total, file) => total + getFileSize(file), 0);
}

const bundlerType = process.argv[2] || 'vite';

let namedSize, classOptimizedSize, classHeavySize;
let namedBundle, classOptimizedBundle, classHeavyBundle;

if (bundlerType === 'vite') {
  console.log('\n=== Vite/Rollup Bundle Analysis ===');
  namedSize = getFileSize('dist/named-exports/named-exports.js');
  classOptimizedSize = getFileSize('dist/class-optimized/class-optimized.js');
  classHeavySize = getFileSize('dist/class-heavy/class-heavy.js');
  
  namedBundle = readBundleContent('dist/named-exports/named-exports.js');
  classOptimizedBundle = readBundleContent('dist/class-optimized/class-optimized.js');
  classHeavyBundle = readBundleContent('dist/class-heavy/class-heavy.js');
} else if (bundlerType === 'turbopack') {
  console.log('\n=== Turbopack Bundle Analysis ===');
  namedSize = getTotalBundleSize('dist/turbopack-named-exports');
  classOptimizedSize = getTotalBundleSize('dist/turbopack-class-optimized');
  classHeavySize = getTotalBundleSize('dist/turbopack-class-heavy');
  
  // For content analysis, find main JS files
  const namedFiles = findJSFiles('dist/turbopack-named-exports');
  const optimizedFiles = findJSFiles('dist/turbopack-class-optimized');
  const heavyFiles = findJSFiles('dist/turbopack-class-heavy');
  
  namedBundle = namedFiles.map(readBundleContent).join('\n');
  classOptimizedBundle = optimizedFiles.map(readBundleContent).join('\n');
  classHeavyBundle = heavyFiles.map(readBundleContent).join('\n');
} else if (bundlerType === 'webpack') {
  console.log('\n=== Webpack Bundle Analysis ===');
  namedSize = getTotalBundleSize('dist/turbopack-named-exports');
  classOptimizedSize = getTotalBundleSize('dist/turbopack-class-optimized');
  classHeavySize = getTotalBundleSize('dist/turbopack-class-heavy');
  
  const namedFiles = findJSFiles('dist/turbopack-named-exports');
  const optimizedFiles = findJSFiles('dist/turbopack-class-optimized');
  const heavyFiles = findJSFiles('dist/turbopack-class-heavy');
  
  namedBundle = namedFiles.map(readBundleContent).join('\n');
  classOptimizedBundle = optimizedFiles.map(readBundleContent).join('\n');
  classHeavyBundle = heavyFiles.map(readBundleContent).join('\n');
}

console.log(`\n=== ${bundlerType.toUpperCase()} Bundle Size Comparison ===`);
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

console.log(`\n=== Bundle Analysis ===`);

if (namedBundle) {
  console.log(`\nNamed Exports Bundle:`);
  console.log(`  Size: ${formatBytes(namedSize)}`);
  console.log(`  Contains heavy dependencies: ${namedBundle.includes('processHeavyData') || namedBundle.includes('HEAVY_DATA') ? 'YES ❌' : 'NO ✅'}`);
}

if (classOptimizedBundle) {
  console.log(`\nClass Optimized Bundle:`);
  console.log(`  Size: ${formatBytes(classOptimizedSize)}`);
  console.log(`  Contains heavy dependencies: ${classOptimizedBundle.includes('processHeavyData') || classOptimizedBundle.includes('HEAVY_DATA') ? 'YES ❌' : 'NO ✅'}`);
}

if (classHeavyBundle) {
  console.log(`\nClass Heavy Bundle:`);
  console.log(`  Size: ${formatBytes(classHeavySize)}`);
  console.log(`  Contains heavy dependencies: ${classHeavyBundle.includes('processHeavyData') || classHeavyBundle.includes('HEAVY_DATA') ? 'YES ❌' : 'NO ✅'}`);
  console.log(`  Contains static fields: ${classHeavyBundle.includes('HEAVY_DATA') || classHeavyBundle.includes('COMPUTED_VALUE') ? 'YES ❌' : 'NO ✅'}`);
}

console.log(`\n=== ${bundlerType.toUpperCase()} Conclusion ===`);
if (bundlerType === 'turbopack') {
  console.log(`🚀 Turbopack tree-shaking performance`);
} else if (bundlerType === 'webpack') {
  console.log(`⚙️  Webpack tree-shaking performance`);
} else {
  console.log(`⚡ Vite/Rollup tree-shaking performance`);
}
console.log(`✅ Named exports provide the best tree-shaking`);
console.log(`⚠️  Classes can work well with careful import patterns`);
console.log(`❌ Static fields in classes prevent tree-shaking`);