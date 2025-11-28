import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { AuthModel, UserModel } from './_models';
import * as authHelper from './AuthHelpers'
import { WithChildren } from '../../../../admin/helpers';
import { LayoutSplashScreen } from '../../../../admin/layout/core';

type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserModel | undefined;
  saveCurrentUser: (auth: UserModel | undefined) => void;
  logout: () => void;
};

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => { },
  currentUser: undefined,
  saveCurrentUser: () => { },
  logout: () => { },
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>(
    authHelper.getUser()
  );
  const saveAuth = useCallback((auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  }, []);
  const saveCurrentUser = useCallback((auth: UserModel | undefined) => {
    setCurrentUser(auth);
    if (auth) {
      authHelper.setUser(auth);
    } else {
      authHelper.removeUser();
    }
  }, []);

  const logout = useCallback(() => {
    saveAuth(undefined);
    saveCurrentUser(undefined);
  }, [saveAuth, saveCurrentUser]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        saveAuth,
        currentUser,
        saveCurrentUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, logout, saveCurrentUser, saveAuth } = useAuth();
  const didRequest = useRef(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  // Store function references in refs to avoid dependency issues
  const saveAuthRef = useRef(saveAuth);
  const saveCurrentUserRef = useRef(saveCurrentUser);
  const logoutRef = useRef(logout);

  // Update refs when functions change
  saveAuthRef.current = saveAuth;
  saveCurrentUserRef.current = saveCurrentUser;
  logoutRef.current = logout;

  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    if (didRequest.current) return;

    let token = authHelper.getAuth();

    const requestUser = async (apiToken: AuthModel) => {
      try {
        if (!didRequest.current) {
          saveAuthRef.current(token);
          let user = authHelper.getUser();
          saveCurrentUserRef.current(user);
        }
      } catch (error) {
        console.error(error);
        if (!didRequest.current) {
          logoutRef.current();
        }
      } finally {
        setShowSplashScreen(false);
        didRequest.current = true;
      }
    };

    if (token) {
      requestUser(token);
    } else {
      logoutRef.current();
      setShowSplashScreen(false);
      didRequest.current = true;
    }
  }, []); // Empty dependency array - run only once

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { AuthProvider, AuthInit, useAuth };
