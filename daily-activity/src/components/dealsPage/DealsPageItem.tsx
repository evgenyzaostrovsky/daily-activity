import Box from "@mui/material/Box";
import {Button, Card, Grid, Stack, Typography} from "@mui/material";
import React, {useState} from "react";
import {Dayjs} from "dayjs";


type dealsType = {
    note: number;
    fund: number;
    insurance: number;
};

type DealsPageItemPropsType = {
    id: string,
    date: Dayjs
    deals: dealsType

}

export const DealsPageItem = ({
    id,
    date,
    deals}: DealsPageItemPropsType
                              ) => {
    const formatedDate = date.format("DD.MM");
    const formatedTime = date.format("HH:mm");

    const [localDeals, setLocalDeals] = useState({...deals});

    return (
        <Grid

              size={{xs: 12, sm: 12, md: 12}}>
            <Card
                sx={{
                    display: "flex",
                    position: "relative",
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


                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignSelf: "flex-start",
                        minWidth: "120px",
                    }}
                >
                    <Typography variant="subtitle2">
                        Сделки:&nbsp;
                        <Box component="span" sx={{ fontWeight: 600 }}>
                            ИОБ:
                        </Box>{" "}
                        {localDeals.note}&nbsp;|&nbsp;
                        <Box component="span" sx={{ fontWeight: 600 }}>
                            ПИФ:
                        </Box>{" "}
                        {localDeals.fund}&nbsp;|&nbsp;
                        <Box component="span" sx={{ fontWeight: 600 }}>
                            ПДС:
                        </Box>{" "}
                        {localDeals.insurance}
                    </Typography>

                </Box>

            </Card>
        </Grid>
    );
};

