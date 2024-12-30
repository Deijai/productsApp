import React from 'react'
import { ScrollView } from 'react-native'
import { MainLayout } from '../../layouts/MainLayout'
import { getProductById, updateCreateProduct } from '../../../actions/products/index';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useRef } from 'react';
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import { Gender, Product, Size } from '../../../domain/entities/product.entity';
import { MyIcon } from '../../components/ui/MyIcon';
import { Formik } from 'formik';
import { ProductImage } from '../../components/products/ProductImage';
import { genders, sizes } from '../../../config/constants/product.constants';
import { CameraAdapter } from '../../../config/adapters/camera.adapter';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ route }: Props) => {
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  const queryClient = useQueryClient();

  const { isLoading, data: product, error } = useQuery({
    queryKey: ['product', productIdRef.current],
    staleTime: (1000 * 60 * 60), //1 hour
    queryFn: () => getProductById(productIdRef.current),
  });

  const mutation = useMutation({
    mutationFn: (data: Product) => updateCreateProduct({ ...data, id: productIdRef.current }),
    onSuccess(data: Product, variables, context) {
      productIdRef.current = data.id // para a criação é importante
      queryClient.invalidateQueries({
        queryKey: ['products', 'infinite']
      });
      queryClient.invalidateQueries({
        queryKey: ['product', data.id]
      });

    },
  })


  if (!product) {
    return (<MainLayout title='Carregando...' subTitle='produto' />)
  }


  return (
    <Formik
      initialValues={product}
      onSubmit={values => mutation.mutate(values)}
    >
      {
        ({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <MainLayout
            title={values.title}
            subTitle={`Preço: ${values.price}`}
            rightAction={async (value) => { 
              let photos: string[] = [];
              if(value === 1) {
                 photos = await CameraAdapter.takePicture();
              } else {
                 photos = await CameraAdapter.getPicturesFromLibrary(); 
              }
              
              //const photos = await CameraAdapter.getPicturesFromLibrary();
              setFieldValue('images', [...values.images, ...photos])
            }}
            rightActionIcon='camera-outline'
          >
            <ScrollView style={{ flex: 1 }}>
              {/*Imagens*/}
              <Layout style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                <ProductImage images={values.images} />
              </Layout>

              {/*Formulario*/}
              <Layout style={{ marginHorizontal: 10 }}>
                <Input
                  label={'Title'}
                  value={values.title}
                  onChangeText={handleChange('title')}
                  style={{ marginVertical: 5 }}
                />

                <Input
                  label={'Slug'}
                  value={values.slug}
                  onChangeText={handleChange('slug')}
                  style={{ marginVertical: 5 }}
                />

                <Input
                  label={'Description'}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  multiline
                  numberOfLines={10}
                  style={{ marginVertical: 5 }}
                />
              </Layout>

              {/*Price and Stock*/}
              <Layout style={{ marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', gap: 10 }}>

                <Input
                  label={'Price'}
                  value={values.price.toString()}
                  onChangeText={handleChange('price')}
                  keyboardType='numeric'
                  style={{ flex: 1 }}
                />

                <Input
                  label={'Stock'}
                  value={values.stock.toString()}
                  onChangeText={handleChange('stock')}
                  keyboardType='numeric'
                  style={{ flex: 1 }}
                />

              </Layout>

              {/*Seletores*/}
              <ButtonGroup size='small' appearance='outline' style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}>
                {sizes.map(size => <Button
                  onPress={() => setFieldValue('sizes', values.sizes.includes(size) ? values.sizes.filter(s => s !== size) : [...values.sizes, size])}
                  style={{ flex: 1, backgroundColor: values.sizes.includes(size) ? theme['color-primary-300'] : undefined }} key={size}>{size}</Button>)}
              </ButtonGroup>

              <ButtonGroup size='small' appearance='outline' style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}>
                {genders.map(gender => <Button onPress={() => setFieldValue('gender', gender)} style={{ flex: 1, backgroundColor: values.gender.startsWith(gender) ? theme['color-primary-300'] : undefined }} key={gender}>{gender}</Button>)}
              </ButtonGroup>

              {/*Btn salvar*/}
              <Button disabled={mutation.isPending} accessoryLeft={<MyIcon name='save-outline' white />} style={{ margin: 15 }} onPress={() => handleSubmit()}>Save</Button>
              <Layout style={{ height: 150 }} />
            </ScrollView>
          </MainLayout>
        )
      }

    </Formik>

  )
}
