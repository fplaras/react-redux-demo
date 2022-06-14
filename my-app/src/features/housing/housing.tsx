import React, {  useState } from 'react';
import { Input, Spinner } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import IPropertySummary from '../../types/propertySummary.type';
import IPropertyUnitSummary from '../../types/propertyUnitSummary.type';

import {
    getAllProperties,
    updatePageResults
  } from './housingSlice';
  export const selectHousing = (state: RootState) => state.housing;

export function Housing() {
    const dispatch = useAppDispatch();
    const storeValues = useAppSelector(selectHousing);


    const [propertyName, setPropertyName] = useState<string>(String);
    const [amenityName, setAmenity] = useState<string>(String);
    const [minOccupancy, setMinOccupancy] = useState<number>(0);
    const [maxOccupancy, setMaxOccupancy] = useState<number>(0);
  
    return (
<div>
        <div className="container">
          <div className="row mt-2">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header text-light bg-light">
                  <h4 className="text-dark">Search Options</h4>
                </div>
                <div className="card-body">
                  <form>
                    <div className="input-group">
                      <span className="input-group-text">Property Name</span>
                      <Input
                        className="form-control"
                        type="text"
                        value={propertyName}
                        onChange={(e) => setPropertyName(e.target.value)}
                        >
                      </Input>
                    </div>
                    <small className="form-text">
                      Leave blank for all properties
                    </small>
                    <div className="input-group mt-2">
                      <span className="input-group-text">Unit Amenity</span>
                      <Input
                        type="select"
                        className="form-select"
                        value={amenityName}
                        onChange={(e) => setAmenity(e.target.value)}

                      >
                        <option value="">Select a unit amenity</option>
                        <option value="air conditioning">
                          air conditioning
                        </option>
                        <option value="accessible bathroom">
                          accessible bathroom
                        </option>
                        <option value="pet friendly">pet friendy</option>
                        <option value="elevator">elevator</option>
                        <option value="garage">garage</option>
                      </Input>
                    </div>
                    <div className="input-group mt-2">
                      <span className="input-group-text">Occupancy Min</span>
                      <Input
                        className="form-control"
                        type="number"
                        value={minOccupancy}
                        onChange={(e) => setMinOccupancy(parseInt(e.target.value))}

                      ></Input>
                      <span className="input-group-text">to Max</span>
                      <Input
                        className="form-control"
                        type="number"
                        value={maxOccupancy}
                        onChange={(e) => setMaxOccupancy(parseInt(e.target.value))}
                      ></Input>
                    </div>
                  </form>
                </div>
                <div className="card-footer">
                  <div className="btn-group float-start" role="group">
                    <button className="btn btn-outline-secondary" type="button">
                      Reset
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => dispatch(getAllProperties({
                        propertyName: propertyName,
                        amenity: amenityName,
                        minOccupancy: minOccupancy,
                        maxOccupancy: maxOccupancy,
                        isLoading: true,
                        propertyList: [],
                        pagingResults:{
                          totalCount: 0,
                          totalPages: 0,
                          currentPage: 1,
                          pageSize: storeValues.pagingResults.pageSize,
                          hasPrevious: false,
                          hasNext: false,
                          data: [],
                        }
                      }))}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {storeValues.isLoading &&
        (
          <div className="container mt-4">
            <div className="d-flex justify-content-center fs-5">
              <Spinner
                name="circle"
                style={{ height: "100px", width: "100px" }}
              ></Spinner>
            </div>
          </div>
        )
        }

{!storeValues.isLoading && (
          <div className="container mt-4">
            <h4 className="text-center">Property List</h4>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  {storeValues.pagingResults.data.length > 0 && (
                    <div className="input-group mt-2">
                      <span className="input-group-text">Page Size</span>
                      <Input
                        type="select"
                        className="form-select"
                        value={storeValues.pagingResults.pageSize}
                        onChange={(e) =>   dispatch(getAllProperties({
                            propertyName: propertyName,
                            amenity: amenityName,
                            minOccupancy: minOccupancy,
                            maxOccupancy: maxOccupancy,
                            isLoading: true,
                            propertyList: [],
                            pagingResults:{
                              totalCount: 0,
                              totalPages: 0,
                              currentPage: 1,
                              pageSize: parseInt(e.target.value),
                              hasPrevious: false,
                              hasNext: false,
                              data: [],
                            }
                          }))}
                      >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                      </Input>
                    </div>
                  )}
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  {storeValues.pagingResults.data.length > 0 && (
                    <nav
                      className="d-flex justify-content-center"
                      style={{
                        padding: "0px",
                        margin: "0px",
                        marginTop: "20px",
                      }}
                    >
                      <ul className="pagination">
                        <li className="page-item disabled">
                          <a
                            className="page-link"
                            aria-label="Previous"
                            href="#"
                          >
                            <span aria-hidden="true">«</span>
                          </a>
                        </li>

                       {/*  {storeValues.pagingResults.hasPrevious && this.getPreviusPages()}

                        {storeValues.pagingResults.hasNext && this.getNextPages()} */}

                        {!storeValues.pagingResults.hasNext &&
                          storeValues.pagingResults.currentPage ==
                          storeValues.pagingResults.totalPages && (
                            <li
                              className="page-item active"
                              key={storeValues.pagingResults.totalPages}
                            >
                              <a className="page-link" href="#">
                                {storeValues.pagingResults.totalPages}
                              </a>
                            </li>
                          )}

                        <li className="page-item disabled">
                          <a className="page-link" aria-label="Next" href="#">
                            <span aria-hidden="true">»</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
              </div>
            </div>
            {storeValues.pagingResults.data &&
              storeValues.pagingResults.data.map(
                (property: IPropertySummary, index: number) => (
                  <div className="card bg-light mt-2" key={index.toString()}>
                    <div className="card-body">
                      <div className="container mt-4">
                        <div className="row">
                          <div className="col-md-12">
                            <h4 className="text-center">{property.name}</h4>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-6">
                            <img
                              className="img-fluid"
                              src={property.pictureUrl}
                            />
                          </div>
                          <div className="col-md-6">
                            <div className="table-esponsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Unit Type</th>
                                    <th>Avg Sqft</th>
                                    <th>Occupancy Range</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {property.propertyUnitSummary.map(
                                    (
                                      unit: IPropertyUnitSummary,
                                      index: number
                                    ) => (
                                      <tr key={index.toString()}>
                                        <td>{unit.unitType}</td>
                                        <td>{unit.avgSqft}</td>
                                        <td>
                                          Min: {unit.minOccupancy} | Max:
                                          {unit.maxOccupancy}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        )}
        </div>
    )
}