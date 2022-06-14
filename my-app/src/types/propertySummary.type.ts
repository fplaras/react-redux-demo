import IPropertyUnitSummary from "./propertyUnitSummary.type";

export default interface IPropertySummary {
    id: number,
    name: string,
    pictureUrl: string,
    propertyUnitSummary: IPropertyUnitSummary[]
  }