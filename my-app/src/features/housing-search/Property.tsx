import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Input, Spinner } from "reactstrap";

import {
  getAllProperties,
  getPropertyDisplay,
  selectProperty,
} from './propertySlice';

export function Property() {
  const storeValues = useAppSelector(selectProperty);
  const dispatch = useAppDispatch();

  //const [isLoading, setLoadingSpinner] = useState<boolean>();
  const [propertySearch, setPropertySearchParams] = useState({
    name: "",
    amenity:"",
    minOccupancy:0,
    maxOccupancy:0,
  });

  const [pagingResult, setPagingResultParams] = useState({
      totalCount: 0,
        totalPages: 0,
        currentPage: 1,
        pageSize: 10,
        hasPrevious: false,
        hasNext: false,
        data: [],
  });

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
                        value={propertySearch.name}
                      ></Input>
                    </div>
                    <small className="form-text">
                      Leave blank for all properties
                    </small>
                    <div className="input-group mt-2">
                      <span className="input-group-text">Unit Amenity</span>
                      <Input
                        type="select"
                        className="form-select"
                        value={propertySearch.amenity}
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
                        value={propertySearch.minOccupancy}
                      ></Input>
                      <span className="input-group-text">to Max</span>
                      <Input
                        className="form-control"
                        type="number"
                        value={propertySearch.maxOccupancy}
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
                      onClick={() => dispatch(getPropertyDisplay({
                        propertyName: propertySearch.name,
                        amenity:propertySearch.amenity,
                        minOccupancy: propertySearch.minOccupancy,
                        maxOccupancy: propertySearch.maxOccupancy,
                        isLoading: true,
                        propertyList: [],
                        pagingResults:{
                          totalCount: 0,
                          totalPages: 0,
                          currentPage: pagingResult.currentPage,
                          pageSize: pagingResult.currentPage,
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
                  {pagingResult.data.length > 0 && (
                    <div className="input-group mt-2">
                      <span className="input-group-text">Page Size</span>
                      <Input
                        type="select"
                        className="form-select"
                        value={pagingResult.pageSize}
                        defaultValue={10}
                      >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                      </Input>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
