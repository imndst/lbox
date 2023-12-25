import React from "react";

const DropdownTik: React.FC<{ isListVisible: boolean }> = ({ }) => {
    return (
        <svg
            className="check-icon"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="#00A1E0"
        >
            <path d="M19.183 4.808a1 1 0 00-1.415 0l-8.592 8.591-3.535-3.536a1 1 0 10-1.415 1.415l4.242 4.243 9.999-9.999a1 1 0 000-1.414z" />
        </svg>
    );
};

export default DropdownTik;
