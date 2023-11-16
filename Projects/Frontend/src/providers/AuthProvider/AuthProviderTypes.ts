import { Role } from "models/backend/common";
import { User } from "models/backend/common/dtos";
import { Nullable } from "types";

export type AuthProviderContextType = {
  user?: Nullable<User>;

  login: (email: string, password: string) => void;
  logout: () => void;
  loggingIn: boolean;
}