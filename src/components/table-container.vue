<style lang="scss" src="../assets/css/table-foot.scss" scoped>
</style>
<style lang="scss"  scoped>
.scroll-table {
    width: 100%;
    height: 450px;
    overflow: auto;
    table {
        margin-top: 15px;
        min-width: 100%;
        tr {
            th {
                border-top: 1px solid #ccc;
                height: 40px;
                border-bottom: 1px solid #ccc;
                border-right: 1px solid #ccc;
                font-size: 16px;
                font-weight: normal;
                &:first-child {
                    border-left: 1px solid #ccc;
                }
            }
            td {
                &:first-child {
                    border-left: 1px solid #ccc;
                }
                border-bottom: 1px solid #ccc;
                border-right: 1px solid #ccc;
                font-size: 14px;
                font-weight: normal;
                div {
                    word-wrap: break-word;
                    word-break: break-all;
                    min-height: 40px;
                    min-width: 50px;
                }
            }
        }
    }
}
</style>
<template>

    <div class="scroll-table">
        <table border="0"
               ellpadding="0"
               cellspacing="0">
            <tr>
                <th v-for="item in tableTitleData.tableTitle"
                    :key="item.key">
                    <div>
                        {{item.name}}
                    </div>
                </th>
            </tr>
            <tr v-for="(contentData,n) in list"
                :key="n">
                <td v-for="item in tableTitleData.tableTitle"
                    :key="item.key">
                    <div>
                        {{contentData[item.key]}}
                    </div>
                </td>
            </tr>

        </table>
        <div class="null"
             v-if="!Array.isArray(tableContentData)|| Array.isArray(tableContentData)&&tableContentData.length<1">
            <h2>暂无相关数据！</h2>
        </div>

    </div>
    <div class="v-table-foot">
        <div class="page-num-list">
            <input type="number"
                   class="rows"
                   @keydown.enter="changeRows"
                   @blur="changeRows"
                   v-model.trim="pageSize">
            <div class="jump-table">
                <img src="../assets/img/table/first.png"
                     :class="'to-first'+(firstIsGray?' gray':'')"
                     title="首页"
                     @click.stop="toFirstPage"
                     alt="">
                <img src="../assets/img/table/pre.png"
                     :class="'pre'+(preIsGray?' gray':'')"
                     title="上一页"
                     @click.stop="toPrePage"
                     alt="">
                <input type="number"
                       class="jump"
                       @keydown.enter="jumpPage"
                       @blur="jumpPage"
                       v-model.trim="jumpVal">/{{total}}
                <img src="../assets/img/table/next.png"
                     :class="'next'+(nextIsGray?' gray':'')"
                     title="下一页"
                     @click.stop="toNextPage"
                     alt="">
                <img src="../assets/img/table/last.png"
                     :class="'last'+(lastIsGray?' gray':'')"
                     title="尾页"
                     @click.stop="toLastPage"
                     alt="">
            </div>
        </div>
        <div class="total">
            显示
            {{startRecord}}
            到
            {{endRecord}}
        </div>
        <div class="clear"></div>
    </div>
</template>
<script lang="ts">
import { reactive, SetupContext, toRefs, watch } from "vue";
import { deepCopy } from "../assets/js/deep-copy";
import tableFootMixins from "../assets/js/table-foot-mixins";
import { Props } from "../assets/js/custom-type";

export default {
    props: ["tableContentData", "tableTitleData", "total", "type", "current"],

    setup(props: Props, context: SetupContext) {
        const Data = reactive({
            list: [],
        });

        watch(props, (data, oldData) => {
            if (
                data.tableContentData &&
                JSON.stringify(data.tableContentData) !==
                    JSON.stringify(oldData)
            ) {
                Data.list = deepCopy(data.tableContentData);
            }
        });
        // watch(Data, (data) => {
        //     console.log(data.current);
        // });
        return {
            ...toRefs(Data),
            ...tableFootMixins(Data, props, context),
        };
    },
};
</script>