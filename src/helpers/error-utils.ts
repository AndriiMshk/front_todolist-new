import { AppStatusType, ResponseType } from '../api/TypesAPI';
import { Dispatch } from 'redux';
import { setAppErrorAC, setAppStatusAC, SetErrorACType, SetStatusACType } from '../app/app-reducer';

export const handleAppError = <Data>(data: ResponseType<Data>,
  dispatch: Dispatch<SetStatusACType | SetErrorACType>) => {
  data.messages.length
    ? dispatch(setAppErrorAC(data.messages[0]))
    : dispatch(setAppErrorAC('SOME ERROR'));
  dispatch(setAppStatusAC(AppStatusType.failed));
}

export const handleNetworkError = (message: string,
  dispatch: Dispatch<SetStatusACType | SetErrorACType>) => {
  dispatch(setAppStatusAC(AppStatusType.failed));
  dispatch(setAppErrorAC(message ? message : 'SOME ERROR'));
};