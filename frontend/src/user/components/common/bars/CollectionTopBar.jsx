import React from "react";

import { COLORS } from "../../../../style/theme";
import FilterDropdown from "../dropdown/FilterDropdown";
import SortDropdown from "../dropdown/SortDropdown";

const CollectionTopBar = ({ onFilterChange, onSortChange }) => {
  return (
    <div
      className="w-full flex items-center justify-between px-4 md:px-10 py-4 border-b"
      style={{ borderColor: COLORS.secondary }}>
      <FilterDropdown onApply={onFilterChange} />
      <SortDropdown onSelect={onSortChange} />
    </div>
  );
};

export default CollectionTopBar;
