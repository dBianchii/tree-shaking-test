import { funcA } from '../utils.js';

export default function HomePage() {
  const result = funcA();
  
  return (
    <div>
      {result}
    </div>
  );
}