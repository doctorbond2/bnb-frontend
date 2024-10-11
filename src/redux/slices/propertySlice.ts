import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
export interface PropertyState {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  price: number;
  images?: string[];
  //   rating: number;
  //   zip: string;
  //   state: string;
}
const initialState: PropertyState = {
  id: '',
  name: '',
  description: '',
  address: '',
  city: '',
  price: 0,
  images: [],
};

export const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setProperty: (state, action: PayloadAction<PropertyState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.address = action.payload.address;
      state.city = action.payload.city;
      state.price = action.payload.price;
      state.images = action.payload.images;
    },
  },
});
