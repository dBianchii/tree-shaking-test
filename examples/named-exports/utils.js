import { processHeavyData, heavyComputation } from '../heavy-dependency.js';

export function funcA() {
  console.log('Function A - lightweight');
  return 'result from funcA';
}

export function funcB() {
  console.log('Function B - uses heavy dependency');
  const heavyResult = processHeavyData();
  const computationResult = heavyComputation();
  return { heavyResult, computationResult };
}