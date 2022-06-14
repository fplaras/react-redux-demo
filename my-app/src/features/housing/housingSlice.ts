import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useState } from 'react';
import type { RootState } from '../../app/store'
import IPagingResults from '../../types/pagingResult.type';
import IPropertySearchParams from '../../types/propertySearchParams.type'
import IPropertySummary from '../../types/propertySummary.type';
import { getProperties, getPropertiesA, pageResults } from './housingApi';

  
  // Define the initial state using that type
  const initialState: IPropertySearchParams = {
    propertyName: "",
    amenity: "",
    minOccupancy: 0,
    maxOccupancy: 0,
    isLoading: false,
    propertyList: [],
    pagingResults: {
      totalCount: 0,
      totalPages: 0,
      currentPage: 1,
      pageSize: 10,
      hasPrevious: false,
      hasNext: false,
      data: [],
  }
};


 export const getAllProperties = createAsyncThunk(
    'housing-search/getAll',
    async (searchParams: IPropertySearchParams) => {
      const response = await getProperties(searchParams);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  ); 

  export const updatePageResults = createAsyncThunk(
    'housing-search/updateResults',
    async (searchParams: IPropertySearchParams) => {
      const response = await pageResults(searchParams.pagingResults, searchParams.propertyList);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

export const housingSlice = createSlice({
    name: 'housing',
    initialState,
    reducers: {
      getHousingReducer: (state, action: PayloadAction<IPropertySearchParams>) => {
        console.log("reducer get all");
        state.isLoading = action.payload.isLoading;
        state.pagingResults.pageSize = action.payload.pagingResults.pageSize;
      },
      updatePagingReducer: (state, action: PayloadAction<IPagingResults>) => {
        console.log(state);
        state.pagingResults.currentPage = action.payload.currentPage;
        state.pagingResults.pageSize = action.payload.pageSize;
      }, 
    },
    extraReducers: (builder) => {
        builder
          .addCase(getAllProperties.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getAllProperties.fulfilled, (state, action) => {
            state.isLoading = false;
            state.pagingResults = action.payload;
            //console.log("reducer get all fullfilled ");
           // console.log(action.payload);
          })
          .addCase(getAllProperties.rejected, (state) => {
            state.isLoading = false;
          });
        },
});

export const { getHousingReducer, updatePagingReducer} = housingSlice.actions;
export const selectHousing = (state: RootState) => state.housing;

export default housingSlice.reducer;
