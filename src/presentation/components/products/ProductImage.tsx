import React from 'react'
import { FlatList, Image } from 'react-native'
import { FadeInImage } from '../ui/FadeInImage'

interface Props {
    images: string[]
}

export const ProductImage = ({ images }: Props) => {
    if (images.length === 0) {
        return <Image style={{ width: 300, height: 300, marginHorizontal: 7 }} source={require('../../../assets/no-product-image.png')} />
    }

    return <FlatList
        data={images}
        keyExtractor={(item, index) => `${item} - ${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <FadeInImage uri={item} style={{ width: 300, height: 300, marginHorizontal: 7 }} />}
    />


}
