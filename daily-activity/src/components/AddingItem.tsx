import {Card, CardContent, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, {ChangeEventHandler} from "react";

type AddingItemPropsType = {
    title: string;
    titleIcon: React.ReactNode;
    inputDescription: string;
    callback: (value: number) => void;
    value: number;
}

export const AddingItem = (
    {
        title,
        titleIcon,
        inputDescription,
        callback,
        value
    }: AddingItemPropsType,
) => {

    const callbackHandler = (value: number) => {
        callback(value)
    }
    const error = value < 0
    return (
        <Card sx={
            {
                padding: "30px",

            }}>
            <CardContent style={
                {
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    padding: "0px"
                }
            }>
                <Box color="textSecondary"
                     sx={{
                         display: "flex",
                         flexDirection: "row",
                         alignItems: "center",
                         gap: "5px",
                         verticalAlign: "bottom "
                     }}>
                    {titleIcon}
                    <Typography color="textSecondary" sx={{marginTop: "1px"}}>{title}</Typography>
                </Box>

                <TextField
                    label={inputDescription}
                    type="number"
                    variant="outlined"
                    fullWidth
                    color="info"
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newValue = Math.max(0, Number(e.target.value));
                        callbackHandler(newValue)}
                    }

                />


                <Typography variant="subtitle2" color="textSecondary" sx={{opacity: '0.5'}}>
                    Текущее значение: {value}
                </Typography>

            </CardContent>

        </Card>
    );
};

