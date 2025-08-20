import { funcA } from './utils.js';

// Only using funcA - should tree-shake funcB and heavy dependencies
console.log(funcA());