import React, {useState, useRef, useEffect} from "react";
import {Label} from '@trussworks/react-uswds';
import PillButton from "../PillButton/PillButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import "./MultiSelectCombobox.scss";

const MultiSelectCombobox = ({
  items,
  label,
  entity,
  onChangeUpdate,
  searchBy}) =>{

  const [ filter, setFilter ] = useState('');
  const [ _items, _setItems ]= useState(items);
  const [ data, setData ]= useState(JSON.parse(JSON.stringify(items)));
  const [ showListBox , setShowListBox ] = useState(false);
  const [ selectedItems, setSelectedItems ] = useState([]);
  const selectedItemsRef = useRef(selectedItems);

  useEffect(()=>{
    populateSelectedItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const onSearchHanlder =(value) =>{
    const lowercasedFilter = value.toLowerCase();
    let filteredData = _items;
    if(value.length>0){
      if(searchBy==="contains"){
        filteredData = _items.filter(item => item.label.toLowerCase().includes(lowercasedFilter));
      }else if(searchBy==="beginsWith"){
        filteredData = _items.filter(item => item.label.toLowerCase().startsWith(lowercasedFilter));
      }
    }
    setFilter(value);
    setData([...filteredData]);
  }

  const onRemoveHanlder = (id) =>{
    const itemsCopy = [...selectedItemsRef.current];
    const index = itemsCopy.findIndex(i=>i.id===id);
    if(index>-1){
      itemsCopy.splice(index, 1);
      selectedItemsRef.current = itemsCopy;
      setSelectedItems(itemsCopy);
      updateListDataOnChange(id, "remove");
      onChangeUpdate(id, "remove");
    }
  }

  const updateListDataOnChange = (id, update) =>{
    const _itemsCopy = [..._items];
    const index = _itemsCopy.findIndex(d=> d.id===id);
    if(index > -1){
      update==="add"? _itemsCopy[index].selected = true: _itemsCopy[index].selected = false;
    }
    _setItems([..._itemsCopy]);
    setData([..._itemsCopy]);
  }

  const optionClickHandler = (e) =>{
    if(e.target.getAttribute("data-id") === null){
      return;
    }
    const id = e.target.getAttribute("data-id");
    const optionLabel = e.target.getAttribute("data-label");
    if(!selectedItems.find(s=> s.id===id)){
      const _selectedItems = [...selectedItems,{
        id: id,
        component:
        <PillButton
          key={id}
          index={id}
          label={optionLabel}
          onRemove={onRemoveHanlder}
          disableButton={true}
        />
        }
      ];
      selectedItemsRef.current = _selectedItems;
      onSearchHanlder('');
      setSelectedItems(_selectedItems);
      updateListDataOnChange(id, "add");
      onChangeUpdate(id, "add");
    }
  }

  const populateSelectedItems = () =>{
    const selection = items.filter(i=>i.selected);
    const _selectedItems= [];
    selection.forEach(s=>{
      _selectedItems.push({
        id: s.id,
        component:
        <PillButton
          key={s.id}
          index={s.id}
          label={s.label}
          onRemove={onRemoveHanlder}
          disableButton={true}
        />
      })
    })
    selectedItemsRef.current = _selectedItems;
    setSelectedItems(_selectedItems);
  }

  return (
    <>
      <Label id={`${entity}-label`} htmlFor={`${entity}-searchbox`}>
        {label}
      </Label>
      <div role="combobox" name={entity} aria-hidden="true" aria-haspopup="listbox" aria-expanded={showListBox} aria-owns="listbox" aria-controls="listbox"
          id="multi-select-combobox" className="margin-top-1 margin-bottom-2 border-1px bg-white">
        <div className="margin-x-05 margin-top-05 display-block maxh-card overflow-y-scroll">
          {selectedItems.length>0 && selectedItems.map(i=>i.component)}
        </div>
        <input id={`${entity}-searchbox`} type="text" role="searchbox" aria-autocomplete="list" aria-controls="listbox" aria-activedescendant="listbox"
          className="search position-static bg-white border-0 width-full height-4 padding-x-1" data-testid="input-search"
          value={filter} onChange={(e)=>onSearchHanlder(e.target.value)} onFocus={()=>setShowListBox(true)}/>
          <FontAwesomeIcon icon={faCaretDown} className="pin-right margin-right-4 padding-top-05" onClick={()=>setShowListBox(true)}/>
        {showListBox &&
          <ul aria-multiselectable="true" role="listbox" aria-labelledby="listbox" id="listbox" data-testid="multi-select-listbox"
          className="list-box bg-white display-block height-mobile width-full overflow-y-scroll overflow-x-hidden border-top">
          {data.length>0? data.map((item,i)=>
            (<li key={i} role="option" aria-selected={item.selected} data-id={item.id} data-label={item.label} data-testid="multi-select-option"
                className={item.selected?"item selected padding-y-1 padding-x-2 border-top-0 display-flex flex-row flex-justify"
                  :"item padding-y-1 padding-x-2 border-top-0 display-flex flex-row flex-justify"}
                onClick={optionClickHandler}>
              <span data-id={item.id} data-label={item.label} className="option-label width-mobile">{item.label}</span>
              {item.selected? <FontAwesomeIcon icon={faCheck} color="#005ea2"/>: null}
            </li>)
          ):
            (<span className="padding-x-2 padding-top-2">No {entity} match your search.</span>)
          }
        </ul>
        }
      </div>
      {window.addEventListener('click', function(e){
        const multiSelectComboboxDiv = document.getElementById('multi-select-combobox');
        if (multiSelectComboboxDiv && !multiSelectComboboxDiv.contains(e.target)){
          setShowListBox(false);
        }
      })}
    </>
  )
};

export default MultiSelectCombobox;

