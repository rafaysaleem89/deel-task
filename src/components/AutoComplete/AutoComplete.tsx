import React, { useState, useEffect } from "react";
import { useSuggestions } from "../../hooks/suggestions-hook";
import "./AutoComplete.css";
import AutoCompleteList from "./AutoCompleteList";

//These props are not used in this snippet but I added them to make the conpmenents more reusable
//They can be used to style all the elements of the AutoComplete component
interface AutoCompleteProps {
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  listStyle?: React.CSSProperties;
  listItemStyle?: React.CSSProperties;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  containerStyle,
  inputStyle,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  
  //This hook returns the suggestions based on the input value
  const { suggestions } = useSuggestions(inputValue); 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleItemClick = () => {
    //This is just to simulate the navigation to the selected item
    //TODO: Navigation logic can be implemented here
    window.location.reload(); 
  };

  return (
    <div style={{ width: "300px", ...containerStyle }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
        className="text-input"
        style={{ ...inputStyle }}
      />
      {Boolean(inputValue) && (
        <AutoCompleteList
          items={suggestions}
          searchText={inputValue}
          onItemClick={handleItemClick}
        />
      )}
    </div>
  );
};

export default AutoComplete;
