import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import API from '../core/axios';
import { UserLoginType, UserType } from '../core/types';
import { AxiosError, AxiosResponse } from 'axios';
import { getUser, saveUser } from '../core/user-utils';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [user, setUser] = useState(getUser());
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  function submitLogin(): void {
    const body: UserLoginType = {
      email: user.email,
      password: user.password
    };

    API.post<UserLoginType>('Users/login', body)
      .then(
        (resp: AxiosResponse) => {
          if (resp.status == 200) {
            saveUser({
              ...getUser(),
              loggedIn: true,
              jwt: 'Bearer ' + resp.data.jwt,
              email: user.email
            });
          }
        },
        () => {
          setErrorMessage('Error! Invalid login!');
        }
      )
      .then(() => {
        API.get<UserType[]>('Users', {
          headers: {
            Authorization: getUser().jwt
          }
        }).then((resp) => {
          saveUser({
            ...getUser(),
            ...resp.data.find((u) => u.email == user.email)
          });
          navigate('/');
          window.location.reload();
        });
      });
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
          value={user.email}
          onChange={(e) =>
            setUser((old) => {
              return { ...old, email: e.target.value };
            })
          }
        />
        <TextField
          variant="outlined"
          label="Password"
          fullWidth
          type="password"
          value={user.password}
          onChange={(e) =>
            setUser((old) => {
              return { ...old, password: e.target.value };
            })
          }
        />
        <Button
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
