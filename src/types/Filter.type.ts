
export enum FilterOptions {
    ID = "id",
    NAME = "name",
    EMAIL = "email",
    GENDER = "gender",
    STATUS = "status",
};

export type Filter = {
    type: FilterOptions;
    value: string;
}
