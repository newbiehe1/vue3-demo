import { Callback, Json, TableTitleData } from "./custom-type";

// 创建 callback 方法
function createCallback(url: string, callback: Callback) {
    const params: Json = getUrlParams(url);
    if (!(window as any)[params.callback]) {
        (window as any)[params.callback] = (res: TableTitleData) => {
            callback(res);
            delete (window as any)[params.callback];
        };
    }
}

// 以=拆分字符串
function splitStr(str: string): string[] | null {
    if (str.indexOf("=") >= 0) {
        return str.split("=");
    } else {
        return null;
    }
}

// 获取参数
export function getUrlParams(url: string): Json {
    const paramStr: string = url.split("?")[1];
    let params: Json = {};
    if (paramStr.indexOf("&") >= 0) {
        paramStr.split("&").forEach((index) => {
            const arr = splitStr(index);
            if (arr) {
                params[arr[0]] = arr[1];
            }
        });
    } else {
        const arr = splitStr(paramStr);
        if (arr) {
            params[arr[0]] = arr[1];
        }
    }
    return params;
}

// 异步加载 jsonp
export function asyncLoadScript(url: string, fn?: Callback) {
    if (fn) {
        createCallback(url, fn);
    }
    const scriptDom = document.createElement("script");
    scriptDom.setAttribute("src", url);

    document.body.appendChild(scriptDom);
    scriptDom.onload = function () {
        setTimeout(() => {
            document.body.removeChild(scriptDom);
        }, 500);
    };
}
