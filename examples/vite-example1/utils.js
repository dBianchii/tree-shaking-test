import { unwantedThing } from 'unwanted-package';

export function funcA() {
  return 'I_AM_IN_FUNC_A';
}

export function funcB() {
  console.log(unwantedThing);
  return unwantedThing;
}
