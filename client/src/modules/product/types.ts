import { ActionType } from 'typesafe-actions';
import { authAsync } from '../user';
import { actions } from './actions';

export interface Product {
  _id?: string;
  writer: string;
  title: string;
  desc: string;
  price: number;
  continent: number;
  images: Array<string>;
}
export interface LoadOpt {
  limit: number;
  skip: number;
  loadMore: boolean;
}
export type ProductActions =
  | ActionType<typeof actions>
  | ReturnType<typeof authAsync.request>;
export type ProductState = {
  addProduct: { loading: boolean; data: null | Product; error: null | Error };
  Products: { loading: boolean; data: null | Product[]; error: null | Error };
  errorMsg: string | null;
};
