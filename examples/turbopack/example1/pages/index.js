import { SomethingUtils } from '../utils.js';

export default function HomePage() {
  const result = SomethingUtils.funcA();
  
  return (
    <div>
      {result}
    </div>
  );
}