import React from 'react'
import { Product } from '../../../domain/entities/product.entity';
import { Card, Text } from '@ui-kitten/components';
import { Image } from 'react-native';
import { FadeInImage } from '../ui/FadeInImage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <Card style={{ flex: 1, backgroundColor: '#F9F9F9', margin: 3 }} onPress={() => navigation.navigate('ProductScreen', { productId: product.id })}>

            {
                product.images.length === 0 ?
                    <Image source={require('../../../assets/no-product-image.png')} style={{ flex: 1, width: '100%', height: 200 }} />
                    : <FadeInImage uri={product.images[0]} style={{ flex: 1, height: 200, width: '100%' }} />
            }

            <Text style={{ textAlign: 'center', }} numberOfLines={2}>{product.title}</Text>

        </Card>
    )
}
