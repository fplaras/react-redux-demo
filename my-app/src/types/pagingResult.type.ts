import { IPropertySummary } from "./propertySummary.type";

export default interface IPagingResults {
    totalCount: number,
    totalPages: number,
    currentPage: number,
    pageSize: number,
    hasPrevious: boolean,
    hasNext: boolean,
    data: IPropertySummary[],
}