// Simulate a heavy dependency that adds ~5MB of JS
export const HEAVY_DATA = new Array(500000).fill(0).map((_, i) => ({
  id: i,
  name: `Item ${i}`,
  description: `This is a description for item ${i} which is quite long and takes up space`,
  metadata: {
    created: new Date(2020, 0, i % 365),
    tags: [`tag${i % 100}`, `category${i % 50}`, `type${i % 25}`],
    properties: {
      weight: Math.random() * 100,
      color: `#${Math.random().toString(16).substring(2, 8)}`,
      size: ['small', 'medium', 'large'][i % 3]
    }
  }
}));

export function processHeavyData() {
  console.log('Processing heavy data...');
  return HEAVY_DATA.reduce((acc, item) => acc + item.metadata.properties.weight, 0);
}

export function heavyComputation() {
  console.log('Doing heavy computation...');
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sin(i) * Math.cos(i);
  }
  return result;
}