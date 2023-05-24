import React, { useState, useRef, useEffect } from "react";
import { Alert, Label } from "@trussworks/react-uswds";
import PillButton from "../PillButton/PillButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { getComboboxEnabledItems } from "../../utils/selectors/filterCriteria";
import "./MultiSelectCombobox.scss";
import Tooltip from "../Tooltip/Tooltip";
import { Help } from "@material-ui/icons";

const MultiSelectCombobox = ({
  items,
  label,
  entity,
  onChangeUpdate,
  searchBy,
}) => {
  const [filter, setFilter] = useState("");
  const [_items, _setItems] = useState(getComboboxEnabledItems(items));
  const [data, setData] = useState(
    JSON.parse(JSON.stringify(getComboboxEnabledItems(items)))
  );
  const [showListBox, setShowListBox] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [validationError, setValidationError] = useState(null);
  const selectedItemsRef = useRef(selectedItems);
  const inputRef = useRef(null);
  const [stillMounted, setStillMounted] = useState(true);
  const isFacilities = entity === "facilities",
    isAccounts = entity === "accounts";

  useEffect(() => {
    populateSelectedItems();
    return () => setStillMounted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearchHandler = (value) => {
    const lowercasedFilter = value.toLowerCase();
    let filteredData = _items;
    if (value.length > 0) {
      if (searchBy === "contains") {
        filteredData = _items.filter((item) =>
          item.label?.toString().toLowerCase().includes(lowercasedFilter)
        );
      } else if (searchBy === "beginsWith") {
        filteredData = _items.filter((item) =>
          item.label?.toString().toLowerCase().startsWith(lowercasedFilter)
        );
      }
    }
    setFilter(value);
    setData([...filteredData]);
    setShowListBox(true);
  };

  const onRemoveHanlder = (id) => {
    const itemsCopy = [...selectedItemsRef.current];
    const index = itemsCopy.findIndex((i) => i.id.toString() === id.toString());
    if (index > -1) {
      itemsCopy.splice(index, 1);
      selectedItemsRef.current = itemsCopy;
      setSelectedItems(itemsCopy);
      updateListDataOnChange(id, "remove");
      onChangeUpdate(id, "remove");
    }
  };

  const updateListDataOnChange = (id, update) => {
    const _itemsCopy = [..._items];
    const index = _itemsCopy.findIndex(
      (d) => d.id.toString() === id.toString()
    );
    if (index > -1) {
      update === "add"
        ? (_itemsCopy[index].selected = true)
        : (_itemsCopy[index].selected = false);
    }
    _setItems([..._itemsCopy]);
    setData([..._itemsCopy]);
  };

  const optionClickHandler = (e) => {
    if (e.target.getAttribute("data-id") === null) {
      return;
    }
    validationError && setValidationError(null);
    const id = e.target.getAttribute("data-id");
    const optionLabel = e.target.getAttribute("data-label");
    if (!selectedItems.find((s) => s.id.toString() === id.toString())) {
      const _selectedItems = [
        ...selectedItems,
        {
          id: id,
          component: (
            <PillButton
              key={id}
              index={id}
              label={optionLabel}
              onRemove={onRemoveHanlder}
              disableButton={true}
            />
          ),
        },
      ];
      selectedItemsRef.current = _selectedItems;
      onSearchHandler("");
      setSelectedItems(_selectedItems);
      updateListDataOnChange(id, "add");
      onChangeUpdate(id, "add");
    }
  };

  const populateSelectedItems = () => {
    const selection = items.filter((i) => i.selected);
    const _selectedItems = [];
    for (const s of selection) {
      if (stillMounted) {
        _selectedItems.push({
          id: s.id,
          component: (
            <PillButton
              key={s.id}
              index={s.id}
              label={s.label}
              onRemove={onRemoveHanlder}
              disableButton={true}
            />
          ),
        });
      } else {
        break;
      }
    }
    if (!stillMounted) {
      return;
    }
    selectedItemsRef.current = _selectedItems;
    setSelectedItems(_selectedItems);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      //** allows pipe delimited list */
      if ((isFacilities || isAccounts) && inputRef?.current?.value?.length) {
        selectItemsFromPipeSeparatedList();
      }
      if (!showListBox) {
        setShowListBox(true);
      } else {
        optionClickHandler(event);
      }
    } else if (event.key === "Escape") {
      setShowListBox(false);
      const applyBtn = document.querySelector(".autofocus2");
      if (applyBtn) {
        applyBtn.focus();
      }
    }
  };
  const selectItemsFromPipeSeparatedList = () => {
    if(!isFacilities || !isAccounts) return
    validationError && setValidationError(null);
    const searchValueArray = inputRef.current.value
        .toLowerCase()
        .split("|")
        .map((el) => el.trim())
        .filter((el) => el !== "" && el !== " "),
      searchValueObj = searchValueArray.reduce(
        (acc, curr) => ({ ...acc, [curr]: true }),
        {}
      ),
      filteredItems = [],
      itemsCopy = [..._items],
      invalidEntries = [];
    itemsCopy.forEach((item) => {
      let { label, id } = item;
      label = label.toString();
      const name = label.split("(")[0].slice(0, -1).toLowerCase();
      if (searchValueObj[id] || searchValueObj[name]) {
        item.selected = true;
        filteredItems.push(item);
        if (searchValueObj[id]) {
          searchValueObj[id] = "valid";
        }
        if (searchValueObj[label.toLowerCase()]) {
          searchValueObj[label.toLowerCase()] = "valid";
        }
        if (searchValueObj[name]) {
          searchValueObj[name] = "valid";
        }
      }
    });
    if (searchValueArray.length !== filteredItems.length) {
      searchValueArray.forEach((el) => {
        if (searchValueObj[el] !== "valid") {
          invalidEntries.push(el);
        }
      });
    }
    if (searchValueArray.length > 1 || filteredItems.length) {
      _setItems([...itemsCopy]);
      if (!filteredItems.length) {
        isFacilities &&
          setValidationError(
            "No Facility Name/ID Matched your search. Please try again"
          );
        isAccounts &&
          setValidationError(
            "No Account Names or Numbers Matched your search. Please try again"
          );
        return;
      }
      setData([...itemsCopy]);
      const _selectedItems = [];
      filteredItems.forEach((item) => {
        const { label, id } = item;
        const itemComponent = {
          id,
          component: (
            <PillButton
              key={id}
              index={id}
              label={label}
              onRemove={onRemoveHanlder}
              disableButton={true}
            />
          ),
        };
        if (!selectedItems.find((s) => s.id.toString() === id.toString())) {
          _selectedItems.push(itemComponent);
        }
        updateListDataOnChange(id, "add");
        onChangeUpdate(id, "add");
      });
      const updatedSelectedItems = [...selectedItems, ..._selectedItems];
      onSearchHandler("");
      if (_selectedItems.length) {
        selectedItemsRef.current = updatedSelectedItems;
        setSelectedItems(updatedSelectedItems);
      }
      if (invalidEntries.length) {
        let entries = "";
        invalidEntries.forEach((entry, i) => {
          if (i === 0) {
            entries += `"${entry}"`;
          } else if (i !== invalidEntries.length - 1) {
            entries += `, "${entry}"`;
          } else {
            entries += `, and "${entry}"`;
          }
        });
        isFacilities &&
          setValidationError(
            `Your search for ${entries} returned no results. Please try again with a valid Facility Name/ORIS Code`
          );
        isAccounts &&
          setValidationError(
            `Your search for ${entries} returned no results. Please try again with a valid Account Name/Number)`
          );
      }
    }
  };
  const comboBoxTooltip = () => {
    if (isFacilities) {
      return (
        <Tooltip
          content={
            "Paste into the search box a pipe delimited list of facility names or IDs (ORIS Codes) for quicker query building (e.g., Barry|Gadsden|Colbert)."
          }
          field={`${label} combo box`}
        >
          <Help className="text-primary margin-left-1" fontSize="small" />
        </Tooltip>
      );
    } else if (isAccounts) {
      return (
        <Tooltip
          content={
            "Paste into the search box a pipe delimited list of account names or numbers for quicker query building (e.g., Barry|Gadsden|Colbert)."
          }
          field={`${label} combo box`}
        >
          <Help className="text-primary margin-left-1" fontSize="small" />
        </Tooltip>
      );
    }
    return null;
  };

  return (
    <>
      {validationError ? (
        <Alert role="alert" type="info">
          {validationError}
        </Alert>
      ) : null}
      <Label id={`${entity}-label`} htmlFor={`${entity}-searchbox`}>
        {label}
        {comboBoxTooltip()}
      </Label>
      <div
        role="combobox"
        name={entity}
        aria-haspopup="listbox"
        aria-controls={`${entity}-searchbox`}
        aria-expanded={showListBox}
        aria-owns="listbox"
        id="multi-select-combobox"
        className="margin-top-1 margin-bottom-2 border-1px bg-white"
      >
        <div className="margin-x-05 margin-top-05 display-block maxh-card overflow-y-scroll">
          {selectedItems.length > 0 && selectedItems.map((i) => i.component)}
        </div>
        <input
          autoFocus
          id={`${entity}-searchbox`}
          ref={inputRef}
          type="text"
          aria-labelledby={`${entity}-label`}
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="listbox"
          aria-activedescendant="listbox"
          className="search position-static bg-white border-0 width-full height-4 padding-x-1"
          data-testid="input-search"
          value={filter}
          onChange={(e) => onSearchHandler(e.target.value)}
          onClick={() => setShowListBox(true)}
          onKeyDown={(e) => handleKeyDown(e)}
          onBlur={selectItemsFromPipeSeparatedList}
        />
        <FontAwesomeIcon
          icon={faCaretDown}
          className="pin-right margin-right-4 padding-top-05"
          onClick={() => setShowListBox(true)}
        />
        {showListBox && (
          <ul
            aria-multiselectable="true"
            role="listbox"
            aria-labelledby={`${entity}-label`}
            id="listbox"
            data-testid="multi-select-listbox"
            tabIndex="-1"
            className="list-box bg-white display-block height-mobile width-full overflow-y-scroll overflow-x-hidden border-top"
          >
            {data.length > 0 ? (
              data.map((item, i) => (
                <li
                  key={i}
                  role="option"
                  aria-selected={item.selected}
                  data-id={item.id}
                  tabIndex="0"
                  data-label={item.label}
                  data-testid="multi-select-option"
                  className={
                    item.selected
                      ? "item selected padding-y-1 padding-x-2 border-top-0 display-flex flex-row flex-justify"
                      : "item padding-y-1 padding-x-2 border-top-0 display-flex flex-row flex-justify"
                  }
                  onClick={optionClickHandler}
                  onKeyDown={(e) => handleKeyDown(e)}
                >
                  <span
                    data-id={item.id}
                    data-label={item.label}
                    className="option-label width-mobile"
                  >
                    {item.label}
                  </span>
                  {item.selected ? (
                    <FontAwesomeIcon icon={faCheck} color="#005ea2" />
                  ) : null}
                </li>
              ))
            ) : (
              <span className="padding-x-2 padding-top-2">
                No {entity.replace("-", " ")} match your search.
              </span>
            )}
          </ul>
        )}
      </div>
      {window.addEventListener("click", function (e) {
        const multiSelectComboboxDiv = document.getElementById(
          "multi-select-combobox"
        );
        if (
          multiSelectComboboxDiv &&
          !multiSelectComboboxDiv.contains(e.target)
        ) {
          setShowListBox(false);
        }
      })}
    </>
  );
};

export default MultiSelectCombobox;
