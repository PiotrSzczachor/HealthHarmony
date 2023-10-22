export interface PagedList<T> {
    items: T[];
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalCount: number
}