import { Card, Typography, Button, Box, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { EditableSpan } from "../../EditableSpan";
import { useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import {Call} from "../../features/calls/callsSlice";
import dayjs from "dayjs";

export const DayResults = () => {
    const selectedDate = useSelector((state: RootState) => state.date.selectedDate);
    const callsState = useSelector((state: RootState) => state.calls);
    const calls: Call[] = callsState.filter((call) =>
        dayjs(call.timestamp).isSame(selectedDate, 'day')
    );

    const today = selectedDate.toDate(); // получаем JS Date
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1)

    const formatDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const formattedToday = formatDate(today);
    const formattedTomorrow = formatDate(tomorrow);

    const [iobValue, setIobValue] = useState(0);
    const [fundValue, setFundValue] = useState(0);
    const [insuranceValue, setInsuranceValue] = useState(0);
    const [copied, setCopied] = useState(false);

    const buildText = () => {
        const lines = [];
        lines.push(`${formattedToday}`, "");
        lines.push(`Звонки: ${calls.length}`);
        lines.push(`Новые: ${calls.filter(c => c.type === "newCall").length}`);
        lines.push(`Старые: ${calls.filter(c => c.type === "oldCall").length}`, "");
        lines.push("ВС СП:");
        lines.push(`Кол-во: ${calls.filter(c => c.pipe.note !== 0).length}`);
        lines.push(`Сумма: ${calls.reduce((acc, c) => acc + c.pipe.note, 0)}`, "");
        lines.push(`Отказ от ИОБ: ${calls.filter(c => c.noteReject).length}`);
        lines.push(`Предложен ПИФ: ${calls.filter(c => c.fundOffered).length}`, "");
        lines.push("ВС ПИФ:");
        lines.push(`Кол-во: ${calls.filter(c => c.pipe.fund !== 0).length}`);
        lines.push(`Сумма: ${calls.reduce((acc, c) => acc + c.pipe.fund, 0)}`, "");
        lines.push("ВС ПДС:");
        lines.push(`Кол-во: ${calls.filter(c => c.pipe.insurance !== 0).length}`);
        lines.push(`Сумма: ${calls.reduce((acc, c) => acc + c.pipe.insurance, 0)}`, "");
        lines.push(`РС СП: ${calls.reduce((acc, c) => acc + c.deals.note, 0)}`);
        lines.push(`РС ПИФ: ${calls.reduce((acc, c) => acc + c.deals.fund, 0)}`);
        lines.push(`РС ПДС: ${calls.reduce((acc, c) => acc + c.deals.insurance, 0)}`, "");
        lines.push(`ВС на ${formattedTomorrow}`, "");
        lines.push(`ИОБ: ${iobValue}`);
        lines.push(`ПИФ: ${fundValue}`);
        lines.push(`ПДС: ${insuranceValue}`);
        return lines.join("\n");
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(buildText());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Ошибка копирования:", err);
        }
    };

    return (
        <Card
            sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                margin: "10px auto",
                maxWidth: "1140px",
                width: "100%",
                padding: "16px",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
            }}
        >
            {/* Отображение текста с EditableSpan */}
            <Paper
                elevation={2}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#f5f5f5",
                    fontFamily: "monospace",
                    fontSize: "14px",
                    whiteSpace: "pre-wrap",
                }}
            >
                <div>{formattedToday}</div>
                <div>Звонки: {calls.length}</div>
                <div>Новые: {calls.filter(c => c.type === "newCall").length}</div>
                <div>Старые: {calls.filter(c => c.type === "oldCall").length}</div>
                <br />
                <div>ВС СП:</div>
                <div>Кол-во: {calls.filter(c => c.pipe.note !== 0).length}</div>
                <div>Сумма: {calls.reduce((acc, c) => acc + c.pipe.note, 0)}</div>
                <br />
                <div>Отказ от ИОБ: {calls.filter(c => c.noteReject).length}</div>
                <div>Предложен ПИФ: {calls.filter(c => c.fundOffered).length}</div>
                <br />
                <div>ВС ПИФ:</div>
                <div>Кол-во: {calls.filter(c => c.pipe.fund !== 0).length}</div>
                <div>Сумма: {calls.reduce((acc, c) => acc + c.pipe.fund, 0)}</div>
                <br />
                <div>ВС ПДС:</div>
                <div>Кол-во: {calls.filter(c => c.pipe.insurance !== 0).length}</div>
                <div>Сумма: {calls.reduce((acc, c) => acc + c.pipe.insurance, 0)}</div>
                <br />
                <div>РС СП: {calls.reduce((acc, c) => acc + c.deals.note, 0)}</div>
                <div>РС ПИФ: {calls.reduce((acc, c) => acc + c.deals.fund, 0)}</div>
                <div>РС ПДС: {calls.reduce((acc, c) => acc + c.deals.insurance, 0)}</div>
                <br />
                <div>{formattedTomorrow}</div>
                <div>ВС ИОБ: <EditableSpan value={iobValue} onChange={setIobValue} /></div>
                <div>ВС ПИФ: <EditableSpan value={fundValue} onChange={setFundValue} /></div>
                <div>ВС ПДС: <EditableSpan value={insuranceValue} onChange={setInsuranceValue} /></div>
            </Paper>

            {/* Кнопка копирования */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                    startIcon={!copied ? <ContentCopyIcon /> : <DoneIcon color={"success"} />}
                    onClick={handleCopy}
                    sx={{
                        backgroundColor: copied ? "#e0f7e9" : "#d8dbda",
                        color: copied ? "#2e7d32" : "#5f8156",
                        "&:hover": { backgroundColor: "#cdd1cf" },
                    }}
                >
                    {copied ? "Скопировано" : "Скопировать"}
                </Button>
            </Box>
        </Card>
    );
};
