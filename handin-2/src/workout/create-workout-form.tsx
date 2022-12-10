import {
  Box,
  Button,
  Card,
  Divider,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import API from '../core/axios';
import { getUser } from '../core/user-utils';
import { ExerciseType, UserType, WorkoutType } from '../core/types';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateWorkoutProps {}

const CreateWorkout: FunctionComponent<CreateWorkoutProps> = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [exercises, setExercises] = useState<ExerciseType[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<ExerciseType[]>(
    []
  );

  useEffect(() => {
    API.get<ExerciseType[]>('Exercises', {
      headers: {
        Authorization: getUser().jwt
      }
    }).then((resp) => {
      setExercises(resp.data);
    });
  }, []);

  useEffect(() => {
    console.log(exercises);
  }, [exercises]);
  const createUnselectedExercisesListView = () => {
    return exercises.map((exercise) => (
      <ListItem
        key={'exerciseListItem_' + exercise.exerciseId}
        secondaryAction={
          <IconButton
            onClick={() => {
              setSelectedExercises((old) => {
                return [...old, exercise];
              });
              setExercises((old) => {
                const newArr: ExerciseType[] = [];

                old.forEach((oldExercise) => {
                  if (oldExercise != exercise) {
                    newArr.push(oldExercise);
                  }
                });
                return newArr;
              });
            }}
          >
            <AddIcon />
          </IconButton>
        }
      >
        <ListItemText
          primary={exercise.name}
          secondary={exercise.description}
        />
      </ListItem>
    ));
  };

  const createSelectedExercisesListView = () => {
    return selectedExercises.length > 0
      ? selectedExercises.map((exercise) => (
          <ListItem
            key={'exerciseListItem' + exercise.exerciseId}
            secondaryAction={
              <IconButton
                onClick={() => {
                  setExercises((old) => {
                    return [...old, exercise];
                  });

                  setSelectedExercises((old) => {
                    const newArr: ExerciseType[] = [];

                    old.forEach((oldExercise) => {
                      if (oldExercise != exercise) {
                        newArr.push(oldExercise);
                      }
                    });
                    return newArr;
                  });
                }}
              >
                <RemoveIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={exercise.name}
              secondary={exercise.description}
            />
          </ListItem>
        ))
      : [
          <ListItem key={'default'}>
            <ListItemText primary={'No exercises selected...'} secondary="" />
          </ListItem>
        ];
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    const data: WorkoutType = {
      clientId: clientId,
      description: description,
      name: title,
      personalTrainerId: getUser().userId as number,
      exercises: selectedExercises.map((exercise) => {
        return { ...exercise, exerciseId: undefined };
      })
    };
    API.post('WorkoutPrograms', data, {
      headers: {
        Authorization: getUser().jwt
      }
    }).then((resp) => {
      if (resp.status == 201) {
        navigate('/');
      }
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
          Create workout
        </Typography>

        <FormGroup style={{ gap: '2vh' }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            type="number"
            label="Client id"
            value={clientId == 0 ? '' : clientId}
            onChange={(e) => setClientId(Number(e.target.value))}
          />
          <Box display="flex" justifyContent="space-between">
            <Card
              elevation={3}
              sx={{
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                width: '45%',
                height: '20vh'
                // border: '1px solid black'
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                Selected Exercises
              </Typography>
              <List sx={{ overflow: 'auto' }}>
                {createSelectedExercisesListView()}
              </List>
            </Card>

            <Card
              elevation={3}
              sx={{
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                width: '45%',
                height: '20vh'
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                All Exercises
              </Typography>
              <List sx={{ overflow: 'auto' }}>
                {createUnselectedExercisesListView()}
              </List>
            </Card>
          </Box>
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

export default CreateWorkout;
