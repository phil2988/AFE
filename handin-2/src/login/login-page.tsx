import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import API from '../core/axios';
import { UserLoginType, UserType } from '../core/types';
import { AxiosError, AxiosResponse } from 'axios';
import { getUser, saveUser } from '../core/user-utils';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submitLogin();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  const navigate = useNavigate();

  function submitLogin(): void {
    setWaitingForResponse(true);
    const body: UserLoginType = {
      email: email,
      password: password
    };

    API.post<UserLoginType>('Users/login', body)
      .then(
        (resp: AxiosResponse) => {
          console.log(resp);
          if (resp.status == 200) {
            saveUser({
              ...getUser(),
              loggedIn: true,
              jwt: 'Bearer ' + resp.data.jwt,
              email: email
            });
          }
        },
        () => {
          setWaitingForResponse(false);
          setErrorMessage('Error! Invalid login!');
        }
      )
      .then(
        () => {
          API.get<UserType[]>('Users', {
            headers: {
              Authorization: getUser().jwt
            }
          }).then(
            (resp) => {
              saveUser({
                ...getUser(),
                ...resp.data.find((u) => u.email == email)
              });
              navigate('/');
              window.location.reload();
            },
            (e) => {
              setWaitingForResponse(false);
              console.log(e);
              setErrorMessage('Error! Was not allowed to fetch user!');
            }
          );
        },
        (e) => {
          setWaitingForResponse(false);
          console.log(e);
          setErrorMessage('Error! Invalid login!');
        }
      );
  }

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Paper
        elevation={3}
        style={{
          marginTop: '10vh',
          width: '30vw',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2vh'
        }}
      >
        <Typography
          variant="h5"
          fontWeight={600}
          textAlign="center"
          mt="2vh"
          mb="2vh"
        >
          Please login to continue
        </Typography>
        <TextField
          variant="outlined"
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Password"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          disabled={waitingForResponse}
          variant="contained"
          onClick={() => {
            submitLogin();
          }}
        >
          Login
        </Button>
      </Paper>
      {errorMessage ? (
        <Typography
          variant="body1"
          style={{ color: 'red', marginTop: '2vh', textAlign: 'center' }}
        >
          {errorMessage}
        </Typography>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default LoginForm;
