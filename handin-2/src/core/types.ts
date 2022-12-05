export type UserLoginType = {
    email?: string;
    password?: string;
  }

export type WorkoutType = {
  workoutProgramId?: number
  name: string
  description: string
  exercises: ExerciseType[]
  personalTrainerId: number
  clientId: number
}

export type ExerciseType = {
  exerciseId?: number
  name: string
  description: string
  sets: number
  repetitions: number
  time: string
  workoutProgramId?: number
  personalTrainerId?: number
}

export type UserType = {
  userId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  personalTrainerId?: number;
  accountType?: AccountType;
  loggedIn?: boolean;
  jwt?: string
}

export type AccountType = "PersonalTrainer" | "Manager"| "Client" | null