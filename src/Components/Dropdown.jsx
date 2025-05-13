import React, { useEffect, useMemo, useReducer, useState } from "react";
import MenuItem from "./MenuItem";

const init = [];

const Dropdown = (props) => {
  const { optionKey, optionLabel, isMultiSelect } = props;

  const dropDownReducer = (state, action) => {
    switch (action.type) {
      case "reset":
        return init;
      case "add-all":
        return [...action.value];
      case "add":
        return [...(isMultiSelect ? state : []), action.value];
      case "remove":
        return state.filter(
          (item) => item[optionKey] !== action.value[optionKey]
        );
      default:
        return state;
    }
  };

  const [value, dispatch] = useReducer(dropDownReducer, init);
  const [searchText, setSearchText] = useState("");
  const [optionsData, setOptionsData] = useState([]);
  const [status, setStatus] = useState("idle");

  const getApiData = async (searchText) => {
    setStatus("searching");
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setOptionsData(
        data?.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
      dispatch({ type: "reset" });
      setStatus("success");
    } catch (error) {
      console.error("error", error);
      setStatus("error");
    }
  };

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText) {
        getApiData(searchText);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchText]);

  const Menu = useMemo(() => {
    return (
      <div>
        {[
          ...(isMultiSelect
            ? [
                <div key="all">
                  <input
                    type="checkbox"
                    value="all"
                    onChange={(e) =>
                      e.target.checked
                        ? dispatch({ type: "add-all", value: optionsData })
                        : dispatch({ type: "reset" })
                    }
                    checked={value.length === optionsData.length}
                  />
                  <label>All</label>
                </div>,
              ]
            : []),
          optionsData.map((option) => (
            <MenuItem
              key={option[optionKey]}
              option={option}
              optionKey={optionKey}
              optionLabel={optionLabel}
              value={value}
              dispatch={dispatch}
            />
          )),
        ]}
      </div>
    );
  }, [isMultiSelect, value, optionsData, optionKey, optionLabel]);

  // reset on multi select change
  useEffect(() => {
    dispatch({ type: "reset" });
    setSearchText("");
    setStatus("idle");
  }, [isMultiSelect]);

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        placeholder="Search"
      />
      {status === "success" ? (
        Menu
      ) : status === "idle" ? (
        <p>Start typing to search</p>
      ) : status === "searching" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <p className="error">Failed to load data</p>
      ) : null}
    </div>
  );
};

export default Dropdown;
