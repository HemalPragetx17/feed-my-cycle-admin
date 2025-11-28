import React from "react";
import CalendarIcon from "../../../admin/assets/media/svg/Calendar(field).svg";

const CustomDateInput = React.forwardRef<HTMLButtonElement, any>(
  ({ value, onClick, placeholder, inputClass }, ref) => {
    return (
      <button
        ref={ref}
        className={`form-control h-50px  d-flex justify-content-between align-items-center ms-1 min-w-lg-200px ${value ? "" : ""
          } ${inputClass ? inputClass : "fs-16 fw-400"}  `}
        style={{
          color: "#5e6278",
          fontSize:'16px',
          fontWeight:400
        }}
        onClick={onClick}
      >
        {value || placeholder}
        <img className="ms-4" src={CalendarIcon} height={20} width={20} />
      </button>
    );
  }
);

CustomDateInput.displayName = "CustomDateInput";

export default CustomDateInput;
