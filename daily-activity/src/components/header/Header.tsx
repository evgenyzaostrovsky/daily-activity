import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import BasicDatePicker from "../../BasicDatePicker";

export function Header() {
    const today = new Date();

    const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const month = (today.getMonth() + 1) < 10 ? `0${today.getMonth() + 1}` : (today.getMonth() + 1);

    const formattedDate = `${day}.${month}.${today.getFullYear()}`;


    return (
        <Box sx={{ flexGrow: 1, }}>
            <AppBar position="static" elevation={0} sx={{
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                backgroundColor: "#ffffff",
            }}>
                <Toolbar   sx={{
                    maxWidth: '1140px',
                    width: '100%',
                    margin: '0 auto',
                    // центрируем
                }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="info"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <InsertChartOutlinedIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Учет активностей
                    </Typography>

                     <BasicDatePicker/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}