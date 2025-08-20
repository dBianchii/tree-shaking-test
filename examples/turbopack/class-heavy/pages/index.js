import { SomethingUtils } from '../utils.js';

export default function HomePage() {
  const result = SomethingUtils.funcA();
  
  return (
    <div>
      <h1>Class Heavy Test</h1>
      <p>Result: {result}</p>
      <p>This page only uses funcA, but heavy dependencies will be included due to static fields.</p>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}