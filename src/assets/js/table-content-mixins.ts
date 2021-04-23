import { Ref, ref } from "vue";
import { asyncLoadScript } from "./async-load-script";
import { deepCopy } from "./deep-copy";
import { ListItem } from "./custom-type";

export default function () {
    const contentData: Ref<any> = ref({});
    // 加载表格内容数据
    function loadTableContent(list: ListItem[]) {
        list.forEach((index: ListItem) => {
            if (!contentData.value[index.type]) {
                // 必然加载第一页
                contentData.value[index.type] = {};
                asyncLoadScript(
                    `/json/${index}-${
                        index.current - 1
                    }.json?callback=getTableContent`
                );
            }
        });
    }

    return {
        contentData,
        loadTableContent,
    };
}
