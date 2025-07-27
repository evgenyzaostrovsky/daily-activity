import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#7d7f7d',         // основной цвет
            light: '#63a4ff',
            dark: '#004ba0',
            contrastText: '#00171f', // текст на кнопках и т.д.
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#f3f8fd'
        }
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '4px',
                    textTransform: 'none',
                },
            },
        },
    },
});

