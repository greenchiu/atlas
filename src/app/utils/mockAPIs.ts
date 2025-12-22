export interface Product {
  id: number;
  name: string;
  price: number;
}

/**
 * Mocks an API call to fetch a list of products.
 * @param {boolean} returnEmpty - If true, returns an empty list after a delay.
 */
export const mockFetchProducts = (returnEmpty = false): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (returnEmpty) {
        resolve([]);
      } else {
        const mockData: Product[] = [
          { id: 1, name: 'Laptop', price: 999.99 },
          { id: 2, name: 'Smartphone', price: 699.99 },
          { id: 3, name: 'Headphones', price: 149.99 },
        ];
        resolve(mockData);
      }
    }, 1500); // Simulate 1.5 second network delay
  });
};
