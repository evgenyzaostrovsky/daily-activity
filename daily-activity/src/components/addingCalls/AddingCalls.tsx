import { Card, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import { addCall, Call } from "../../features/calls/callsSlice";
import { useDispatch } from "react-redux";

export const AddingCalls = () => {
    const dispatch = useDispatch();

    const [newCall, setNewCall] = useState(false);
    const [oldCall, setOldCall] = useState(false);
    const [noteReject, setNoteReject] = useState(false);
    const [fundOffered, setFundOffered] = useState(false);
    const [itIsDeal, setItIsDeal] = useState(false);

    const [localNotePipe, setLocalNotePipe] = useState(0);
    const [localFundPipe, setLocalFundPipe] = useState(0);
    const [localInsurancePipe, setLocalInsurancePipe] = useState(0);

    const [localNoteDeal, setLocalNoteDeal] = useState(0);
    const [localFundDeal, setLocalFundDeal] = useState(0);
    const [localInsuranceDeal, setLocalInsuranceDeal] = useState(0);

    const emptyCallCondition = !newCall && !oldCall;

    const handleAddCall = () => {
        if (emptyCallCondition) {
            alert('Выберите тип звонка');
            return;
        }

        const newCallAdding: Call = {
            id: Date.now().toString(),
            type: newCall ? 'newCall' : 'oldCall',
            timestamp: new Date().toISOString(),
            noteReject,
            fundOffered,
            pipe: {
                note: localNotePipe,
                fund: localFundPipe,
                insurance: localInsurancePipe,
            },
            deals: {
                note: localNoteDeal,
                fund: localFundDeal,
                insurance: localInsuranceDeal,
            }
        };

        setLocalNotePipe(0);
        setLocalFundPipe(0);
        setLocalInsurancePipe(0);

        setLocalNoteDeal(0);
        setLocalFundDeal(0);
        setLocalInsuranceDeal(0);

        setNewCall(false);
        setOldCall(false);
        setNoteReject(false);
        setFundOffered(false);
        setItIsDeal(false);

        dispatch(addCall(newCallAdding));
    };

    useEffect(() => {
        if (!emptyCallCondition) {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    if (document.activeElement instanceof HTMLElement) {
                        document.activeElement.blur();
                    }
                    handleAddCall();
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [
        emptyCallCondition,
        newCall,
        oldCall,
        noteReject,
        fundOffered,
        itIsDeal,
        localNotePipe,
        localFundPipe,
        localInsurancePipe,
        localNoteDeal,
        localFundDeal,
        localInsuranceDeal,
    ]);

    const buttonDealColor = itIsDeal
        ? { border: "1px solid #e2e8f0", backgroundColor: "#b9fbc0", color: "black" }
        : { color: "#0a0817" };

    const buttonOldCallStyles = oldCall
        ? { backgroundColor: "#90dbf4", color: 'black', width: "50%" }
        : { color: "#0a0817", width: "50%" };

    const buttonNewCallStyles = newCall
        ? { backgroundColor: "#b9fbc0", color: 'black', width: "50%" }
        : { color: "#0a0817", width: "50%" };

    const buttonNoteRejectedStyles = noteReject
        ? { border: '1px solid #e2e8f0', backgroundColor: "#ef4444", color: 'white' }
        : { color: "#0a0817" };

    const buttonFundOfferedStyles = fundOffered
        ? { border: '1px solid #e2e8f0', backgroundColor: "#90dbf4", color: 'black' }
        : { color: "#0a0817" };

    const onChangeHandler = (state: "NEW_CALL" | "OLD_CALL" | "NOTE_REJECT" | "FUND_OFFERED" | "ITS_DEAL") => {
        switch (state) {
            case "NEW_CALL":
                setNewCall(true);
                setOldCall(false);
                break;
            case "OLD_CALL":
                setNewCall(false);
                setOldCall(true);
                break;
            case "NOTE_REJECT":
                setNoteReject(!noteReject);
                break;
            case "FUND_OFFERED":
                setFundOffered(!fundOffered);
                break;
            case "ITS_DEAL":
                setItIsDeal(!itIsDeal);
                break;
            default:
                setNewCall(false);
                setOldCall(false);
                setNoteReject(false);
                setFundOffered(false);
                setItIsDeal(false);
        }
    };

    return (
        <Card
            tabIndex={0}
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
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px", alignSelf: "flex-start", padding: "5px" }}>
                <InfoOutlineIcon color="info" />
                <Typography variant="h6">Добавить результат звонка</Typography>
            </Box>

            <Grid container spacing={2} sx={{ width: '100%', marginTop: '20px' }}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                        <Typography>Тип звонка</Typography>
                        <Box sx={{ display: "flex", mt: "15px", gap: "5px" }}>
                            <Button
                                variant="outlined"
                                startIcon={<WifiCalling3Icon color={"success"} />}
                                onClick={() => onChangeHandler("NEW_CALL")}
                                sx={buttonNewCallStyles}
                            >
                                Новый
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<PhoneCallbackIcon color={"info"} />}
                                onClick={() => onChangeHandler("OLD_CALL")}
                                sx={buttonOldCallStyles}
                            >
                                Старый
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", flexDirection: "column", padding: "10px", gap: "5px" }}>
                        <Typography sx={{ mb: "10px" }}>Результаты звонка</Typography>
                        <Button variant="outlined" onClick={() => onChangeHandler("NOTE_REJECT")} sx={buttonNoteRejectedStyles}>
                            Отказ от ИОБ
                        </Button>
                        <Button variant="outlined" onClick={() => onChangeHandler("FUND_OFFERED")} sx={buttonFundOfferedStyles}>
                            Предложен ПИФ
                        </Button>
                        <Button variant="outlined" onClick={() => onChangeHandler("ITS_DEAL")} sx={buttonDealColor}>
                            Реализованная сделка
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ width: "100%", padding: "0px 30px " }}>
                <Box sx={{ mb: "20px" }}>
                    <Typography sx={{ mb: "20px" }}>Пайп по продуктам</Typography>
                    <Box sx={{ display: "flex", gap: "10px", width: "100%" }}>
                        <TextField
                            type="number"
                            size="small"
                            label="ИОБ (рублей)"
                            value={localNotePipe}
                            onChange={(e) => setLocalNotePipe(+e.currentTarget.value)}
                            sx={{ flex: 1 }}
                        />
                        <TextField
                            type="number"
                            size="small"
                            label="ПИФ (рублей)"
                            value={localFundPipe}
                            onChange={(e) => setLocalFundPipe(+e.currentTarget.value)}
                            sx={{ flex: 1 }}
                        />
                        <TextField
                            type="number"
                            size="small"
                            label="ПДС (рублей)"
                            value={localInsurancePipe}
                            onChange={(e) => setLocalInsurancePipe(+e.currentTarget.value)}
                            sx={{ flex: 1 }}
                        />
                    </Box>
                </Box>
            </Box>

            {itIsDeal && (
                <Box sx={{ width: "100%", padding: "10px" }}>
                    <Box sx={{ mb: "20px" }}>
                        <Typography sx={{ mb: "20px" }}>Реализованная сделка</Typography>
                        <Box sx={{ display: "flex", gap: "10px", width: "100%" }}>
                            <TextField
                                type="number"
                                size="small"
                                label="ИОБ (рублей)"
                                value={localNoteDeal}
                                onChange={(e) => setLocalNoteDeal(+e.currentTarget.value)}
                                sx={{ flex: 1 }}
                            />
                            <TextField
                                type="number"
                                size="small"
                                label="ПИФ (рублей)"
                                value={localFundDeal}
                                onChange={(e) => setLocalFundDeal(+e.currentTarget.value)}
                                sx={{ flex: 1 }}
                            />
                            <TextField
                                type="number"
                                size="small"
                                label="ПДС (рублей)"
                                value={localInsuranceDeal}
                                onChange={(e) => setLocalInsuranceDeal(+e.currentTarget.value)}
                                sx={{ flex: 1 }}
                            />
                        </Box>
                    </Box>
                </Box>
            )}

            {!emptyCallCondition && (
                <Button
                    onClick={handleAddCall}
                    fullWidth
                    sx={{
                        backgroundColor: "#0f172a",
                        color: "#ffffff",
                        margin: "10px",
                    }}
                >
                    + Добавить звонок
                </Button>
            )}
        </Card>
    );
};
