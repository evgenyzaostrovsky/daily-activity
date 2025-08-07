import {Card, Grid} from "@mui/material";
import {CallsHistoryItem} from "./CallsHistoryItem";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import dayjs from "dayjs";
import {Call} from "../../features/calls/callsSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React, {useState} from "react";
import Button from "@mui/material/Button";

export const CallsHistory = () => {
    const callsState = useSelector((state: RootState) => state.calls)
    const selectedDate = useSelector((state: RootState) => state.date.selectedDate);
    const formatedDate = selectedDate.format('DD.MM.YYYY')
    const formatedTime = selectedDate.format('HH:mm')

    const calls: Call[] = callsState.filter((call) =>
        dayjs(call.timestamp).isSame(selectedDate, 'day')
    );

    type FilterType = 'oldCall' | 'newCall'

    const [filteredCalls, setFilteredCalls] =  useState(calls)

    const changeNewOldFilter = (value: FilterType) => {
        const filteredCalls = calls.filter((call) => call.type === value ? call : null)
        setFilteredCalls(filteredCalls)
    }
    const changeRejectNoteFilter =  () => {
        setFilteredCalls(calls.filter( (call) => call.noteReject))
    }

    const changeFundOfferedFilter = () => {
        setFilteredCalls(calls.filter( (call) => call.fundOffered))
    }
    return (
        <Card  sx={{
            display: "flex",

            flexDirection: "column",
            alignItems: "flex-end",
            gap: "5px",
            alignSelf: "center",
            maxWidth: "1140px",
            width: "100%",
            mt: "20px",
            padding: "10px"
        }}>


            <Box
                color="textSecondary"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "5px",
                    verticalAlign: "bottom",
                    width: "90%",


                }}
            >
                <FormatListBulletedIcon/>
                <Typography color="textSecondary" variant={"h6"} sx={{ marginTop: "1px" }}>
                    Звонки за {formatedDate}
                </Typography>
                <Button
                    onClick={() => changeNewOldFilter('newCall')}
                    sx={{backgroundColor: "#b9fbc0", color: 'black', width: "20px", padding: '0'}}>Новый</Button>
                <Button
                    onClick={() => changeNewOldFilter('oldCall')}
                    sx={{backgroundColor: "#90dbf4", color: 'black', width: "20px", padding: '0'}}>Старый</Button>
                <Button
                    onClick={changeRejectNoteFilter}
                    sx={{ backgroundColor: "#ef4444", color: 'white', padding: '0 5px' }}>Отказ ИОБ</Button>
                <Button
                    onClick={changeFundOfferedFilter}
                    sx={{ backgroundColor: "#ffc766", color: 'black' , padding: '0 5px' }}>Предложен ПИФ</Button>
                <Button
                    onClick={() => setFilteredCalls(calls)}
                    sx={{backgroundColor: "#0f172a", color: "#ffffff", padding: '0 5px'}}>Все</Button>
            </Box>

            <Grid container spacing={2} sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
            }}>
                {filteredCalls.length === 0 ?
                    <Box sx={{
                        padding: "100px",
                        margin: "0 auto",
                        color: "grey",
                    }}>Данных нет</Box> :
                    filteredCalls.map((call) => {
                    return <CallsHistoryItem
                        id={call.id}
                        key={call.id}
                        type={call.type}
                        date={call.timestamp}
                        fundOffered={call.fundOffered}
                        deals={call.deals}
                        pipeline={call.pipe}
                        rejectNote={call.noteReject}
                    />

                })}

            </Grid>
        </Card>
    );
};

