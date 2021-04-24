import { reactive, toRefs, computed, SetupContext } from "vue";
import { Props } from "./custom-type";

export default function (res: any, props: Props, context: SetupContext) {
    const Data = reactive({
        pageSize: 21,
        jumpVal: 1,
    });
    const startRecord = computed(() => {
        return (props.current - 1) * Data.pageSize + 1;
    });
    const endRecord = computed(() => {
        return res.list.length + (props.current - 1) * Data.pageSize;
    });
    // 是否为灰色
    // 首页
    const firstIsGray = computed(() => {
        return props.current === 1;
    });
    // 上一页
    const preIsGray = computed(() => {
        return props.current - 1 <= 0;
    });
    // 下一页
    const nextIsGray = computed(() => {
        return props.current + 1 > props.total;
    });
    // 最后一页
    const lastIsGray = computed(() => {
        return props.current === props.total;
    });

    // 修改一页多少条
    function changeRows() {}
    // 去指定页面
    function goPage(val: number) {
        res.loading = true;
        Data.jumpVal = val;
        context.emit("goPage", {
            current: val,
            type: props.type,
        });
        // asyncLoadScript(
        //     `/json/${props.type}-${val - 1}.json?callback=getTableContent`
        // );
    }
    // 去第一页
    function toFirstPage() {
        if (firstIsGray.value) return null;
        goPage(1);
    }

    // 去最后一页
    function toLastPage() {
        if (lastIsGray.value) return null;
        goPage(props.total);
    }
    // 下一页
    function toNextPage() {
        if (nextIsGray.value) return null;
        goPage(props.current + 1);
    }
    // 上一页
    function toPrePage() {
        if (preIsGray.value) return null;
        goPage(props.current - 1);
    }
    // 跳页
    function jumpPage() {
        if (Data.jumpVal > props.total) {
            goPage(props.total);
        } else if (Data.jumpVal < 1) {
            goPage(1);
        } else {
            goPage(Data.jumpVal);
        }
    }
    return {
        toLastPage,
        changeRows,
        ...toRefs(Data),
        toFirstPage,
        toNextPage,
        toPrePage,
        firstIsGray,
        preIsGray,
        nextIsGray,
        lastIsGray,
        startRecord,
        endRecord,
        jumpPage,
    };
}
