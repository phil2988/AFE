import {
  Box,
  Button,
  Card,
  FormGroup,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { FunctionComponent, useState } from 'react';
import API from '../core/axios';
import { getUser } from '../core/user-utils';
import { UserType } from '../core/types';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreatePersonalTrainerProps {}

const CreatePersonalTrainer: FunctionComponent<
  CreatePersonalTrainerProps
> = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    const data: UserType = {
      email,
      firstName,
      lastName,
      password,
      loggedIn: true,
      accountType: 'PersonalTrainer'
    };
    API.post('Users', data, {
      headers: {
        Authorization: getUser().jwt
      }
    }).then(
      (resp) => {
        console.log(resp);
        if (resp.status == 201) {
          navigate('/');
        }
      },
      (error: AxiosError<{ error: string }>) => {
        setErrorMessage(
          ('Error! ' + error.response?.data.error + '!') as string
        );
      }
    );
  };

  const handleCancel = () => {
    console.log('Cancelled');
  };

  if (getUser().accountType != 'Manager')
    return (
      <Typography variant="h3" textAlign="center">
        You do not have access to this page
      </Typography>
    );
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
          width: '70vw',
          padding: '10px',
          minHeight: '70vh'
        }}
      >
        <Typography variant="h3" textAlign="center" p="2vh">
          Create personal trainer account
        </Typography>

        <FormGroup style={{ gap: '2vh' }}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box style={{ display: 'flex', gap: '1vw' }}>
            <Button
              variant="contained"
              style={{ backgroundColor: '#49CA3E' }}
              onClick={handleSubmit}
            >
              Create
            </Button>
            <Button
              variant="contained"
              style={{ background: '#BA0E0E' }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </FormGroup>
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

export default CreatePersonalTrainer;
