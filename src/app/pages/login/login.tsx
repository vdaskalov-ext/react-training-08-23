import {getDeepLink, useAuth} from "../../components/auth";
import {Navigate} from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, Paper,
    Stack,
    TextField
} from "@mui/material";
import {useState} from "react";
import {Send, Visibility, VisibilityOff} from "@mui/icons-material";

export const Login = () => {
    const link = getDeepLink()
    const {isAuthenticated, login} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    if (isAuthenticated) {
        return <Navigate to={link ?? "/home"}/>
    }

    return (<Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'primary.main'
    }}>
        <Box sx={{
            width: '80%',
            maxWidth: '500px'
        }}>
            <Paper sx={{padding: '2rem'}}>
                <Stack direction="column" spacing={3}>
                    <h1>Login</h1>
                    <TextField label="Email" type="email" value={email}
                               onChange={event => setEmail(event.target.value)}/>
                    <TextField label="Password" type="password" value={password}
                               onChange={event => setPassword(event.target.value)}/>
                    <Button variant="contained" onClick={() => login(email, password)} endIcon={<Send />}>Login</Button>
                </Stack>
            </Paper>
        </Box>
    </Box>)
}