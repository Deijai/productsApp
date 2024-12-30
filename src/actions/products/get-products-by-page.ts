import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product.entity";
import { TesloProductsResponse } from "../../infrastructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export const getProductsByPage = async (page: number, limit: number = 20): Promise<Product[]> => {

    console.log({ page, limit });
    try {
        const { data } = await tesloApi.get<TesloProductsResponse[]>(`/products?offset=${page}&limit=${limit}`);
        return data.map(produt => ProductMapper.tesloProductToEntity(produt));
    } catch (error) {
        console.log({ error });
        throw new Error("Eror getting products");
    }

}