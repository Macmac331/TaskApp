import React from "react";

const SubmitButton = ({value, onClick, disabled}) => {
    return (
        <button type="submit" onClick={onClick} disabled={disabled} className={`w-[80vw] lg:w-full h-12 text-center bg-blue-400 rounded-md text-lg font-Poppins`}>
            {value}
        </button>
    );
}

export default SubmitButton;
