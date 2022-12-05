export type UserLoginType = {
    email?: string;
    password?: string;
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