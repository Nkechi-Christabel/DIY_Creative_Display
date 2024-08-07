'use client';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  clearState,
  getAllPosts,
} from '@/redux/features/projectSlice/postSlice';
import { getAllUsers } from '@/redux/features/authSlice/signupSlice';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import { Category } from './components/Category';
import { Post } from './components/Post';
import { RiLoader2Line } from 'react-icons/ri';

const Home = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state: RootState) => state.users);
  const [selectedCategory, setSelectedCategory] = useState('DIYs');
  const { posts, isError, errorMessage, isFetching, isShowSearch } =
    useAppSelector((state: RootState) => state.fetchPosts);

  useEffect(() => {
    dispatch(clearState());
    dispatch(getAllPosts());
    dispatch(getAllUsers());
  }, []);

  return (
    <main
      className='container mx-auto max-w-[85rem] py-9 px-5 xl:px-0 h-screen scroll-smooth'
      id='top'
    >
      <p
        className={clsx(
          'text-4xl text-center max-w-3xl mx-auto pb-5 tracking-wide leading-normal',
          isShowSearch ? 'pt-14' : 'pt-2'
        )}
      >
        Discover, Create, and Share Your DIY Projects with the World!
        <span className='text-sm text-gray-600 block'>
          Get started today and unleash your creativity with DIY Creative
          Display!
        </span>
      </p>
      <div className=''>
        <div>
          <Category
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          {isFetching ? (
            <div className='flex items-center justify-center h-96'>
              <RiLoader2Line className='text-5xl text-yellow-500 animate-spin' />
            </div>
          ) : isError ? (
            <div className='flex justify-center items-center text-xl text-pretty font-light font text-amber-700 h-96'>
              {errorMessage}
            </div>
          ) : (
            <Post
              selectedCategory={selectedCategory}
              posts={posts}
              users={users}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
