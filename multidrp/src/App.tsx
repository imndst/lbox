import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import "./appstyle.scss";
import DropdownArrow from "./components/ImndstDropDownIcon";
import ObjectList from "./components/ImndstDropDown/ImndstSelectOption";

const DropDownComponent: React.FC = () => {
  const [isListVisible, setListVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    { id: number; name: string; icon: string }[]
  >([]);
  const [filter, setFilter] = useState("");
  const [catData, setcatData] = useState([
    { id: 1, name: "Education", icon: "🎓" },
    { id: 2, name: "Science", icon: "🔬" },
    { id: 3, name: "Art", icon: "🎨" },
    { id: 4, name: "Sport", icon: "⚽" },
    { id: 5, name: "Games", icon: "🎮" },
    { id: 6, name: "Health", icon: "🏥" },
    { id: 7, name: "Cinema", icon: "🎥" },
  ]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const listRef = useRef<HTMLDivElement>(null);

  const handleInputClick = (
    event: React.MouseEvent<HTMLDivElement>,
    type: string
  ) => {
    event.stopPropagation();
    type == "icon" ? setListVisible((pre: boolean) => !pre) : setListVisible(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setListVisible(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const lastSpaceIndex = inputValue.lastIndexOf(" ");
    const newFilter =
      lastSpaceIndex !== -1
        ? inputValue.slice(lastSpaceIndex + 1).trim()
        : inputValue.trim();

    setFilter(newFilter);
    setActiveIndex(-1);

    if (newFilter.trim() === "") {
      setFilter(newFilter);
    }
  };

  const handleItemClick = (item: {
    id: number;
    name: string;
    icon: string;
  }) => {
    setSelectedItems((prevItems) => {
      const itemExists = prevItems.some(
        (selectedItem) => selectedItem.id === item.id
      );
      if (itemExists) {
        return prevItems.filter((selectedItem) => selectedItem.id !== item.id);
      } else {
        return [...prevItems, item];
      }
    });

    setFilter("");
  };

  const handleRemoveSelectedItem = (
    event: React.MouseEvent,
    item: { id: number; name: string; icon: string }
  ) => {
    event.stopPropagation();
    setSelectedItems((prevItems) =>
      prevItems.filter((selectedItem) => selectedItem.id !== item.id)
    );
    console.log(selectedItems.length);
    selectedItems.length > 1 ? setListVisible(true) : setListVisible(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && filter.trim() !== "") {
      const newItem = {
        id: catData.length + 1,
        name: filter.trim(),
        icon: "❓",
      };

      const itemExists = catData.some(
        (existingItem) => existingItem.name === newItem.name
      );

      if (!itemExists) {
        setcatData((prevItems) => [newItem, ...prevItems]);
        setSelectedItems((prevItems) => [newItem, ...prevItems]);
        setFilter("");
      } else {
        console.log("Item already exists");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isListVisible]);

  const filteredList = catData.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      {selectedItems.length > 0 && (
        <div className="selected-items-container">
          {selectedItems.map((selectedItem) => (
            <div key={selectedItem.id} className="selected-item">
              <span>
                {selectedItem.icon} {selectedItem.name}
              </span>
              <button
                onClick={(event) =>
                  handleRemoveSelectedItem(event, selectedItem)
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="dropdown-container">
        <div className="input-container">
          <div
            className={`icon ${isListVisible ? "visible" : ""}`}
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
              handleInputClick(event, "icon")
            }
          >
            <DropdownArrow isListVisible={isListVisible} />
          </div>
          <input
            type="text"
            placeholder="Enter text..."
            value={filter}
            onChange={handleInputChange}
            onClick={(event) => handleInputClick(event, "input")}
            onKeyDown={handleKeyDown}
            aria-haspopup="listbox"
            aria-expanded={isListVisible}
          />
        </div>

        <ObjectList
          isListVisible={isListVisible}
          listRef={listRef}
          filteredList={filteredList}
          selectedItems={selectedItems}
          activeIndex={activeIndex}
          handleItemClick={handleItemClick}
        />
      </div>
    </div>
  );
};

export default DropDownComponent;
