import { API_URL } from '@env';
import { Product } from '../../domain/entities/product.entity';
import { TesloProductsResponse } from '../interfaces/teslo-products.response';
export class ProductMapper {
    static tesloProductToEntity(tesloProductsResponse: TesloProductsResponse): Product {
        return {
            id: tesloProductsResponse.id,
            title: tesloProductsResponse.title,
            price: tesloProductsResponse.price,
            description: tesloProductsResponse.description,
            slug: tesloProductsResponse.slug,
            stock: tesloProductsResponse.stock,
            sizes: tesloProductsResponse.sizes,
            gender: tesloProductsResponse.gender,
            tags: tesloProductsResponse.tags,
            images: tesloProductsResponse.images.map(image => `${API_URL}/files/product/${image}`),
            user: tesloProductsResponse.user,
        }
    }
}