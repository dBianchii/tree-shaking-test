# Tree Shaking Test: Classes vs Named Exports

This test demonstrates the differences in bundle sizes between using static class methods vs named exports when only importing a subset of functionality across different bundlers.

## Project Structure

```
tree-shaking-test/
├── examples/
│   ├── vite/                     # ✅ Vite/Rollup tests  
│   │   ├── named-exports/        # Named exports example
│   │   │   ├── utils.js
│   │   │   ├── main.js
│   │   │   └── vite.config.js
│   │   └── class-examples/       # Class-based examples
│   │       ├── optimized/
│   │       └── heavy/
│   └── turbopack/                # 🚀 Next.js/Turbopack tests
│       ├── heavy-dependency.js
│       ├── named-exports/        # Next.js + named exports
│       │   ├── pages/index.js
│       │   ├── utils.js
│       │   ├── next.config.js
│       │   └── package.json
│       ├── class-optimized/      # Next.js + optimized class
│       └── class-heavy/          # Next.js + heavy class
├── dist/                         # Generated bundles
├── package.json
├── compare-bundles.js           # Multi-bundler analysis script
└── README.md
```

## Test Scenarios

### 1. Named Exports (✅ Best)
- **Location**: `examples/vite/named-exports/`
- **Pattern**: Individual function exports
- **Tree-shaking**: Excellent - unused functions and dependencies are removed

### 2. Class Optimized (⚠️ Good)
- **Location**: `examples/vite/class-examples/optimized/`
- **Pattern**: Clean class with lazy imports
- **Tree-shaking**: Good - modern bundlers can remove unused methods

### 3. Class Heavy (❌ Worst)
- **Location**: `examples/vite/class-examples/heavy/`
- **Pattern**: Class with static fields that force evaluation
- **Tree-shaking**: Poor - static fields prevent tree-shaking

## Key Findings

### Universal Principles
1. **Named exports consistently win** - Smallest bundles across all bundlers
2. **Classes can work well** - When written carefully without static fields
3. **Static fields are dangerous** - Force evaluation of heavy dependencies across all bundlers
4. **Import patterns matter** - Code structure affects tree-shaking regardless of bundler

### Bundler-Specific Insights
- **Vite/Rollup**: Excellent tree-shaking with aggressive dead code elimination
- **Turbopack**: Next.js's new bundler with modern tree-shaking optimizations
- **Webpack**: Mature but sometimes less aggressive tree-shaking

### Test Features
- 🚀 **Turbopack Integration**: Test Next.js's cutting-edge bundler
- ⚡ **Vite Baseline**: Industry-standard tree-shaking reference
- ⚙️ **Webpack Comparison**: See how traditional bundling performs
- 🔍 **Cross-bundler Analysis**: Compare results across different tools

## Running the Tests

### Setup
```bash
# Install main dependencies
npm install

# Install Turbopack test dependencies
npm run install:turbopack
```

### Run Individual Bundler Tests
```bash
# Test Vite/Rollup (default)
npm test
# or
npm run test:vite

# Test Turbopack
npm run test:turbopack

# Test Webpack (Next.js fallback)
npm run test:webpack

# Test all bundlers
npm run test:all
```

### Individual Build Commands
```bash
# Vite builds
npm run build:vite-named
npm run build:vite-class-optimized
npm run build:vite-class-heavy

# Turbopack builds
npm run build:turbo-named
npm run build:turbo-class-optimized
npm run build:turbo-class-heavy

# Webpack builds
npm run build:webpack-named
npm run build:webpack-class-optimized
npm run build:webpack-class-heavy

# Clean all generated files
npm run clean
```

## Bundler Comparison

### Expected Results Across Bundlers

| Bundler | Named Exports | Class Optimized | Class Heavy |
|---------|---------------|-----------------|-------------|
| **Vite/Rollup** | Smallest | +40-60% | +60-80% |
| **Turbopack** | TBD | TBD | TBD |
| **Webpack** | TBD | TBD | TBD |

- **Named exports**: Should be smallest across all bundlers
- **Class optimized**: Performance varies by bundler tree-shaking capability
- **Class heavy**: Largest due to forced dependency evaluation

## Best Practices

✅ **DO:**
- Use named exports for better tree-shaking
- Keep class methods simple and focused
- Use lazy imports inside methods

❌ **DON'T:**
- Add static fields that reference heavy dependencies
- Import heavy dependencies at module level in classes
- Mix heavy initialization with class definitions