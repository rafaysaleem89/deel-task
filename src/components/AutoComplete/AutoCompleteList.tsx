import React from "react";
import AutoCompleteListItem from "./AutoCompleteListItem";
import { Character } from "../../services/types";

interface AutoCompleteListProps {
  items: Character[];
  searchText: string;
  onItemClick?: () => void;
  listStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
}

const AutoCompleteList: React.FC<AutoCompleteListProps> = ({
  items,
  searchText,
  onItemClick,
  listStyle
}) => {
  if (items.length === 0)
    return (
      <div className="list-item" onClick={onItemClick}>
        {`Search for: ${searchText}`}{" "}
      </div>
    );

  return (
    <ul className="list" style={{...listStyle}}>
      {items.map((item) => (
        <AutoCompleteListItem
          key={item.id}
          text={item.name}
          searchText={searchText}
          onItemClick={onItemClick}
        />
      ))}
    </ul>
  );
};

export default AutoCompleteList;
