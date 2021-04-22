import { ref } from "vue";
import { asyncLoadScript } from "./async-load-script";
import { deepCopy } from "./deep-copy";
type Tables = {
    value: any;
};
export default function () {
    const contentData: Tables = ref({});
    // 加载表格内容数据
    function loadTableContent(list: Array<string>) {
        list.forEach((index: string) => {
            if (!contentData.value[index]) {
                // 必然加载第一页
                asyncLoadScript(
                    `/json/${index}-0.json?callback=getTableContent`,
                    (res: any) => {
                        contentData.value[res.type] = deepCopy(res.list);
                    }
                );
            }
        });
    }

    return {
        contentData,
        loadTableContent,
    };
}
