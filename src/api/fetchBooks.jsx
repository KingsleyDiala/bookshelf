import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { BOOKS_QUERY } from '../queries';
import { useAllContext } from '../component/context/context';
import { useFilterContext } from '../component/context/filter_context';

const FetchBooks = () => {
  const { setAllBooks, setIsLoading } = useAllContext();
  const { setAllBooksFilter } = useFilterContext();

  const { error, loading, data } = useQuery(BOOKS_QUERY);


  useEffect(() => {
    setIsLoading(loading);
    if (data) {
      setAllBooks(data.books)
      setAllBooksFilter(data.books);
  
    }
    if (error) console.log(error.networkError.result.errors[0].message)
  });

  return (
    <></>
  )
}

export default FetchBooks;