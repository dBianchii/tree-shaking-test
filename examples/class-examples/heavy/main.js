import { SomethingUtils } from './utils.js';

// Only using funcA - but heavy dependencies are loaded due to static fields
console.log(SomethingUtils.funcA());