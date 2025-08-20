import { SomethingUtils } from '../utils.js';

export default function HomePage() {
  const result = SomethingUtils.funcA();
  
  return (
    <div>
      <h1>Class Optimized Test</h1>
      <p>Result: {result}</p>
      <p>This page only uses funcA, but funcB and heavy dependencies might still be included due to class imports.</p>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}