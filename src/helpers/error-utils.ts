import { AppStatusType, ResponseType } from '../api/typesAPI';
import { Dispatch } from 'redux';
import { SetErrorACType, SetStatusACType } from '../app/bll/app-reducer';
import { appActions } from '../app';

const { setAppStatusAC, setAppErrorAC } = appActions;

export const handleAppError = <Data>(
  data: ResponseType<Data>, dispatch: Dispatch<SetStatusACType | SetErrorACType>) => {
  data.messages.length ? dispatch(setAppErrorAC(data.messages[0])) : dispatch(setAppErrorAC('SOME ERROR'));
  dispatch(setAppStatusAC(AppStatusType.failed));
};

export const handleNetworkError = (message: string, dispatch: Dispatch<SetStatusACType | SetErrorACType>) => {
  dispatch(setAppStatusAC(AppStatusType.failed));
  dispatch(setAppErrorAC(message ? message : 'SOME ERROR'));
};