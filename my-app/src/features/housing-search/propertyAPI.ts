import { IPropertySummary } from "../../types/propertySummary.type";
import http from "../../http-common";
import IPropertySearchParams from "../../types/propertySearchParams.type";
import IPagingResults from "../../types/pagingResult.type";

  export function getAll(property: IPropertySearchParams) {
    const queryParams = `Amenity=${property.amenity}&PropertyName=${property.propertyName}&MinOccupancy=${property.minOccupancy}&MaxOccupancy=${property.maxOccupancy}`;
    return http.get<Array<IPropertySummary>>("/Housing/property?" + queryParams);
  }

  export function pageResults(pagingParams: IPagingResults){
    const queryParams = `pageNumber=${pagingParams.currentPage}&pageSize=${pagingParams.pageSize}`;
    return http.post<Array<IPagingResults>>('/Paging/housing-summary?' + queryParams, pagingParams.data);
  }

