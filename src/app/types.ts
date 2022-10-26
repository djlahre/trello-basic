export enum ColumnTypes {
    TODO = 'TODO',
    DOING = 'DOING',
    DONE = 'DONE',
}

export interface TaskInfo {
    id?: string | number;
    title: string;
    description: string;
    column: ColumnTypes;
}