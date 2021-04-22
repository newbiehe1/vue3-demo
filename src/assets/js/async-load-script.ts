/* type  interface 区别
    

    type 可以声明任何类型
    type 继承用&
    type a = typeof document.getElementById('test');

    interface 只能声明  object function class
    interface 继承用 extends
    interface 可以重复声明

*/

type Json = {
    [key: string]: string;
};

type Callback = (res: Object) => void;
// 创建 callback 方法
function createCallback(
    url: string,
    callback: Callback,
    dom: HTMLElement,
    isRemoveCallback: Boolean
) {
    const params: Json = getUrlParams(url);
    if (!(window as any)[params.callback]) {
        (window as any)[params.callback] = (res: Object) => {
            callback(res);
            document.body.removeChild(dom);
            if (isRemoveCallback) {
                delete (window as any)[params.callback];
            }
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
export function asyncLoadScript(
    url: string,
    fn: Callback,
    isRemoveCallback: Boolean = false
) {
    const scriptDom = document.createElement("script");
    scriptDom.setAttribute("src", url);

    document.body.appendChild(scriptDom);

    createCallback(url, fn, scriptDom, isRemoveCallback);
}
