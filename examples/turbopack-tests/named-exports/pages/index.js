import { funcA } from '../utils.js';

export default function HomePage() {
  const result = funcA();
  
  return (
    <div>
      <h1>Named Exports Test</h1>
      <p>Result: {result}</p>
      <p>This page only imports funcA, so funcB and heavy dependencies should be tree-shaken.</p>
    </div>
  );
}

// This will be executed at build time and included in the bundle
export async function getStaticProps() {
  return {
    props: {},
  };
}