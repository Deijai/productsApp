import { tesloApi } from "../../config/api/tesloApi";
import { Gender, Product } from "../../domain/entities/product.entity";
import { TesloProductsResponse } from "../../infrastructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

const emptyProduct: Product = {
    id: "",
    title: "Novo produto",
    price: 0,
    description: "",
    slug: "",
    stock: 0,
    sizes: [],
    gender: Gender.Kid,
    tags: [],
    images: [],
}

export const getProductById = async (productId: string): Promise<Product> => {

    if(productId === 'new') return emptyProduct;

    try {
        const { data } = await tesloApi.get<TesloProductsResponse>(`/products/${productId}`);
        console.log({data});
        return ProductMapper.tesloProductToEntity(data);
    } catch (error) {
        console.log({error});
        throw new Error(`Error getting product by id ${productId}`);
        
    }
}