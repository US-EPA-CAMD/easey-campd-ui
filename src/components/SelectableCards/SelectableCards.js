import React, { useState } from "react";
import "./SelectableCards.scss";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {updateSelectedDataType} from "../../store/actions/customDataDownload/customDataDownload";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SelectableCard = ({ selected, title, onClick }) => {
  return (
    <button
      className={selected ? "selectablecard selected" : "selectablecard"}
      onClick={onClick}
      data-testid="selectable-card"
    >
      <span
        className={
          selected
            ? "fa fa-check-circle white-color fa-lg checkMarkOn"
            : "fa fa-check-circle white-color fa-lg checkMarkOff"
        }
      />
      <span className={selected ? "datatype selected" : "datatype"}>
        {title}
      </span>
    </button>
  );
};

const SelectableCardList = ({ contents, onChange }) => {
  const [selected, setSelected] = useState(-1);
  const onItemSelected = (index) => {
    onChange(index);
    setSelected(index);
  };
  const content = contents.map((dataType, i) => {
    return (
      <SelectableCard
        key={i}
        title={dataType}
        selected={selected === i}
        onClick={() => onItemSelected(i)}
      />
    );
  });
  return <>{content}</>;
};

export const SelectDataTypeInCards = ({updateSelectedDataTypeDispatcher, cardContents }) => {
  const [selected, setSelected] = useState(-1);
  const onListChanged = (selectedItem) => {
    setSelected(selectedItem);
  };
  const history = useHistory();
  const handleRoute = () => {
    setTimeout(()=>{
      updateSelectedDataTypeDispatcher(cardContents[selected]);
      history.push("/manage-data-download");
    }, 1000);
  };
  return (
    <div className="cardsContainer react-transition flip-in-y">
      <h3 className="font-alt-lg margin-3">
        <b>Select a Data Type </b>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-sm question-icon position-relative top-neg-1px"
        />
      </h3>
      <SelectableCardList contents={cardContents} onChange={onListChanged}/>
      {selected !== -1 && handleRoute()}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelectedDataTypeDispatcher: (selectedDataType) => dispatch(updateSelectedDataType(selectedDataType)),
  };
};

export default connect(null, mapDispatchToProps)(SelectDataTypeInCards);
