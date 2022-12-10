import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalWorkouts from '../client/see-personal-workouts';
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
        return (
          <Box>
            <PersonalWorkouts />
          </Box>
        );
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

            <Button
              variant="contained"
              onClick={() => {
                navigate('/create-workout');
              }}
            >
              Create workout
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                navigate('/create-exercise');
              }}
            >
              Add exercise to workout
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                navigate('/see-workouts');
              }}
            >
              See all workouts
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                navigate('/see-clients');
              }}
            >
              See all clients
            </Button>
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

        {getUser().accountType == 'Client' ? (
          <></>
        ) : (
          <Typography variant="h5">
            Here are the options available for your account type
          </Typography>
        )}

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
        <Box minHeight="10vh" />
      </>
    </Box>
  );
};

export default HomePage;
