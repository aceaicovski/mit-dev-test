import { productsPath } from "shared/api-routes";
import { Product } from "shared/models/products.interface";
import api from "userApi";

type ProductsResponse = Product[];

interface QueryParams {
  [key: string]: string | number;
}

export const getProducts = async (
  queryParams?: QueryParams
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(productsPath, {
    params: queryParams,
  });

  return response.data;
};

