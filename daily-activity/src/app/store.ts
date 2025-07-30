import { configureStore } from '@reduxjs/toolkit'
import callsReducer from '../features/calls/callsSlice'
import dateReducer from '../features/date/dateSlice'

export const store = configureStore({
    reducer: {
        calls: callsReducer,
        date: dateReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch