import { ResponseType } from '../api/TypesAPI';
import { Dispatch } from 'redux';
import { AppStatusType, setAppErrorAC, setAppStatusAC, SetErrorACType, SetStatusACType } from '../app/app-reducer';

export const handleAppError = <Data>(data: ResponseType<Data>,
  dispatch: Dispatch<SetStatusACType | SetErrorACType>) => {   ///res data
  data.messages.length
    ? dispatch(setAppErrorAC(data.messages[0]))
    : dispatch(setAppErrorAC('SOME ERROR'));
  dispatch(setAppStatusAC(AppStatusType.failed));
}

export const handleNetworkError = (err: any,
  dispatch: Dispatch<SetStatusACType | SetErrorACType>) => {
  dispatch(setAppStatusAC(AppStatusType.failed));
  dispatch(setAppErrorAC(err.message ? err.message : 'SOME ERROR'));
};