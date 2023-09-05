import { createTheme } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Theme = createTheme({
    palette: {
        primary: {
            main: '#42a5f5'
        },
        secondary: {
            main: '#90caf9'
        },
        success: {
            main: '#0288d1'
        },
        warning: {
            main: '#d32f2f'
        },
        common: {
            white: 'white'
        }
    },
    typography: {
        body1: {
            fontSize: '1.5rem',
            fontFamily: 'Roboto'
        },
        body2: {
            fontSize: '1rem',
            fontFamily: 'Roboto'
        },
        h1: {
            fontSize: '6rem',
            fontFamily: 'Roboto',
        },
        h2: {
            fontSize: '3rem',
            fontFamily: 'Roboto',
        }
    }
});

export default Theme;