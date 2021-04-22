<style>
html,
body {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
<style lang="scss" scoped src="./assets/css/app.scss">
</style>
<template>
    <div class="wrap"
         @scroll="antiShake(addListerScroll,$event)">
        <div class="top">
            <div class="h1">
                {{titleData&&titleData.fileName}}
            </div>
            <div class="h2">
                <div class="name">
                    任务编号：
                </div>
                <div class="data">
                    {{titleData&&titleData.taskNo}}
                </div>
            </div>
            <div class="h2">
                <div class="name">
                    任务名称：
                </div>
                <div class="data">
                    {{titleData&&titleData.taskName}}
                </div>
            </div>
            <div class="h2">
                <div class="name">
                    目标手机：
                </div>
                <div class="data">
                    {{titleData&&titleData.mobile}}
                </div>
            </div>
            <div class="h2">
                <div class="name">
                    目标IMSI：
                </div>
                <div class="data">
                    {{titleData&&titleData.imsi}}
                </div>
            </div>
            <div class="h2">
                <div class="name">
                    目标姓名：
                </div>
                <div class="data">
                    {{titleData&&titleData.targetName}}
                </div>
            </div>
            <div class="h2">
                <div class="name">
                    创建时间：
                </div>
                <div class="data">
                    {{titleData&&titleData.createTime}}
                </div>
            </div>
        </div>
        <div class="main"
             v-if="titleData&&Array.isArray(titleData.child)">
            <div class="table"
                 v-for="(item,index) in titleData.child"
                 :key="item.type">
                <div class="title">
                    {{index+1}}、{{item.name}}
                </div>
                <div class="container"
                     :ref="(el)=>{setTables(el,item)}">
                    <tableContainer :table-title-data="item"
                                    :table-content-data="contentData" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" >
import { reactive, toRefs, ref } from "vue";
import { deepCopy } from "./assets/js/deep-copy";
import { asyncLoadScript } from "./assets/js/async-load-script";
import tableContainer from "./components/table-container.vue";
import tableContentMixins from "./assets/js/table-content-mixins";
import antiShakeMixins from "./assets/js/anti-shake";

type Data = {
    titleData: any;
};

type TableData = {
    type: string;
} & Object;

type Tables = {
    value: any;
};

export default {
    components: {
        tableContainer,
    },
    setup() {
        let Data: Data = reactive({
            titleData: null,
        });
        const tables: Tables = ref([]);
        const { antiShake } = antiShakeMixins();
        const { contentData, loadTableContent } = tableContentMixins();

        function getTableList(res: Object) {
            console.log(res);
            const data = deepCopy(res);
            data.child.forEach((index: any) => (index.show = false));
            Data.titleData = data;
        }
        // 异步加载页面主框架
        asyncLoadScript(
            "./json/index.json?callback=getTableList",
            getTableList,
            true
        );
        // 监听滚动条变化事件
        function addListerScroll(e: Event) {
            const target: any = e.target;
            const wTop = target.scrollTop;
            const wBottom = wTop + target.offsetHeight;

            const list: Array<string> = [];
            tables.value.forEach((index: any) => {
                const top = index.node.offsetTop;
                const bottom = top + index.node.offsetHeight;
                // 选择可视区域的表格
                if (bottom >= wTop && top <= wBottom) {
                    console.log(index.key);
                    list.push(index.key);
                }
            });
            loadTableContent(list);
        }

        // 赋值表格列表
        function setTables(el: HTMLElement, res: TableData) {
            tables.value.push({
                node: el,
                key: res.type,
            });
        }
        return {
            ...toRefs(Data),
            setTables,
            contentData,
            addListerScroll,
            antiShake,
        };
    },
};
</script>