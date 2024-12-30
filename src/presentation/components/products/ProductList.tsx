import { Layout, List, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Product } from '../../../domain/entities/product.entity'
import { ProductCard } from './ProductCard';
import { RefreshControl } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
    products: Product[];
    fetchNextPage: () => void;
}

export const ProductList = ({ products, fetchNextPage }: Props) => {
    const [isRefrasing, setIsRefrasing] = useState(false);
    const queryClient = useQueryClient();

    const onPullToRefresh = async () => {
        setIsRefrasing(true);
        // sleep 2
        await new Promise(resolve => setTimeout(resolve, 200));
        queryClient.invalidateQueries({
            queryKey: ['products', 'infinite']
        });

        setIsRefrasing(false);
    }
    
    return (
        <List
            data={products}
            numColumns={2}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => <ProductCard product={item} />}
            ListFooterComponent={() => <Layout style={{ height: 150 }} />}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.8}
            refreshControl={<RefreshControl refreshing={isRefrasing} onRefresh={onPullToRefresh} />}
        />
    )
}
