import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange: (state, action) => action.payload
  }
})

// const filterReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.filterValue
//     default:
//       return state
//   }
// }

// export const filterChange = (filterValue) => {
//   return {
//     type: 'SET_FILTER',
//     filterValue
//   }
// }

// export default filterReducer

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer
