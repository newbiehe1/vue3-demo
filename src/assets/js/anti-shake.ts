// 防抖

import { ref } from "vue";
import { TimeOut, Fn } from "./custom-type";

export default function () {
    let timeOut: TimeOut = ref(null);

    function antiShake(fn: Fn, e: Event) {
        if (timeOut.value) {
            clearTimeout(timeOut.value);
        }
        timeOut.value = setTimeout(() => {
            fn(e);
        }, 500);
    }
    return {
        antiShake,
    };
}
