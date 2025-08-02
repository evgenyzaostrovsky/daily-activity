import {Card, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import dayjs, {Dayjs} from 'dayjs';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type pipeLineType = {
    note: number,
    fund: number,
    insurance: number
}

type dealsType = {
    note: number,
    fund: number,
    insurance: number
}

type CallsHistoryItemProps = {
    date: Dayjs;
    type: string;
    pipeline: pipeLineType
    deals: dealsType
    rejectNote: boolean;
    fundOffered: boolean;
    withPM?: boolean;
}


export const CallsHistoryItem = ({
                                     date, type, pipeline, deals, rejectNote, fundOffered, withPM
                                 }: CallsHistoryItemProps) => {
    const formatedDate = date.format('DD.MM')
    const formatedTime = date.format('HH:mm')
    const buttonOldCallStyles = (type === 'oldCall'
        ? {backgroundColor: "#90dbf4", color: 'black', width: "20px", padding: '0'}
        : {backgroundColor: "#b9fbc0", color: 'black', width: "20px", padding: '0'})

    return (
        <Grid size={{xs: 12, sm: 12, md: 12}}>
            <Card sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "20px",
                margin: "0 auto",
                width: "90%",
                border: "1px solid grey",
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: 'translateY(1px) scale(1.001)',
                    boxShadow: 2
                },
            }}>

                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "5px"
                }}>

                    <Button  sx={{backgroundColor: "#0f172a", color: "#ffffff", padding: '0 5px'}}>{formatedTime}</Button>
                    <Button sx={buttonOldCallStyles}>{type === 'oldCall' ? 'Старый' : 'Новый'}</Button>
                    {rejectNote ? <Button sx={{ backgroundColor: "#ef4444", color: 'white', padding: '0 5px' }}>Отказ ИОБ</Button> : ''}
                    {fundOffered ? <Button sx={{ backgroundColor: "#ffc766", color: 'black' , padding: '0 5px' }}>Предложен ПИФ</Button> : ''}

                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "flex-start",
                    minWidth: "120px",

                }}>
                    <Typography variant={"subtitle2"}>
                        Пайп: {pipeline.note+pipeline.fund+pipeline.insurance}
                    </Typography>
                    <Typography variant={"subtitle2"}>
                        Сделки: {deals.fund + deals.note + deals.insurance}
                    </Typography >

                </Box>


            </Card>
        </Grid>
    );
};

