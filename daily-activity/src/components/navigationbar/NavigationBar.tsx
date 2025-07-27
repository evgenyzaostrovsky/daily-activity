import React from 'react';
import {Tabs, Tab, Box, useTheme, useMediaQuery} from '@mui/material';

import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import FreeCancellationOutlinedIcon from '@mui/icons-material/FreeCancellationOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import {ActiveTabType} from "../MainRender";

export const NAV_ITEMS = {
    CALL: 'call',
    DEALS: 'deals',
    PIPE: 'pipe',
    RESULT: 'result',
    HISTORY: 'history',
    INCENTIVE: 'incentive'
};

type NavbarProps = {
    activeTab: string;
    onChangeTab: (newValue: ActiveTabType) => void;
};

export const NavigationBar: React.FC<NavbarProps> = ({activeTab, onChangeTab}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",



        }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    alignSelf: "center",
                    borderBottom: 1,
                    borderColor: 'divider',
                    backgroundColor: 'white',
                    maxWidth: '1140px',
                    width: '100%',


                }}
            >
                <Tabs
                    value={activeTab}
                    onChange={(_, newValue) => onChangeTab(newValue)}
                    variant={isSmallScreen ? 'scrollable' : 'fullWidth'}
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary"
                    sx = {{width: "100%"}}


                >
                    <Tab
                        label={
                            <span style={{display: 'flex', alignItems: 'center', gap: 4}}>
                            <PhoneOutlinedIcon fontSize="small"/>
                            Звонок
                             </span>}
                            value={NAV_ITEMS.CALL}
                            onClick={ () => {onChangeTab('call')}}
                            sx={{
                            '&.Mui-selected': {
                            color: "inherit",
                            fontWeight: "bold",
                        },
                        }}/>
                            <Tab
                                label={
                                    <span style={{display: 'flex', alignItems: 'center', gap: 4}}>
                            <TaskAltIcon fontSize="small"/>
                            Сделки
                             </span>}
                                value={NAV_ITEMS.DEALS}
                                onClick={ () => {onChangeTab('deals')}}
                                sx={{
                        '&.Mui-selected': {
                            color: "inherit",
                            fontWeight: "bold",
                        },
                    }}/>
                    <Tab
                        label={
                            <span style={{display: 'flex', alignItems: 'center', gap: 4}}>
                            <TrendingUpOutlinedIcon fontSize="small"/>
                            Пайп
                             </span>}
                         value={NAV_ITEMS.PIPE}
                         sx={{
                        '&.Mui-selected': {
                            color: "inherit",
                            fontWeight: "bold",
                        },
                    }}/>
                    <Tab
                        label={
                            <span style={{display: 'flex', alignItems: 'center', gap: 4}}>
                            <FreeCancellationOutlinedIcon fontSize="small"/>
                            Итоги дня
                             </span>}
                         value={NAV_ITEMS.RESULT}
                         sx={{
                        '&.Mui-selected': {
                            color: "inherit",
                            fontWeight: "bold",
                        },
                    }}/>
                    <Tab
                        label={
                            <span style={{display: 'flex', alignItems: 'center', gap: 4}}>
                            <HistoryOutlinedIcon fontSize="small"/>
                            История
                             </span>}
                        value={NAV_ITEMS.HISTORY}
                        sx={{
                            '&.Mui-selected': {
                                color: "inherit",
                                fontWeight: "bold",
                            },
                        }}/>
                    <Tab
                        label={
                            <span style={{display: 'flex', alignItems: 'center', gap: 4}}>
                            <EmojiEventsOutlinedIcon fontSize="small"/>
                            Мотивация
                             </span>}
                        value={NAV_ITEMS.INCENTIVE}
                        sx={{
                            '&.Mui-selected': {
                                color: "inherit",
                                fontWeight: "bold",
                            },
                        }}/>
                </Tabs>
            </Box>
        </Box>


    );
};
