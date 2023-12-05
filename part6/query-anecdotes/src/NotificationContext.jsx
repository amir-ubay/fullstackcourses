/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { useContext } from "react";

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET":
      return action.data;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

export const NotificationContext = createContext();

export const NotificationProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const NotificationDispatcher = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};
