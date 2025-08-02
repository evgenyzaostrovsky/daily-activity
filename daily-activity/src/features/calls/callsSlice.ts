import { createSlice } from '@reduxjs/toolkit'
import dayjs, { Dayjs } from 'dayjs';

export type Call = {
    id: string
    type: 'newCall' | 'oldCall'
    timestamp: Dayjs
    noteReject: boolean,
    fundOffered: boolean,
    pipe: {
        note: number,
        fund: number,
        insurance: number
    }
    deals: {
        note: number,
        fund: number,
        insurance: number
    }

}
const initialCallsState: Call[] = []

const callsSlice = createSlice({
    name: 'calls',
    initialState: initialCallsState,
    reducers: {
        addCall: (state, action) => {
            state.unshift(action.payload)
            console.log(action.payload)

        },
        removeCall: () => {},
        editCall: () => {}
    },
})

export const { addCall, removeCall, editCall } = callsSlice.actions
export default callsSlice.reducer
