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
import { WorkoutType } from '../core/types';
import { getUser } from '../core/user-utils';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SeeWorkoutsProps {}

const SeeWorkouts: FunctionComponent<SeeWorkoutsProps> = () => {
  const [data, setData] = useState<WorkoutType[]>();
  useEffect(() => {
    API.get<WorkoutType[]>('WorkoutPrograms', {
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
          <Button
            variant="contained"
            style={{ background: '#BA0E0E' }}
            onClick={() => navigate('/')}
          >
            Go Back
          </Button>
          <List
            sx={{
              marginTop: '2vh',
              overflow: 'auto'
            }}
          >
            {data?.map((workout) => {
              return (
                <ListItem key={'workoutListItem' + workout.workoutProgramId}>
                  <ListItemText
                    primary={workout.name}
                    secondary={workout.description}
                  ></ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default SeeWorkouts;
