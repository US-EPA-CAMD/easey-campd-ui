import React, {useState, useRef, useEffect} from "react";
import {Label} from '@trussworks/react-uswds';
import PillButton from "../PillButton/PillButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import "./MultiSelectCombobox.scss";

const MultiSelectCombobox = ({
  items,
  label,
  entity,
  onChangeUpdate}) =>{

  const [ filter, setFilter ] = useState('');
  const [ data, setData ]= useState(items);
  const [ showListBox , setShowListBox ] = useState(false);
  const [ selectedItems, setSelectedItems ] = useState([]);
  const selectedItemsRef = useRef(selectedItems);

  useEffect(()=>{
    populateSelectedItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const onSearchHanlder =(e) =>{
    const value = e.target.value;
    const lowercasedFilter = value.toLowerCase();
    let filteredData = items;
    if(value.length>0){
      filteredData = items.filter(item => item.label.toLowerCase().includes(lowercasedFilter));
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
      onChangeUpdate(id, "remove");
    }
  }

  const optionClickHandler = (e) =>{
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
        />
        }
      ];
      selectedItemsRef.current = _selectedItems;
      setSelectedItems(_selectedItems);
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
        />
      })
    })
    selectedItemsRef.current = _selectedItems;
    setSelectedItems(_selectedItems);
  }

  return (
    <>
      <Label id={`${entity}-label`} htmlFor={entity}>
        {label}
      </Label>
      <div role="combobox" name={entity} aria-hidden="true" id="multi-select-combobox" className="border-1px bg-white">
        <div className="margin-x-05 margin-top-05 display-block maxh-card overflow-y-scroll">
          {selectedItems.length>0 && selectedItems.map(i=>i.component)}
        </div>
        <input type="text" className="search position-static bg-white border-0 width-full height-4 padding-x-1" 
          value={filter} onChange={onSearchHanlder} onFocus={()=>setShowListBox(true)}/>
          <FontAwesomeIcon icon={faCaretDown} className="pin-right margin-right-4 padding-top-05" onClick={()=>setShowListBox(true)}/>
        {showListBox &&
          <div aria-multiselectable="true" role="listbox" aria-hidden="true"
          className="list-box bg-white display-block height-mobile width-full overflow-y-scroll overflow-x-hidden border-top">
          {data.length>0? data.map((item,i)=>
            (<div key={i} role="option" aria-selected={item.selected} data-id={item.id} data-label={item.label}
                className="item padding-y-1 padding-x-2 border-top-0" onClick={optionClickHandler}>
              <span data-id={item.id} data-label={item.label} className="option-label width-mobile">{item.label}</span>
            </div>)
          ):
            (<span className="padding-x-2 padding-top-2">No facilities match your search.</span>)
          }
        </div>
        }
      </div>
      {window.addEventListener('click', function(e){
        const multiSelectComboboxDiv = document.getElementById('multi-select-combobox');
        if (multiSelectComboboxDiv &&!multiSelectComboboxDiv.contains(e.target)){
         setShowListBox(false);
        }
      })}
    </>
  )
};

export default MultiSelectCombobox;

