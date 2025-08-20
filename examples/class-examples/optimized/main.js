import { SomethingUtils } from './utils.js';

// Only using funcA - should tree-shake funcB but may include heavy dependencies
console.log(SomethingUtils.funcA());