/**
 * 将 object 序列化为字符串模板
 * @todo 改为抽象语法树进行格式化生成
 * @param config 配置参数，包含函数类型
 * @returns 
 */
export function stringifyConfig(config: any) {
  return `{${Object.entries(config)
    .map(([key, val]) => {
      let valStr = val;
      if (typeof val === "string") {
        valStr = `"${val}"`;
      } else if (typeof val === "function") {
        valStr = val.toString();
      }
      return `${key}:${valStr}`;
    })
    .join(",")}}`;
}

export function stringify(config: any) {
  const list = Array.isArray(config) ? config : [config];
  return `[${list.map(stringifyConfig).join(",")}]`;
}

// export function stringify(json) {
//   const k = "$_$";
//   const tmp = JSON.stringify(
//     json,
//     (_key, val) => {
//       return typeof val === "function" ? `${k}${val.toString()}${k}` : val;
//     },
//     2
//   );
//   console.log(tmp);
//   return tmp
//     .replaceAll(`"${k}`, "")
//     .replaceAll(`${k}"`, "")
//     .replaceAll("\\", "");
// }
