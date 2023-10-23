function generateHash(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((hash, k) => {
      const str = `${k}:${
        typeof obj[k] === "object" ? generateHash(obj[k]) : obj[k]
      }`;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
      }
      return hash;
    }, 0);
}

// 示例对象
const obj = {
  b: 2,
  a: 1,
  c: 3,
  d: 4,
};

const hash = generateHash(obj);
console.log(hash); // 输出生成的哈希值
