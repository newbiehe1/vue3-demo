<style lang="scss" scoped>
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
            <tr v-for="(contentData,n) in (tableContentData?tableContentData:[])"
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

</template>
<script lang="ts">
import { reactive, toRefs, watch } from "vue";
type Props = {
    tableContentData: any;
    tableTitleData: any;
};
export default {
    props: ["tableContentData", "tableTitleData"],
    setup(props: Props) {
        // watch(props, (val) => {
        //     console.log(val);
        // });
        return {
            // ...toRefs(props),
        };
    },
};
</script>