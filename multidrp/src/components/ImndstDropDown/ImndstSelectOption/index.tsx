import React from "react";
import DropdownTik from "../../ImndstTikIcon";

type SelectedItemsObjectType = {
    id: number;
    name: string;
    icon: string;
};
type filteredListObjectType = {
    id: number;
    name: string;
    icon: string;
};

type clickObjectType = {
    id: number;
    name: string;
    icon: string;
};

interface ObjectListProps {
    isListVisible: boolean;
    listRef: React.RefObject<HTMLDivElement>;
    filteredList: filteredListObjectType[];
    selectedItems: SelectedItemsObjectType[];
    activeIndex: number;
    handleItemClick: (obj: clickObjectType) => void;
}

const ObjectList: React.FC<ObjectListProps> = ({
    isListVisible,
    listRef,
    filteredList,
    selectedItems,
    activeIndex,
    handleItemClick,
}) => {
    return (
        <>
            {isListVisible && (
                <div role="listbox" ref={listRef} className="object-list visible">
                    {filteredList.map((obj, index) => (
                        <div
                            role="option"
                            key={obj.id}
                            className={`object-item ${selectedItems.some((item) => item.id === obj.id)
                                ? "checked"
                                : ""
                                } ${index === activeIndex ? "active" : ""}`}
                            aria-selected={selectedItems.some((item) => item.id === obj.id)}
                            onClick={() => handleItemClick(obj)}
                        >
                            <div className="check-icon">
                                {obj.name} {obj.icon}{" "}
                                {selectedItems.some((item) => item.id === obj.id) && (
                                    <DropdownTik isListVisible={true} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ObjectList;
