import { isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product.entity";
import { TesloProductsResponse } from "../../infrastructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export const updateCreateProduct = async (product: Partial<Product>): Promise<Product> => {
    console.log('updateCreateProduct: ', product);
    
    product.stock = isNaN( Number(product.stock)) ? 0 :  Number(product.stock);
    product.price = isNaN( Number(product.price)) ? 0 :  Number(product.price);

    if(product.id && product.id !== 'new') {
        return updateProduct(product);
    }
    return createProduct(product);
    
}

const updateProduct = async (product: Partial<Product>): Promise<Product> => {
    try {
        const { id, images = [], user , ...rest } = product;
        const checkImages = await prepareImages(images);

        const { data } = await tesloApi.patch<TesloProductsResponse>(`/products/${id}`, { images: checkImages, ...rest });
        return ProductMapper.tesloProductToEntity(data);
    } catch (error) {

        if(isAxiosError(error)) {
            console.log(error.response?.data);
        }        
        throw new Error(`Update error product`);
    }
}


const createProduct = async (product: Partial<Product>): Promise<Product> => {
    try {
        const { id, images = [], ...rest } = product;
        const checkImages = await prepareImages(images);

        const { data } = await tesloApi.post<TesloProductsResponse>(`/products`, { images: checkImages, ...rest });
        return ProductMapper.tesloProductToEntity(data);
    } catch (error) {

        if(isAxiosError(error)) {
            console.log(error.response?.data);
            
        }        
        throw new Error(`Create error product`);
    }
}

const prepareImages = async (images: string[]) => {
    // TODO:  revisar os files
    const fileImages = images.filter(image => image.includes('file://'));
    const currentImages =images.filter(image => !image.includes('file://'));

    if(fileImages.length > 0) {
        const uploadPromises = fileImages.map(image => uploadImage(image));
        const uploadesImages = await Promise.all(uploadPromises);
        currentImages.push(...uploadesImages);
    }
    return currentImages.map(image => image.split('/').pop())
}

const uploadImage = async (image: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', {
        uri: image,
        type: 'image/jpeg',
        name: image.split('/').pop()
    });

    const { data } = await tesloApi.post<{image: string}>(`/files/product`,formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    return data.image
}