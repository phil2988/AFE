import {
  Box,
  Card,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import API from '../core/axios';
import { WorkoutType } from '../core/types';
import { getUser } from '../core/user-utils';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PersonalWorkoutsProps {}

const PersonalWorkouts: FunctionComponent<PersonalWorkoutsProps> = () => {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const client = getUser();

  useEffect(() => {
    API.get<WorkoutType[]>('WorkoutPrograms/client/' + client.userId, {
      headers: {
        Authorization: client.jwt
      }
    }).then((resp) => {
      setWorkouts(resp.data);
      console.log(resp);
    });
  }, []);

  if (workouts.length == 1)
    return (
      <Box>
        <Card style={{ padding: '5vh', minWidth: '70vw', minHeight: '30vh' }}>
          <Typography variant="h4">Workout: {workouts[0].name}</Typography>
          <Typography variant="h6">
            Description: {workouts[0].description}
          </Typography>
          <Divider style={{ marginTop: '2vh', marginBottom: '2vh' }} />

          <Typography variant="h6" pb="2vh">
            Exercises:
          </Typography>

          {workouts[0].exercises.map((e) => {
            return (
              <Box
                key={'box' + e.exerciseId}
                display="flex"
                flexDirection="column"
                gap="2vh"
              >
                <Typography>{e.name}</Typography>
                <Typography>{e.description}</Typography>
                <Box display="flex" gap="3vw">
                  <Typography>reps: {e.repetitions}</Typography>
                  {e.sets ? <Typography>sets: {e.sets}</Typography> : <></>}
                  {e.time ? <Typography>time: {e.time}</Typography> : <></>}
                </Box>
                <Divider />
              </Box>
            );
          })}
        </Card>
      </Box>
    );

  if (workouts.length > 1)
    return (
      <Box>
        <Card style={{ padding: '5vh', minHeight: '30vh' }}>
          <Typography variant="h6">
            You have more than one workout. Please select one from the list
            below
          </Typography>
          <Box
            style={{
              display: 'flex',
              width: '100%',
              maxHeight: '40vh'
            }}
          >
            <List style={{ overflow: 'auto', width: '100%' }}>
              {workouts.map((w) => {
                return (
                  <>
                    <Divider />
                    <ListItemButton
                      key={'Listitem_' + w.workoutProgramId}
                      onClick={() => {
                        setWorkouts([w]);
                      }}
                    >
                      <ListItemText
                        primary={w.name}
                        secondary={w.description}
                      ></ListItemText>
                    </ListItemButton>
                  </>
                );
              })}
            </List>
          </Box>
        </Card>
      </Box>
    );
  else return <Typography>Something went wrong...</Typography>;
};

export default PersonalWorkouts;
