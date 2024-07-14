import { IconProps } from "@mui/material";
import { ComponentType, ReactNode } from "react";

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


export type ISectionCard = {
    Icon: ComponentType<IconProps>;
    title?: string;
    subtitle?: string;
    description?: string;
  };