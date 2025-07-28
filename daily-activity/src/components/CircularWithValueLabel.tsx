import * as React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useSelector} from "react-redux";
import {RootState} from "../app/store";



function CircularProgressWithLabel(props: any) {
    const calls = useSelector((state: RootState) => state.calls)
    const totalCalls =  calls.length;
    let circularProgressColor: string;

    if (calls.length < 8) {
        circularProgressColor = 'error';
    } else if (calls.length >= 8 && calls.length < 15) {
        circularProgressColor = 'warning';
    } else {
        circularProgressColor = 'success';
    }
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress size="2.7rem" variant="determinate" color={circularProgressColor} {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    sx={{ color: 'text.secondary' }}
                >
                    {totalCalls}/15
                </Typography>
            </Box>
        </Box>
    );
}



export default function CircularWithValueLabel() {

    const calls = useSelector((state: RootState) => state.calls)
    const totalCalls =  calls.length;


    return <CircularProgressWithLabel value={totalCalls >= 15 ? 100 : totalCalls/15*100} />;
}
