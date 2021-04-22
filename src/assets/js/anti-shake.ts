// 防抖
type Fn = (e: any) => void;
type TimeOut = Ref<null | number>;
import { Ref, ref } from "vue";
export default function () {
    let timeOut: TimeOut = ref(null);

    function antiShake(fn: Fn, e: Event) {
        if (timeOut.value) {
            clearTimeout(timeOut.value);
        }
        timeOut.value = setTimeout(() => {
            fn(e);
        }, 1000);
    }
    return {
        antiShake,
    };
}
