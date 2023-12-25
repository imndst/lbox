import React from 'react';

const DropdownArrow: React.FC<{ isListVisible: boolean }> = ({ isListVisible }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
        >
            {isListVisible ? (
                <path d="M8 4.634l-5.634 5.632a.5.5 0 0 1-.707-.001l-.708-.707a.5.5 0 0 1 0-.708l7-7a.5.5 0 0 1 .707 0l7 7a.5.5 0 0 1 0 .708l-.707.707a.5.5 0 0 1-.707.001L8 4.634z" />
            ) : (
                <path d="M8 11.366l5.634-5.632a.5.5 0 0 1 .707.001l.708.707a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.707 0l-7-7a.5.5 0 0 1 0-.708l.707-.707a.5.5 0 0 1 .707-.001L8 11.366z" />
            )}
        </svg>
    );
};

export default DropdownArrow;