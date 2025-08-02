import {DashboardItem} from "./DashbordItem";
import {Grid} from "@mui/material";
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import CircularWithValueLabel from "../CircularWithValueLabel";
import dayjs, { Dayjs } from 'dayjs';
import CountUp from "react-countup";
import {useEffect} from "react";
import {CountUpWithMemory} from "./CountUpWithMemory";


export const Dashboard = () => {
    const callsState = useSelector((state: RootState) => state.calls)
    const selectedDate = useSelector((state: RootState) => state.date.selectedDate);

    const calls = callsState.filter((call) =>
        dayjs(call.timestamp).isSame(selectedDate, 'day')
    );


    let callsColor: string;

    if (calls.length < 8) {
        callsColor = 'red';
    } else if (calls.length >= 8 && calls.length < 15) {
        callsColor = 'orange';
    } else {
        callsColor = 'green';
    }


    const totalPipe = calls.reduce(
        (acc, call) => {
            acc.note += call.pipe.note;
            acc.fund += call.pipe.fund;
            acc.insurance += call.pipe.insurance;
            return acc;
        },
        { note: 0, fund: 0, insurance: 0 }
    );

    const totalDeals = calls.reduce (
        (acc, call) => {
            acc.noteDeals += call.deals.note;
            acc.fundDeals += call.deals.fund;
            acc.insuranceDeals += call.deals.insurance;
            return acc
        },
        { noteDeals: 0, fundDeals: 0, insuranceDeals: 0 }
    )


    return (
        <Grid container spacing={2}
              sx={{
                  padding: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  maxWidth: "1180px",
                  width: "100%" }}>

            <Grid  size={{ xs: 12, sm: 12, md: 4}} >
                <DashboardItem
                    title="Всего звонков"
                    value={<CircularWithValueLabel /> }

                    color={callsColor}
                    iconText={<PhoneOutlinedIcon fontSize="small" color="info" />}

                />
            </Grid>

            <Grid  size={{ xs: 12, sm: 12, md: 4 }}>
                <DashboardItem
                    title="Пайп по продуктам"
                    value={
                        <Box
                            sx={{
                                display: "flex",
                                gap: "20px",
                                justifyContent: "space-around",

                            }}
                        >
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Typography fontWeight="bold"><CountUpWithMemory value = {totalPipe.note} /></Typography>
                                <Typography variant="caption">ИОБ</Typography>
                            </Box>

                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Typography fontWeight="bold"><CountUpWithMemory value = {totalPipe.fund} /></Typography>
                                <Typography variant="caption">ПИФ</Typography>
                            </Box>

                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Typography fontWeight="bold"><CountUpWithMemory value = {totalPipe.insurance} /></Typography>
                                <Typography variant="caption">ПДС</Typography>
                            </Box>
                        </Box>

                    }
                    iconText={<TrendingUpOutlinedIcon fontSize="small" color="info" />}
                />
            </Grid>

            <Grid  size={{ xs: 12, sm: 12, md: 4 }}>
                <DashboardItem
                    title="Реализованные сделки"
                    value={
                        <Box
                            sx={{
                                display: "flex",
                                gap: "20px",
                                justifyContent: "space-around",

                            }}
                        >
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Typography fontWeight="bold"><CountUpWithMemory value = {totalDeals.noteDeals} /></Typography>
                                <Typography variant="caption">ИОБ</Typography>
                            </Box>

                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Typography fontWeight="bold"><CountUpWithMemory value = {totalDeals.fundDeals} /></Typography>
                                <Typography variant="caption">ПИФ</Typography>
                            </Box>

                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Typography fontWeight="bold"><CountUpWithMemory value = {totalDeals.insuranceDeals} /></Typography>
                                <Typography variant="caption">ПДС</Typography>
                            </Box>
                        </Box>

                    }
                    iconText={<TaskAltIcon fontSize="small" color="success" />}
                />
            </Grid>


        </Grid>
    );
};

