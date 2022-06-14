import http from "../../http-common";
import IPagingResults from "../../types/pagingResult.type";
import IPropertySearchParams from "../../types/propertySearchParams.type";
import IPropertySummary from "../../types/propertySummary.type";

 export function getProperties(property: IPropertySearchParams) {
    const queryParams = `Amenity=${property.amenity}&PropertyName=${property.propertyName}&MinOccupancy=${property.minOccupancy}&MaxOccupancy=${property.maxOccupancy}`;
    return http.get("/Housing/property?" + queryParams).then(((response) =>{
        const queryParams = `pageNumber=${property.pagingResults.currentPage}&pageSize=${property.pagingResults.pageSize}`;
        return http.post<IPagingResults>('/Paging/housing-summary?' + queryParams, response.data);
    }));
  }

  export function getPropertiesA(property: IPropertySearchParams) {
    const queryParams = `Amenity=${property.amenity}&PropertyName=${property.propertyName}&MinOccupancy=${property.minOccupancy}&MaxOccupancy=${property.maxOccupancy}`;
    return new Promise<Array<IPropertySummary>>((resolve) => {
        resolve(http.get("/Housing/property?" + queryParams));
    }); 
  }

  export function pageResults(pagingParams: IPagingResults, propertyList: Array<IPropertySummary>){
    const queryParams = `pageNumber=${pagingParams.currentPage}&pageSize=${pagingParams.pageSize}`;
    return http.post<Array<IPagingResults>>('/Paging/housing-summary?' + queryParams, propertyList);
  }


