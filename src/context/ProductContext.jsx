import { createContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState();

  const value = { categories, setCategories };
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export default ProductContext;
