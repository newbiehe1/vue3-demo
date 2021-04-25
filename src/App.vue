<style>
html,
body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
}
</style>
<style lang="scss" scoped src="./assets/css/app.scss">
</style>
<template>
    <div class="wrap"
         ref="scrollNode"
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
                                    :total="item.total"
                                    :type="item.type"
                                    :current="item.current"
                                    @go-page="goPage"
                                    :ref="(el)=>{setTableChilds(el,item)}"
                                    :table-content-data="contentData&&contentData[item.type]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script >
import { reactive, toRefs, ref, nextTick } from "vue";
import { deepCopy } from "./assets/js/deep-copy";
import { asyncLoadScript } from "./assets/js/async-load-script";
import tableContainer from "./components/table-container.vue";
import tableContentMixins from "./assets/js/table-content-mixins";
import antiShakeMixins from "./assets/js/anti-shake";
import { Data, TableData, Tables, ScrollNode } from "./assets/js/custom-type";
import { ListItem } from "./assets/js/custom-type";

export default {
    components: {
        tableContainer,
    },
    setup() {
        let Data = reactive({
            titleData: null,
            tableChild: {},
        });
        const tables = ref([]);
        const { antiShake } = antiShakeMixins();
        const { contentData, loadTableContent, goPage } = tableContentMixins(
            Data
        );
        const scrollNode = ref(null);

        // 获取表格列表
        function getTableList(res) {
            const data = deepCopy(res);
            data.child.forEach((index) => {
                index.current = 1;
            });
            Data.titleData = data;
            nextTick(() => {
                if (scrollNode.value) getClientTable(scrollNode.value);
            });
        }
        // 异步加载页面主框架
        asyncLoadScript(
            "./json/index.json?callback=getTableList",
            getTableList
        );
        // 监听滚动条变化事件
        function addListerScroll(e) {
            const target = e.target;
            getClientTable(target);
        }

        // 获取可视区域的表格
        function getClientTable(target) {
            const wTop = target.scrollTop;
            const wBottom = wTop + target.offsetHeight;
            const list = [];
            tables.value.forEach((index) => {
                const top = index.node.offsetTop;
                const bottom = top + index.node.offsetHeight;
                // 选择可视区域的表格
                if (bottom >= wTop && top <= wBottom) {
                    list.push({
                        type: index.key,
                        current: 1,
                    });
                }
            });
            loadTableContent(list);
        }

        // 获取 表格element  列表
        function setTables(el, res) {
            tables.value.push({
                node: el,
                key: res.type,
            });
        }
        // 获取 子表格 vue 列表
        function setTableChilds(el, res) {
            Data.tableChild[res.type] = el;
        }

        return {
            ...toRefs(Data),
            setTables,
            scrollNode,
            contentData,
            addListerScroll,
            antiShake,
            goPage,
            setTableChilds,
        };
    },
};
</script>