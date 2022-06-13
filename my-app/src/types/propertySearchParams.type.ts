import IPagingResults from "./pagingResult.type"
import { IPropertySummary } from "./propertySummary.type"

export default interface IPropertySearchParams{
    propertyName: string,
    amenity: string,
    minOccupancy: number,
    maxOccupancy: number,
    isLoading: boolean,
    pagingResults: IPagingResults,
    propertyList: IPropertySummary[]
  }