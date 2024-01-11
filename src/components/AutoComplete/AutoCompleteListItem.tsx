import React from "react";

type AutoCompleteListItemProps = {
  text: string;
  searchText: string;
  onItemClick?: () => void;
  itemStyle?: React.CSSProperties;
};

//This function takes the text and highlights the part that matches the search text
//It splits the text based on the RegExp and then maps the parts to a span
const getHighlightedText = (text: string, highlight: string) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="highlight">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

const AutoCompleteListItem: React.FC<AutoCompleteListItemProps> = ({
  text,
  searchText,
  onItemClick,
  itemStyle,
}) => {
  return (
    <li className="list-item" onClick={onItemClick} style={{ ...itemStyle }}>
      {getHighlightedText(text, searchText)}
    </li>
  );
};

export default AutoCompleteListItem;
