'use client';
import React, { useReducer, FC, PropsWithChildren, useContext } from 'react';
import { IUser, UserActionContext, UserStateContext, USER_CONTEXT_INITIAL_STATE } from './context';
import { userReducer } from './reducer';
import { getUsersAction} from './actions';
import { httpClient } from '../httpClients/httpClients';



const UserProvider: FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, USER_CONTEXT_INITIAL_STATE);
    const getUsers =  ():Promise<any> => new Promise((resolve, reject) => {
        httpClient.get(`/User/GetAll?IsActive=true`)
            .then(response => {
                resolve(response.data.result.items);
                // console.log("Reponse in provider:::",response.data.result.items);
                // dispatch(getUserAction(response.data.result));
            }).catch(error => {
                reject(error)
                console.log("error fetching user info", error)
            })
    })
    
    return (
        <UserStateContext.Provider value={{ ...state }}>
            <UserActionContext.Provider 
                value={{ getUsers }}> 
                  {children}
                </UserActionContext.Provider>
        </UserStateContext.Provider>
    )
}



const useActionsContext = () => {
    const context = useContext(UserActionContext);
  
    if (context == undefined) {
    //   throw new Error("User context must be used within the user provider");
      console.log("user context must be used within the user provider");
    }

    return context;
  };

  export default UserProvider;