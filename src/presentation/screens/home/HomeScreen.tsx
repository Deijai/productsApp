import React from 'react'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ProductList } from '../../components/products/ProductList';
import { Fab } from '../../components/ui/Fab';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';

export const HomeScreen = () => {
  const { logout } = useAuthStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>()
  /* const { isLoading, data: products = [] } = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: (1000 * 60 * 60), //1 hour
    queryFn: ({ }) => getProductsByPage(0),
  }); */


  const { isLoading, data: products, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: (1000 * 60 * 60), //1 hour
    initialPageParam: 0,
    queryFn: async (params) => {
      console.log({ params });
      const products = await getProductsByPage(params.pageParam);
      return products;

    },
    getNextPageParam: (lastPage, allPages) => allPages.length

  });


  return (
    <>
      <MainLayout title='TesloShop - Products' subTitle='Aplicação administrativa' rightAction={() => { }} rightActionIcon='plus-outline'>
        {
          isLoading ? (<FullScreenLoader />) :
            (<ProductList fetchNextPage={fetchNextPage} products={products?.pages.flat() ?? []} />)
        }
      </MainLayout>
      <Fab 
        onPress={() => navigation.navigate('ProductScreen', {productId: 'new'})}
        iconName={'plus'} style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 100
      }} />
    </>

  )
}
