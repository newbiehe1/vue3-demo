type Type = "Array" | "Date" | "Json" | "RegExp";

// 判断类型
export function isType(res: any, type: Type) {
    const _toString = Object.prototype.toString;
    let flag: Boolean;
    switch (type) {
        case "Array":
            flag = _toString.call(res) === "[object Array]";
            break;
        case "Date":
            flag = _toString.call(res) === "[object Date]";
            break;
        case "Json":
            flag = _toString.call(res) === "[object Object]";
            break;
        case "RegExp":
            flag = _toString.call(res) === "[object RegExp]";
            break;
        default:
            flag = false;
            break;
    }
    return flag;
}

// 获取正则通配符
function regExpWildcard(reg: RegExp): string {
    let flags: string = "";
    if (reg.global) flags += "g";
    if (reg.ignoreCase) flags += "i";
    if (reg.multiline) flags += "m";
    return flags;
}

// 深拷贝
export function deepCopy(res: any): any {
    if (isType(res, "Json")) {
        const proto = Object.getPrototypeOf(res);
        const json = Object.create(proto);
        for (let key in res) {
            json[key] = deepCopy(res[key]);
        }
        return json;
    } else if (isType(res, "Array")) {
        let arr: Array<Object | number | string | boolean> = [];
        res.forEach((index: Object | number | string | boolean) => {
            arr.push(deepCopy(index));
        });
        return arr;
    } else if (isType(res, "Date")) {
        return new Date(res.getTime());
    } else if (isType(res, "RegExp")) {
        const reg = new RegExp(res.source, regExpWildcard(res));
        if (res.lastIndex) {
            reg.lastIndex = res.lastIndex;
        }
        return reg;
    } else {
        return res;
    }
}
