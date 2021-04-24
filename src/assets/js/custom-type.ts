/* type  interface 区别
    

    type 可以声明任何类型
    type 继承用&
    type a = typeof document.getElementById('test');

    interface 只能声明  object function class
    interface 继承用 extends
    interface 可以重复声明

*/

import { Ref } from "vue";

export type Props = {
    tableContentData: any;
    tableTitleData: any;
    total: number;
    type: string;
    current: number;
};

export interface Data {
    titleData: any;
    tableChild: {
        [key: string]: any;
    };
}

export type Tables = Ref<any[]>;

export type TableData = {
    type: string;
} & Object;

export type ScrollNode = {
    value: null | HTMLElement;
};

export type Fn = (e: any) => void;

export type TimeOut = Ref<null | number>;

export interface TableContentData {
    list: any[];
    name: string;
    type: string;
}

export type Json = {
    [key: string]: string;
};

export type Callback = (res: TableTitleData) => void;

type type1 = string | null | number;

export interface TableTitleData extends TableContentData {
    fileName: type1;
    targetName: type1;
    createTime: type1;
    imsi: type1;
    mobile: type1;
    taskNo: type1;
    taskName: type1;
    child: ChildItem[];
}

export type ListItem = {
    type: string;
    current: number;
};

export type ChildItem = {
    total: number;
    name: string;
    type: string;
    tableTitle: TableItem[];
} & ListItem;

export type TableItem = {
    key: string;
    name: string;
};
