import { createSlice } from '@reduxjs/toolkit'

export type Call = {
    id: string
    type: 'newCall' | 'oldCall'
    timestamp: string
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
            state.push(action.payload)
        },
        removeCall: () => {},
        editCall: () => {}
    },
})

export const { addCall, removeCall, editCall } = callsSlice.actions
export default callsSlice.reducer
