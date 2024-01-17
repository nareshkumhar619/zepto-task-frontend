// Chip.tsx
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './Chip.css';

interface ChipProps {
  allItems: string[];
}

const Chip: React.FC<ChipProps> = ({ allItems }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      if (inputValue === '' && selectedItems.length > 0) {
        setHighlightedItem(selectedItems[selectedItems.length - 1]);
      } else if (inputValue === '' && highlightedItem !== null) {
        handleChipRemove(highlightedItem);
      }
    }
  };

  const handleChipClick = (item: string) => {
    setHighlightedItem(item);
  };

  const handleItemClick = (item: string) => {
    const updatedItems = [...selectedItems, item];
    setSelectedItems(updatedItems);
    setInputValue('');
    setHighlightedItem(null);
  };

  const handleChipRemove = (removedItem: string) => {
    const updatedItems = selectedItems.filter((item) => item !== removedItem);
    setSelectedItems(updatedItems);
  };

  useEffect(() => {
    if (highlightedItem !== null && inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [highlightedItem]);

  return (
    <div className="chip-container">
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
        ref={inputRef}
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

export default Chip;
