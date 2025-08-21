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

let bundleSize, bundleContent;

if (bundlerType === 'vite') {
  console.log('\n=== Vite/Rollup Tree-shaking Test ===');
  bundleSize = getFileSize('dist/class-heavy/class-heavy.js');
  bundleContent = readBundleContent('dist/class-heavy/class-heavy.js');
} else if (bundlerType === 'turbopack') {
  console.log('\n=== Turbopack Tree-shaking Test ===');
  bundleSize = getTotalBundleSize('examples/turbopack-example1/.next/static/chunks');
  const jsFiles = findJSFiles('examples/turbopack-example1/.next/static/chunks');
  bundleContent = jsFiles.map(readBundleContent).join('\n');
} else if (bundlerType === 'webpack') {
  console.log('\n=== Webpack Tree-shaking Test ===');
  bundleSize = getTotalBundleSize('examples/turbopack-example1/.next/static/chunks');
  const jsFiles = findJSFiles('examples/turbopack-example1/.next/static/chunks');
  bundleContent = jsFiles.map(readBundleContent).join('\n');
}

console.log(`\n=== ${bundlerType.toUpperCase()} Bundle Analysis ===`);
console.log(`Bundle size: ${formatBytes(bundleSize)}`);

console.log(`\n=== Tree-shaking Test Results ===`);

if (bundleContent) {
  const containsFuncA = bundleContent.includes('I_AM_IN_FUNC_A');
  const containsFuncB = bundleContent.includes('I_AM_IN_FUNC_B');
  
  console.log(`Contains funcA (used): ${containsFuncA ? 'YES ✅' : 'NO ❌'}`);
  console.log(`Contains funcB (unused): ${containsFuncB ? 'YES ❌' : 'NO ✅'}`);
  
  console.log(`\n=== Tree-shaking Assessment ===`);
  
  if (containsFuncA && !containsFuncB) {
    console.log(`🎉 Tree-shaking WORKING: Only used code included`);
  } else if (containsFuncA && containsFuncB) {
    console.log(`❌ Tree-shaking FAILED: Unused code included`);
  } else if (!containsFuncA && !containsFuncB) {
    console.log(`⚠️  Unexpected: No function signatures found in bundle`);
  } else {
    console.log(`⚠️  Unexpected: Used code missing from bundle`);
  }
} else {
  console.log(`❌ Could not read bundle content for analysis`);
}

console.log(`\n=== ${bundlerType.toUpperCase()} Summary ===`);
if (bundlerType === 'turbopack') {
  console.log(`🚀 Turbopack tree-shaking test complete`);
} else if (bundlerType === 'webpack') {
  console.log(`⚙️  Webpack tree-shaking test complete`);
} else {
  console.log(`⚡ Vite/Rollup tree-shaking test complete`);
}