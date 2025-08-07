import { Card, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { EditableSpan } from "../../EditableSpan";
import { useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';

export const DayResults = () => {
    const calls = useSelector((state: RootState) => state.calls);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const formattedToday = formatDate(today);
    const formattedTomorrow = formatDate(tomorrow);

    // EditableSpan значения можно будет сюда вставить через state
    const [iobValue, setIobValue] = useState(0);
    const [fundValue, setFundValue] = useState(0);
    const [insuranceValue, setInsuranceValue] = useState(0);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
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

        const textToCopy = lines.join("\n");

        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // вернёт обратно через 2 секунды
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
                padding: "10px",
            }}
        >
            <Typography>{formattedToday}</Typography>
            <Typography>Всего звонков: {calls.length}</Typography>
            <Typography>Новые звонки: {calls.filter(c => c.type === "newCall").length}</Typography>
            <Typography>Старые звонки: {calls.filter(c => c.type === "oldCall").length}</Typography>

            <br />
            <Typography>ВС СП:</Typography>
            <Typography>Кол-во: {calls.filter(c => c.pipe.note !== 0).length}</Typography>
            <Typography>Сумма: {calls.reduce((acc, c) => acc + c.pipe.note, 0)}</Typography>

            <br />
            <Typography>Отказ от ИОБ: {calls.filter(c => c.noteReject).length}</Typography>
            <Typography>Предложен ПИФ: {calls.filter(c => c.fundOffered).length}</Typography>

            <br />
            <Typography>ВС ПИФ:</Typography>
            <Typography>Кол-во: {calls.filter(c => c.pipe.fund !== 0).length}</Typography>
            <Typography>Сумма: {calls.reduce((acc, c) => acc + c.pipe.fund, 0)}</Typography>

            <br />
            <Typography>ВС ПДС:</Typography>
            <Typography>Кол-во: {calls.filter(c => c.pipe.insurance !== 0).length}</Typography>
            <Typography>Сумма: {calls.reduce((acc, c) => acc + c.pipe.insurance, 0)}</Typography>

            <br />
            <Typography>РС СП: {calls.reduce((acc, c) => acc + c.deals.note, 0)}</Typography>
            <Typography>РС ПИФ: {calls.reduce((acc, c) => acc + c.deals.fund, 0)}</Typography>
            <Typography>РС ПДС: {calls.reduce((acc, c) => acc + c.deals.insurance, 0)}</Typography>

            <br />
            <Typography>{formattedTomorrow}</Typography>
            <Typography>
                ВС ИОБ: <EditableSpan value={iobValue} onChange={setIobValue} />
            </Typography>
            <Typography>
                ВС ПИФ: <EditableSpan value={fundValue} onChange={setFundValue} />
            </Typography>
            <Typography>
                ВС ПДС: <EditableSpan value={insuranceValue} onChange={setInsuranceValue} />
            </Typography>

            <Button startIcon={!copied ? <ContentCopyIcon /> : <DoneIcon color={"success"}/>} onClick={handleCopy} sx={{ mt: 2 }}>{copied ? 'Скопировано' : 'Скопировать'}</Button>
        </Card>
    );
};
