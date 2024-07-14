import {
  QueryKey,
  useQuery,
  UseQueryResult
} from '@tanstack/react-query';
import axios from './axios';
import { GetData } from '../@types/shared/shared'; // Assuming you have defined these types

interface EndpointConfig<T> {
  url: string;
}

interface GetApi {
  [key: string]: EndpointConfig<any>;
}

const getApi: GetApi = {
  product: {
    url: '/product',
  },
  category: {
    url: '/category',
  },
  user: {
    url: '/user',
  },
};

const useGetQuery = <T, U>(
  endpoint: keyof GetApi,
  id?: string | number // Optional id parameter for productId, categoryId, userId, etc.
): UseQueryResult<U, Error> => {
  const { url } = getApi[endpoint];

  const constructedUrl = id ? `${url}/${id}` : url;

  const queryFn = async (): Promise<U> => {
    const response = await axios.get<T>(constructedUrl);
    // Assuming T is IResponse<U>
    return (response.data as any).data as U;
  };

  const queryKey = id ? [endpoint, id] : [endpoint];

  return useQuery<U, Error>({
    queryKey,
    queryFn,
  });
};

export default useGetQuery;
