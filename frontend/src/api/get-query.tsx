import {
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
  productDetail: {
    url: '/product/field',
  },
  category: {
    url: '/category',
  },
  user: {
    url: '/user',
  },
};

type QueryParams = Record<string, string | number>;

const useGetQuery = <T, U>(
  endpoint: keyof GetApi,
  id?: string | number, // Optional id parameter for productId, categoryId, userId, etc.
  queryParams?: QueryParams // Optional query parameters
): UseQueryResult<U, Error> => {
  const { url } = getApi[endpoint];

  let constructedUrl = id ? `${url}/${id}` : url;

  // Append query parameters if provided
  if (queryParams) {
    const params = new URLSearchParams();
    Object.keys(queryParams).forEach(key => {
      params.append(key, String(queryParams[key]));
    });
    constructedUrl += '?' + params.toString();
  }

  const queryFn = async (): Promise<U> => {
    const response = await axios.get<T>(constructedUrl);
    // Assuming T is IResponse<U>
    return (response.data as any).data as U;
  };

  const queryKey = id ? [endpoint, id, queryParams] : [endpoint, queryParams];

  return useQuery<U, Error>({
    queryKey,
    queryFn,
  });
};

export default useGetQuery;
