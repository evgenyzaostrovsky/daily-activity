// store/dateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';

interface DateState {
    selectedDate: Dayjs;
}

const initialState: DateState = {
    selectedDate: dayjs(), // по умолчанию сегодня
};

export const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setSelectedDate: (state, action: PayloadAction<Dayjs>) => {
            state.selectedDate = action.payload;
        },
    },
});

export const { setSelectedDate } = dateSlice.actions;
export default dateSlice.reducer;
