import { reactive, toRefs, ref } from "vue";
export default {
    setup() {
        const TableContentData = reactive({});
        return {
            ...toRefs(TableContentData),
        };
    },
};
