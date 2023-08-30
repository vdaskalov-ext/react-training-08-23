import { NavLink, Outlet } from 'react-router-dom';
import { AppBar, Box, Button, Stack } from '@mui/material';
import {useComponentsTranslation} from "../../i18n";

export const AppContainer = () => {
    const {t} = useComponentsTranslation('AppContainer')

    return (
        <Box sx={{width: '100vw', height: '100vh'}}>
            <AppBar position="static">
                <Stack direction="row">
                    <NavLink to={'/home'}>
                        {({isActive}) => (
                            <Button
                                sx={{borderRadius: 0}}
                                color="secondary"
                                variant={isActive ? 'contained' : 'text'}
                            >
                                Home
                            </Button>
                        )}
                    </NavLink>
                    <NavLink to={'/forbidden'}>
                        {({isActive}) => (
                            <Button
                                sx={{borderRadius: 0}}
                                color="secondary"
                                variant={isActive ? 'contained' : 'text'}
                            >
                                Forbidden
                            </Button>
                        )}
                    </NavLink>
                    <NavLink to={'/issues'}>
                        {({isActive}) => (
                            <Button
                                sx={{borderRadius: 0}}
                                color="secondary"
                                variant={isActive ? 'contained' : 'text'}
                            >
                                {t('issues.navLink')}
                            </Button>
                        )}
                    </NavLink>
                    <NavLink to={'/notes'}>
                        {({isActive}) => (
                            <Button
                                sx={{borderRadius: 0}}
                                color="secondary"
                                variant={isActive ? 'contained' : 'text'}
                            >
                                {t('notes.navLink')}
                            </Button>
                        )}
                    </NavLink>
                </Stack>
            </AppBar>
            <Outlet/>
        </Box>
    );
};
