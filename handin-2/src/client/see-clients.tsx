import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../core/axios';
import { UserType, WorkoutType } from '../core/types';
import { getUser } from '../core/user-utils';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SeeClientsProps {}

const SeeClients: FunctionComponent<SeeClientsProps> = () => {
  const [data, setData] = useState<UserType[]>();
  useEffect(() => {
    API.get<UserType[]>('Users/Clients', {
      headers: {
        Authorization: getUser().jwt
      }
    }).then((resp) => {
      setData(resp.data);
    });
  }, []);
  const navigate = useNavigate();

  if (getUser().accountType != 'PersonalTrainer')
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
          marginTop: '8vh',
          width: '70vw',
          padding: '30px',
          minHeight: '70vh'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '70%',
            maxHeight: '70vh'
          }}
        >
          <Typography textAlign="center" variant="h3">
            Your Clients, {getUser().firstName}
          </Typography>
          <List
            sx={{
              marginTop: '2vh',
              marginBottom: '2vh',
              overflow: 'auto'
            }}
          >
            {data?.map((user) => {
              return (
                <ListItem key={'workoutListItem' + user.userId}>
                  <ListItemText
                    primary={user.firstName + ' ' + user.lastName}
                    secondary={user.email}
                  ></ListItemText>
                </ListItem>
              );
            })}
          </List>
          <Button
            variant="contained"
            style={{ background: '#BA0E0E' }}
            onClick={() => navigate('/')}
          >
            Go Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SeeClients;
