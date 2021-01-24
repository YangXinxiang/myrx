/**
 * 求和
 */
export function sum(...args) {
    return args.reduce((all, num) => all + num, 0);
  }
  