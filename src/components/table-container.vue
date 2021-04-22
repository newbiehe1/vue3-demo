<style lang="scss" scoped>
table {
    width: 100%;
    margin-top: 15px;
    width: 100%;
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
    }
}
</style>
<template>
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
        <tr>
            <td v-for="item in tableTitleData.tableTitle"
                :key="item.key">
                <div></div>
            </td>
        </tr>

    </table>
</template>
<script lang="ts">
import { reactive, toRefs } from "vue";
export default {
    props: ["tableContentData", "tableTitleData"],
    setup(props: Object) {
        return {
            // ...toRefs(props),
        };
    },
};
</script>