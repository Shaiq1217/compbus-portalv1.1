import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from './axios';
import { GetData, IResponse } from '../types/shared'; // Assuming you have defined these types
import { ILogin, IUser } from '../types/user';

interface GetApi {
  login: GetData<ILogin, IUser>;
}

const getApi: GetApi = {
  login: {
    url: '/auth/login',
  }
};

const usePostMutation = <T, U>(
  endpoint: keyof GetApi
): UseMutationResult<IResponse<T>, Error, U> => {
  const { url } = getApi[endpoint];

  const mutationFn = async (data: U) => {
    const response = await axios.post<IResponse<T>>(url, data);
    return response.data as IResponse<T>;
  };
  return useMutation<IResponse<T>, Error, U>({ mutationFn });
};

export default usePostMutation;
