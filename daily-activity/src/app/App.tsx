import './App.css';
import {Header} from '../components/header/Header';
import {ThemeProvider, CssBaseline} from '@mui/material';
import {theme} from '../theme/theme.js';
import {Dashboard} from "../components/dashboard/Dashboard";
import {NavigationBar} from "../components/navigationbar/NavigationBar";
import {useState} from "react";
import Box from "@mui/material/Box";
import {ActiveTabType, MainRender} from "../components/MainRender";




function App() {

    const [activeTab, setActiveTab] = useState<ActiveTabType>('call');

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}>
                <CssBaseline/>

                <Box sx={{flexShrink: 0}}>
                    <Header/>
                </Box>
                <Dashboard/>
                <NavigationBar activeTab={activeTab} onChangeTab={setActiveTab}/>
                <MainRender activeTab={activeTab}/>
            </Box>
        </ThemeProvider>
    );
}


export default App;