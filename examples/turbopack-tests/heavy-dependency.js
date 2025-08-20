// Heavy dependency that should be tree-shaken when not used

export const HEAVY_DATA = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  data: `Heavy data item ${i}`,
  metadata: {
    timestamp: Date.now(),
    processed: false,
    tags: ['heavy', 'large', 'memory-intensive']
  }
}));

export function processHeavyData() {
  console.log('Processing heavy data...');
  return HEAVY_DATA.map(item => ({
    ...item,
    metadata: { ...item.metadata, processed: true }
  }));
}

export function heavyComputation() {
  console.log('Performing heavy computation...');
  let result = 0;
  for (let i = 0; i < 100000; i++) {
    result += Math.sin(i) * Math.cos(i);
  }
  return result;
}