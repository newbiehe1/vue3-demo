<style lang="scss" scoped>
.table-item {
    width: 100%;
    table {
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
}
</style>
<template>
    <div class="table-item">
        <!-- {{tableContentData}} -->
        <table border="0"
               ellpadding="0"
               cellspacing="0">
            <tr>
                <th v-for="item in tableContentData.tableTitle"
                    :key="item.key">
                    <div>
                        {{item.name}}
                    </div>
                </th>
            </tr>
            <tr>
                <td v-for="item in tableContentData.tableTitle"
                    :key="item.key">
                    <div></div>
                </td>
            </tr>

        </table>
    </div>
</template>
<script lang="ts">
import { reactive, toRefs } from "vue";
export default {
    props: ["tableContentData"],
    setup(props: Object) {
        return {
            // ...toRefs(props),
        };
    },
};
</script>