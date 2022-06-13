import IPropertyUnitSummary from "./propertyUnitSummary.type";

export interface IPropertySummary {
    id: number,
    name: string,
    pictureUrl: string,
    propertyUnitSummary: IPropertyUnitSummary[]
  }