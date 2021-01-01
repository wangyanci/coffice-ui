export const ModelUtil: any = {
  assin: function (
    a: any,
    b: {
      [x: string]: any;
    }
  ): {
    [x: string]: any;
  } {
    for (var key in a) {
      a[key] = b[key];
    }

    return a;
  },

  pick: function <T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  },

  reverse: function (obj: any): Object {
    return Object.keys(obj).reduce((acc: any, key: any) => {
      acc[obj[key]] = key;
      return acc;
    }, {});
  },
};

// export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
//   const copy = {} as Pick<T, K>;

//   let aaa: keyof typeof obj

//   console.log("xxxxx: ", aaa)

//   keys.forEach(key => copy[key] = obj[key]);

//   return copy;
// }
