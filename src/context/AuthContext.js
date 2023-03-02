import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    case "SESSION_INDEX":
      return { ...state, currentSessionID: action.payload };
    default:
      return state;
  }
};

// only on refresh
const readProfile = async (token, dispatch) => {
  try {
    const res = await axios({
      method: "get",
      url: "http://localhost:3000/users/me",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });

    // dispatch auth_is_ready

    dispatch({ type: "AUTH_IS_READY", payload: res.data });
  } catch (err) {
    dispatch({ type: "AUTH_IS_READY", payload: null });
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
    currentSession: null,
  });

  useEffect(() => {
    readProfile(localStorage.getItem("token"), dispatch);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
