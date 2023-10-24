export interface BasePaginationFilters {
    pageIndex: number;
    pageSize: number;
    orderBy: string | null;
    orderDescending: boolean
}