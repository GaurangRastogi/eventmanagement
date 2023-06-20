import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate} from 'react-router-dom';



const theme = createTheme();

 

function SignInAdmin() {

  const navigate=useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const Signin= async()=>{
        const response=await fetch(process.env.REACT_APP_API_URL+'signInAdmin',{
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                { 
                    name: data.get('name'),
                    password: data.get('password'),

                }
            )
        });
        
        const json = await response.json();
        if(json.message==="No user found"||json.message==="Error Occured"){
          alert(json.message);

        }
        else{
          navigate('/admin',{state:{name:data.get('name'),password: data.get('password'),id:json.message}});
        }

    }
    return Signin();
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Admin Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

              <Link href="/" variant="body2">
                {"Go Back"}
              </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignInAdmin;