import { processHeavyData, heavyComputation } from '../../heavy-dependency.js';

export class SomethingUtils {
  // Static field that forces evaluation of heavy dependencies
  static HEAVY_DATA = processHeavyData();
  static COMPUTED_VALUE = heavyComputation();

  static funcA() {
    console.log('Function A - lightweight');
    return 'result from funcA';
  }

  static funcB() {
    console.log('Function B - uses heavy dependency');
    return {
      heavyResult: this.HEAVY_DATA,
      computationResult: this.COMPUTED_VALUE
    };
  }
}