import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../core/axios';
import { UserType } from '../core/types';
import { saveUser, getUser, clearUser } from '../core/user-utils';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeProps {}

const HomePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(getUser());
  useEffect(() => {
    API.get<UserType[]>('Users', {
      headers: {
        Authorization: user.jwt
      }
    }).then((resp) => {
      setUser((old) => {
        return { ...old, ...resp.data.find((u) => u.email == user.email) };
      });
      saveUser(user);
    });
  }, []);

  const displayAccountOptions = () => {
    switch (user.accountType) {
      case 'Client':
        break;
      case 'PersonalTrainer':
        return (
          <Box display="flex" gap="10px">
            <Button
              variant="contained"
              onClick={() => {
                navigate('/create-client');
              }}
            >
              Create client
            </Button>
            <Button variant="contained">Create program</Button>
            <Button variant="contained">Add exercise to program</Button>
            <Button variant="contained">See programs</Button>
            <Button variant="contained">See clients</Button>
          </Box>
        );
      case 'Manager':
        return (
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                navigate('/create-personal-trainer');
              }}
            >
              Add Personal Trainer
            </Button>
          </Box>
        );
      default:
        break;
    }
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <>
        <Typography variant="h3" m="4vh">
          Welcome {user.firstName ?? 'User'}, {user.lastName ?? ''}
        </Typography>

        <Typography variant="h5">
          Here are the options available for your account type
        </Typography>

        <Box style={{ display: 'flex', gap: '2vh', margin: '2vh' }}>
          {displayAccountOptions()}
        </Box>

        <Button
          variant="contained"
          onClick={() => {
            clearUser();
          }}
        >
          Log out
        </Button>
      </>
    </Box>
  );
};

export default HomePage;
