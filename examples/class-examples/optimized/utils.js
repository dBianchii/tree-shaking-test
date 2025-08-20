import { processHeavyData, heavyComputation } from '../../heavy-dependency.js';

export class SomethingUtils {
  static funcA() {
    console.log('Function A - lightweight');
    return 'result from funcA';
  }

  static funcB() {
    console.log('Function B - uses heavy dependency');
    const heavyResult = processHeavyData();
    const computationResult = heavyComputation();
    return { heavyResult, computationResult };
  }
}