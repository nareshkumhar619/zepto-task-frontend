import React, { useState } from 'react';
import './Chip.css';

const ChipComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [highlightedItem, setHighlightedItem] = useState(null);

  const allItems = ["John Doe", "Jane Smith", "Bob Johnson", "Nick Giannopoulos"];

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value === '') {
      setHighlightedItem(selectedItems[selectedItems.length - 1] || null);
    } else {
      setHighlightedItem(null);
    }
  };

  const handleItemClick = (item) => {
    const updatedItems = [...selectedItems, item];
    setSelectedItems(updatedItems);
    setInputValue('');
    setHighlightedItem(null);
  };

  const handleChipRemove = (removedItem) => {
    const updatedItems = selectedItems.filter(item => item !== removedItem);
    setSelectedItems(updatedItems);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Backspace' && inputValue === '' && selectedItems.length > 0) {
      event.preventDefault();
      setHighlightedItem(selectedItems[selectedItems.length - 1]);
    }
  };

  const handleChipClick = (item) => {
    setHighlightedItem(item);
  };

  return (
    <div className="chip-component">
      <div className="chips">
        {selectedItems.map((item) => (
          <div
            key={item}
            className={`chip ${highlightedItem === item ? 'highlighted' : ''}`}
            onClick={() => handleChipClick(item)}
          >
            {item}
            <button className="remove-button" onClick={() => handleChipRemove(item)}>
              X
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Type to search..."
        className="input-field"
      />
      <div className="item-list">
        {allItems
          .filter((item) => !selectedItems.includes(item))
          .filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
          .map((item) => (
            <div
              key={item}
              className="item"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChipComponent;