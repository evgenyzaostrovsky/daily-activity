import React, {useState} from "react";
import {Card, Grid, Typography, Button, Box, Modal} from "@mui/material";
import dayjs, {Dayjs} from "dayjs";
import {EditableSpan} from "../../EditableSpan";
import {useDispatch} from "react-redux";
import {editCall} from '../../features/calls/callsSlice'


type pipeLineType = {
    note: number;
    fund: number;
    insurance: number;
};

type dealsType = {
    note: number;
    fund: number;
    insurance: number;
};

type CallsHistoryItemProps = {
    id: string;
    date: Dayjs;
    type: string;
    pipeline: pipeLineType;
    deals: dealsType;
    rejectNote: boolean;
    fundOffered: boolean;
    withPM?: boolean;
};

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export const CallsHistoryItem = ({
                                     id,
                                     date,
                                     type,
                                     pipeline,
                                     deals,
                                     rejectNote,
                                     fundOffered,
                                     withPM,
                                 }: CallsHistoryItemProps) => {
    const [open, setOpen] = useState(false);

    const formatedDate = date.format("DD.MM");
    const formatedTime = date.format("HH:mm");

    const [localPipeline, setLocalPipeline] = useState({...pipeline});
    const [localDeals, setLocalDeals] = useState({...deals});

    const dispatch = useDispatch();


    const buttonOldCallStyles =
        type === "oldCall"
            ? {backgroundColor: "#90dbf4", color: "black", width: "20px", padding: "0"}
            : {backgroundColor: "#b9fbc0", color: "black", width: "20px", padding: "0"};

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        dispatch(editCall({
            id: id, // передай ID звонка сюда
            updatedData: {
                pipe: localPipeline,
                deals: localDeals
            }
        }));
        setOpen(false);
    };

    return (
        <>
            <Grid onClick={handleOpen}

                  size={{xs: 12, sm: 12, md: 12}}>
                <Card
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: "20px",
                        margin: "0 auto",
                        width: "90%",
                        border: "1px solid grey",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        "&:hover": {
                            transform: "translateY(1px) scale(1.001)",
                            boxShadow: 2,
                            cursor: "pointer",
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "5px",
                        }}
                    >
                        <Button sx={{backgroundColor: "#0f172a", color: "#ffffff", padding: "0 5px"}}>
                            {formatedTime}
                        </Button>
                        <Button sx={buttonOldCallStyles}>{type === "oldCall" ? "Старый" : "Новый"}</Button>
                        {rejectNote && (
                            <Button sx={{backgroundColor: "#ef4444", color: "white", padding: "0 5px"}}>
                                Отказ ИОБ
                            </Button>
                        )}
                        {fundOffered && (
                            <Button sx={{backgroundColor: "#ffc766", color: "black", padding: "0 5px"}}>
                                Предложен ПИФ
                            </Button>
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignSelf: "flex-start",
                            minWidth: "120px",
                        }}
                    >
                        <Typography variant={"subtitle2"}>
                            Пайп: {localPipeline.note + localPipeline.fund + localPipeline.insurance}
                        </Typography>
                        <Typography variant={"subtitle2"}>
                            Сделки: {localDeals.fund + localDeals.note + localDeals.insurance}
                        </Typography>
                    </Box>
                </Card>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                        Детали звонка
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mb: 2}}>
                        <Box mb={1}>
                            <strong>Дата:</strong> {formatedDate} <br/>
                            <strong>Время:</strong> {formatedTime} <br/>
                            <strong>Тип звонка:</strong> {type === "oldCall" ? "Старый" : "Новый"}
                        </Box>

                        {(pipeline.note + pipeline.fund + pipeline.insurance) !== 0 && (
                            <Box mb={1}>
                                <strong>Пайп:</strong>
                                <ul style={{margin: '4px 0 0 16px', padding: 0}}>
                                    <li>ИОБ: <EditableSpan value={localPipeline.note}
                                                           onChange={(val) => setLocalPipeline(p => ({
                                                               ...p,
                                                               note: Number(val)
                                                           }))}/></li>
                                    <li>ПИФ: <EditableSpan value={localPipeline.fund}
                                                           onChange={(val) => setLocalPipeline(p => ({
                                                               ...p,
                                                               note: Number(val)
                                                           }))}/></li>
                                    <li>ПДС: <EditableSpan value={localPipeline.insurance}
                                                           onChange={(val) => setLocalPipeline(p => ({
                                                               ...p,
                                                               note: Number(val)
                                                           }))}/></li>
                                </ul>
                            </Box>
                        )}

                        {(deals.note + deals.fund + deals.insurance) !== 0 && (
                            <Box mb={1}>
                                <strong>Сделки:</strong>
                                <ul style={{margin: '4px 0 0 16px', padding: 0}}>
                                    <li>ИОБ: <EditableSpan value={localDeals.note}
                                                           onChange={(val) => setLocalDeals(p => ({
                                                               ...p,
                                                               note: Number(val)
                                                           }))}/></li>
                                    <li>ПИФ: <EditableSpan value={localDeals.fund}
                                                           onChange={(val) => setLocalDeals(p => ({
                                                               ...p,
                                                               note: Number(val)
                                                           }))}/></li>
                                    <li>ПДС: <EditableSpan value={localDeals.insurance}
                                                           onChange={(val) => setLocalDeals(p => ({
                                                               ...p,
                                                               note: Number(val)
                                                           }))}/></li>
                                </ul>
                            </Box>
                        )}

                        <Box mb={1}>
                            <strong>Отказ ИОБ:</strong> {rejectNote ? "Да" : "Нет"} <br/>
                            <strong>Предложен ПИФ:</strong> {fundOffered ? "Да" : "Нет"}
                        </Box>
                    </Typography>

                    <Button variant="outlined"
                            sx={{backgroundColor: "#0f172a", color: "#ffffff", padding: "10px"}}
                            onClick={handleClose}>
                        Закрыть
                    </Button>
                </Box>
            </Modal>
        </>
    );
};
