(function(factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function() {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  const HEAVY_DATA = new Array(5e5).fill(0).map((_, i) => ({
    id: i,
    name: `Item ${i}`,
    description: `This is a description for item ${i} which is quite long and takes up space`,
    metadata: {
      created: new Date(2020, 0, i % 365),
      tags: [`tag${i % 100}`, `category${i % 50}`, `type${i % 25}`],
      properties: {
        weight: Math.random() * 100,
        color: `#${Math.random().toString(16).substring(2, 8)}`,
        size: ["small", "medium", "large"][i % 3]
      }
    }
  }));
  function processHeavyData() {
    console.log("Processing heavy data...");
    return HEAVY_DATA.reduce((acc, item) => acc + item.metadata.properties.weight, 0);
  }
  function heavyComputation() {
    console.log("Doing heavy computation...");
    let result = 0;
    for (let i = 0; i < 1e6; i++) {
      result += Math.sin(i) * Math.cos(i);
    }
    return result;
  }
  class SomethingUtils {
    static funcA() {
      console.log("Function A - lightweight");
      return "result from funcA";
    }
    static funcB() {
      console.log("Function B - uses heavy dependency");
      return {
        heavyResult: this.HEAVY_DATA,
        computationResult: this.COMPUTED_VALUE
      };
    }
  }
  // Static field that forces evaluation of heavy dependencies
  __publicField(SomethingUtils, "HEAVY_DATA", processHeavyData());
  __publicField(SomethingUtils, "COMPUTED_VALUE", heavyComputation());
  console.log(SomethingUtils.funcA());
});
