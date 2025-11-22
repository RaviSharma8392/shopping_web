import { createContext, useContext, useState } from "react";

const SelectedItemsContext = createContext();

export const SelectedItemsProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Toggle single item
  const toggleItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Select all items
  const selectAll = (items) => {
    setSelectedItems(items.map((i) => i.id));
  };

  // Clear selection
  const clearSelection = () => setSelectedItems([]);

  return (
    <SelectedItemsContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        toggleItem,
        selectAll,
        clearSelection,
      }}>
      {children}
    </SelectedItemsContext.Provider>
  );
};

// Hook for easy usage
export const useSelectedItems = () => useContext(SelectedItemsContext);
