'use client';

import React, { useState, useEffect } from 'react';
import { mockFetchProducts, Product } from '../utils/mockAPIs';

// Define the possible states for the data fetching process
// type FetchState = 'loading' | 'success' | 'empty' | 'error';

const FetchStates = {
  Loading: 'Loading',
  Success: 'Success',
  Empty: 'Empty',
  Error: 'Error',
} as const;

// 也可以用于类型
type FetchState = (typeof FetchStates)[keyof typeof FetchStates];

const ProductListFetcher: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>(FetchStates.Loading);
  // You can toggle this boolean to test the 'empty' state
  const mockEmptyCase = false;

  useEffect(() => {
    const fetchData = async () => {
      setFetchState(FetchStates.Loading);
      try {
        const data = await mockFetchProducts(mockEmptyCase);
        setProducts(data);
        if (data.length === 0) {
          setFetchState(FetchStates.Empty);
        } else {
          setFetchState(FetchStates.Success);
        }
      } catch (err) {
        console.error(err);
        setFetchState(FetchStates.Error);
      }
    };

    fetchData();
  }, [mockEmptyCase]);

  // --- UI Rendering Logic ---

  if (fetchState === FetchStates.Loading) {
    return (
      <div className="p-4 text-center">
        <p>Loading products... ⏳</p>
        {/* A simple spinner animation could go here */}
      </div>
    );
  }

  if (fetchState === FetchStates.Error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>An error occurred while fetching data. 😢</p>
      </div>
    );
  }

  if (fetchState === FetchStates.Empty) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No products found. The list is empty. 🛒</p>
      </div>
    );
  }

  if (fetchState === FetchStates.Success) {
    return (
      <div className="p-4">
        <h2 className="mb-4 text-xl font-semibold">Available Products:</h2>
        <ul className="list-disc pl-5">
          {products.map((product) => (
            <li key={product.id} className="mb-2">
              {product.name} - ${product.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Fallback for an unexpected state
  return null;
};

export default ProductListFetcher;
