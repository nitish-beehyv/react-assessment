import React from "react";

const MenuItem = ({ option, optionKey, optionLabel, value, dispatch }) => {
  return (
    <div>
      <input
        type="checkbox"
        value={option[optionKey]}
        onChange={(e) =>
          e.target.checked
            ? dispatch({ type: "add", value: option })
            : dispatch({ type: "remove", value: option })
        }
        checked={value.some((item) => item[optionKey] === option[optionKey])}
      />
      <label>{option[optionLabel]}</label>
    </div>
  );
};

export default MenuItem;
