'use client'
import { useAddToWishlistMutation, useGetWishlistQuery } from '@/app/lib/api/rootApis';
import { useAuth } from '@/context/AuthContext';
import { setWishlist } from '@/lib/features/wish-list/wishlistSlice';
import { message } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function WishlistSync() {
  const dispatch = useDispatch();
  const { token } = useAuth()
  const isAuthenticated = !!token;
  const localWishlist = useSelector((state: any) => state.wishlist.items);
  const { data: serverWishlist, isLoading, isFetching } = useGetWishlistQuery(undefined, { skip: !isAuthenticated });
  const [addToWishlist] = useAddToWishlistMutation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isAuthenticated && serverWishlist && !isLoading && !isFetching) {
        dispatch(setWishlist(serverWishlist));
        const serverIds = serverWishlist.map(item => item.id);
        const newItems = localWishlist.filter((item: any) => !serverIds.includes(item.id));


        newItems.forEach((item: any) => addToWishlist({ productId: item.id }));
        if (newItems?.length)
          message.success(`Synced ${newItems?.length} Wish list items.`)
      }
    }, 3000);

    return () => {
      clearTimeout(timeout)
    }
  }, [isAuthenticated, serverWishlist, localWishlist, addToWishlist, dispatch, isLoading, isFetching]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('wishlist', JSON.stringify(localWishlist));
    }
  }, [isAuthenticated, localWishlist]);

  return null;
}