
import { resetUser, selectUser } from "../redux/reducers/userReducer";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getLocalToken } from "../services/helpers";

const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const authenticatedUser =  useAppSelector(selectUser);

  const AuthenticatedUserHaveValidToken = authenticatedUser.user.token || null;

  const IsAuthenticated = !!authenticatedUser.user.token;

  const IsAuth = getLocalToken

  const LoggedInUser = authenticatedUser.user;

  const SignOut = () => dispatch(resetUser());

  return {
    AuthenticatedUserHaveValidToken,
    IsAuthenticated,
    IsAuth,
    SignOut,
    LoggedInUser,
  };
};

export default useAuthCheck;