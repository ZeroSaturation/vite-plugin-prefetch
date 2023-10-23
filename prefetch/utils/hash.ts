export function generateHash(obj: any) {
  return Object.keys(obj).sort().reduce(function(hash, k) {
    const v = obj[k];
    if (typeof v === 'undefined') { return hash; }
    const str = `${k}:${typeof v === 'object' ? generateHash(v) : v}`;
    for(let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
    }
    return hash
  }, 0).toString(36);
}

// 由于 generateHash 存在递归调用，在解析自己函数名时会出现异常，所以直接字符串声明一下
export const generateHashStr = `function generateHash(obj) {
  return Object.keys(obj).sort().reduce(function(hash, k) {
    const v = obj[k];
    if (typeof v === 'undefined') { return hash; }
    const str = \`\${k}:\${typeof v === 'object' ? generateHash(v) : v}\`;
    for(let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
    }
    return hash
  }, 0).toString(36);
}`