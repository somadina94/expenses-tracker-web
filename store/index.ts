import { login, logout, setUser, AuthState } from "./authSice";
import store, {
  useAppDispatch,
  useAppSelector,
  RootState,
  persistor,
  AppDispatch,
} from "./store";

export {
  login,
  logout,
  setUser,
  useAppDispatch,
  useAppSelector,
  type RootState,
  persistor,
  type AppDispatch,
  store,
  type AuthState,
};
