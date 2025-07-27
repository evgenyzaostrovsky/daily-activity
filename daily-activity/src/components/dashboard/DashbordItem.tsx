import { Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

type DashboardItemType = {
    title: string;
    value: string | number | React.ReactNode;
    description?: string;
    iconText?: React.ReactNode;
    color?: string
};

export const DashboardItem = ({ title, value, description, iconText, color }: DashboardItemType) => {


    return (
        <Card sx={{
            padding: "10px",
            minWidth: "250px",
            minHeight: "120px",
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
                transform: 'translateY(-2px) scale(1.01)',
                boxShadow: 6
            },
            cursor: 'pointer'
        }}>
            <CardContent style={{ padding: "10px" }}>
                <Box
                    color="textSecondary"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "5px",
                        verticalAlign: "bottom"
                    }}
                >
                    {iconText}
                    <Typography color="textSecondary" sx={{ marginTop: "1px" }}>
                        {title}
                    </Typography>
                </Box>
                <Typography sx={{ fontWeight: "bold", marginTop: "5px", color: color || "textSecondary" }}>
                    {value}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" sx={{ opacity: '0.5' }}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};
