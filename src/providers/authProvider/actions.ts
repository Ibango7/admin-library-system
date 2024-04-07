import { IstateContext } from './context';
import { LoginPayload } from './context';
import {createAction} from 'redux-actions';

export const AuthActionEnums = {
    USER_LOGIN: "LOGIN",
    USER_LOGOUT: "LOGOUT"
}

export const loginUserAction = createAction<IstateContext,LoginPayload>(AuthActionEnums.USER_LOGIN, (userInfo)=>({userInfo}));
export const logOutUserAction = createAction(AuthActionEnums.USER_LOGOUT, ()=>({}));


