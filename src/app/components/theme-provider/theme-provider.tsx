import {FC, PropsWithChildren, useMemo} from "react";
import {createTheme, ThemeProvider} from "@mui/material";

export const CustomThemeProvider: FC<PropsWithChildren> = ({children}) => {
    const theme = useMemo(() => {
        return createTheme({
            palette: {
                primary: {
                    main: '#6E9C9F'
                },
                secondary: {
                    main: '#91DD98'
                }
            }
        })
    }, [])

    return <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>;
}