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
import { ExerciseType, UserType } from '../core/types';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AddExerciseToWorkoutProps {}

const AddExerciseToWorkout: FunctionComponent<
  AddExerciseToWorkoutProps
> = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [time, setTime] = useState('');
  const [workoutId, setWorkoutId] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    const data: ExerciseType = {
      name: name,
      description: description,
      sets: sets,
      repetitions: reps,
      time: time
    };
    API.post('Exercises', data, {
      headers: {
        Authorization: getUser().jwt
      }
    })
      .then(
        (resp) => {
          console.log('Created exercise!');
        },
        () => {
          setErrorMessage('Error! Could not create exercise!' as string);
        }
      )
      .then(() => {
        API.post('Exercises', data, {
          headers: {
            Authorization: getUser().jwt
          }
        }).then(() => {
          navigate('/');
        });
      });
  };
  const handleCancel = () => {
    navigate('/');
  };

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
        <Typography variant="h3" textAlign="center" pb="2vh">
          Add new exercise to workout
        </Typography>

        <FormGroup style={{ gap: '2vh' }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            type="number"
            label="Sets"
            value={sets == 0 ? '' : sets}
            onChange={(e) => setSets(Number(e.target.value))}
          />
          <TextField
            type="number"
            label="Reps"
            disabled={time != ''}
            value={reps == 0 ? '' : reps}
            onChange={(e) => setReps(Number(e.target.value))}
          />
          <TextField
            label="Time"
            disabled={reps != 0}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <TextField
            type="number"
            label="Workout id"
            value={workoutId == 0 ? '' : workoutId}
            onChange={(e) => setWorkoutId(Number(e.target.value))}
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

export default AddExerciseToWorkout;
