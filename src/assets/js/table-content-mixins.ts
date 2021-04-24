import { Ref, ref } from "vue";
import { asyncLoadScript } from "./async-load-script";
import { deepCopy } from "./deep-copy";
import { ListItem, Data, ChildItem, TableContentData } from "./custom-type";

export default function (parentData: Data) {
    const contentData: Ref<any> = ref({});
    // 加载表格内容数据
    function loadTableContent(list: ListItem[]) {
        list.forEach((index: ListItem) => {
            if (!contentData.value[index.type]) {
                // 必然加载第一页
                contentData.value[index.type] = {};
                asyncLoadScript(
                    `/json/${index.type}-${
                        index.current - 1
                    }.json?callback=getTableContent`
                );
            }
        });
    }
    //   加载 对应表格的 某页数据
    function goPage(data: ListItem) {
        asyncLoadScript(
            `/json/${data.type}-${
                data.current - 1
            }.json?callback=getTableContent`
        );
        contentData.value[data.type] = {};
        const item = parentData.titleData.child.find(
            (index: ChildItem) => index.type === data.type
        );
        item.current = data.current;
    }
    //   声明jsonp方法
    (window as any).getTableContent = (res: TableContentData) => {
        contentData.value[res.type] = deepCopy(res.list);
        parentData.tableChild[res.type].loading = false;
    };

    return {
        contentData,
        loadTableContent,
        goPage,
    };
}
