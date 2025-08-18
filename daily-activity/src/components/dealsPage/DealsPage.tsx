import {DealsPageItem} from "./DealsPageItem";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Call} from "../../features/calls/callsSlice";
import dayjs from "dayjs";
import React from "react";
import Box from "@mui/material/Box";
import {CallsHistoryItem} from "../CallsHistory/CallsHistoryItem";
import {Card, Grid} from "@mui/material";

export const DealsPage = () => {
    const callsState = useSelector((state: RootState) => state.calls)
    const selectedDate = useSelector((state: RootState) => state.date.selectedDate);
    const formatedDate = selectedDate.format('DD.MM.YYYY')
    const formatedTime = selectedDate.format('HH:mm')

    const calls: Call[] = callsState.filter((call) =>
        dayjs(call.timestamp).isSame(selectedDate, 'day')
    );

    const callsWithDeals = calls.filter( (call) => (
        call.deals.fund + call.deals.note + call.deals.insurance > 0)
    )


    return (
        <Card sx={{
            display: "flex",

            flexDirection: "column",
            alignItems: "flex-end",
            gap: "5px",
            alignSelf: "center",
            maxWidth: "1140px",
            width: "100%",
            mt: "20px",
            padding: "10px"}}>

            <Grid container spacing={2} sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
            }}>
                {callsWithDeals.length === 0 ?
                    <Box sx={{
                        padding: "100px",
                        margin: "0 auto",
                        color: "grey",
                    }}>Данных нет</Box> :
                    callsWithDeals.map((call) => {
                        return <DealsPageItem
                            id={call.id}
                            key={call.id}
                            date={call.timestamp}
                            deals={call.deals}

                        />

                    })}

            </Grid>
        </Card>
    );
};

