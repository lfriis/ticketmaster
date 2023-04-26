import { type AxiosResponse } from "axios";

interface IImage {
  fallback: boolean;
  height: number;
  ratio: string;
  url: string;
  width: number;
}

export interface IEvent {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  info: string;
  images: IImage[];
}

export interface IResponse extends AxiosResponse {
  data: {
    _embedded: {
      events: IEvent[];
    };
  };
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: IImage[];
}

export interface IPayload {
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
  resultSize?: string;
}
