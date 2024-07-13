import {
  QueryKey,
  useQuery,
  UseQueryResult
} from '@tanstack/react-query';
import axios from './axios';
import { GetData } from '../types/shared'; // Assuming you have defined these types
import { IProduct } from '../types/product';

interface GetApi {
  product: GetData<unknown, IProduct[]>;
}

const getApi: GetApi = {
  product: {
    url: '/product',
  }
};

const useGetQuery = <T, U>(
  endpoint: keyof GetApi
): UseQueryResult<U, Error> => {
  const { url } = getApi[endpoint];

  const queryFn = async (): Promise<U> => {
    const response = await axios.get<T>(url);
    // Assuming T is IResponse<U>
    return (response.data as any).data as U;
  };

  const queryKey = [endpoint] as QueryKey;

  return useQuery<U, Error>({
    queryKey,
    queryFn,
  });
};

export default useGetQuery;
