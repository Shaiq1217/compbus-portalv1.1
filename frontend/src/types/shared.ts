export interface IResponse<T>{
    message?: string;
    status? : boolean;
    data?: T;
}

export type GetData<T, U> = {
    url: string;
    params?: Record<string, any>;
  };

export type Api = {
    [endpoint: string]: GetData<any, any>;
  };
