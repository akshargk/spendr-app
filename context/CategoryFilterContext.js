import { createContext, useContext, useState } from 'react';

// 1. Create the context
const CategoryFilterContext = createContext();

// 2. Create the Provider component
export function CategoryFilterProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <CategoryFilterContext.Provider
      value={{ selectedCategory, setSelectedCategory }}
    >
      {children}
    </CategoryFilterContext.Provider>
  );
}

// 3. Create a custom hook for easy consumption
export function useCategoryFilter() {
  const context = useContext(CategoryFilterContext);
  if (!context) {
    throw new Error(
      'useCategoryFilter must be used within a CategoryFilterProvider'
    );
  }
  return context;
}