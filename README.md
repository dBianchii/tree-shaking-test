# Tree Shaking Test: Classes vs Named Exports

This test demonstrates the differences in bundle sizes between using static class methods vs named exports when only importing a subset of functionality.

## Project Structure

```
tree-shaking-test/
├── examples/
│   ├── heavy-dependency.js       # Shared heavy dependency
│   ├── named-exports/            # ✅ Best practice example
│   │   ├── utils.js
│   │   ├── main.js
│   │   └── vite.config.js
│   └── class-examples/
│       ├── optimized/            # ⚠️ Good class implementation
│       │   ├── utils.js
│       │   ├── main.js
│       │   └── vite.config.js
│       └── heavy/                # ❌ Poor class implementation
│           ├── utils.js
│           ├── main.js
│           └── vite.config.js
├── dist/                         # Generated bundles
├── package.json
├── compare-bundles.js           # Bundle analysis script
└── README.md
```

## Test Scenarios

### 1. Named Exports (✅ Best)
- **Location**: `examples/named-exports/`
- **Pattern**: Individual function exports
- **Tree-shaking**: Excellent - unused functions and dependencies are removed

### 2. Class Optimized (⚠️ Good)
- **Location**: `examples/class-examples/optimized/`
- **Pattern**: Clean class with lazy imports
- **Tree-shaking**: Good - modern bundlers can remove unused methods

### 3. Class Heavy (❌ Worst)
- **Location**: `examples/class-examples/heavy/`
- **Pattern**: Class with static fields that force evaluation
- **Tree-shaking**: Poor - static fields prevent tree-shaking

## Key Findings

1. **Named exports always win** - Provide the smallest bundles
2. **Classes can work well** - When written carefully without static fields
3. **Static fields are dangerous** - They force evaluation of heavy dependencies
4. **Import patterns matter** - How you structure code affects tree-shaking

## Running the Test

```bash
# Install dependencies
npm install

# Run all tests and compare bundles
npm test

# Run individual tests
npm run build:named
npm run build:class-optimized
npm run build:class-heavy

# Clean generated files
npm run clean
```

## Expected Results

- **Named exports**: Smallest bundle size
- **Class optimized**: Slightly larger than named exports
- **Class heavy**: Significantly larger due to forced dependency evaluation

## Best Practices

✅ **DO:**
- Use named exports for better tree-shaking
- Keep class methods simple and focused
- Use lazy imports inside methods

❌ **DON'T:**
- Add static fields that reference heavy dependencies
- Import heavy dependencies at module level in classes
- Mix heavy initialization with class definitions