import React, { useState } from "react";
import "./SelectableCards.scss";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { updateSelectedDataType } from "../../store/actions/customDataDownload/customDataDownload";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SelectableCard = ({ selected, title, onClick }) => {
  return (
    <div className="margin-x-9 padding-x-7 tablet:grid-col-4 tablet:margin-x-0 tablet:padding-x-0">
      <button
        className={
          selected
            ? "selectablecard selected width-card height-card"
            : "selectablecard width-card height-card margin-x-auto"
        }
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
        <span
          className={
            selected ? "text-white text-center" : "text-primary text-center"
          }
        >
          {title}
        </span>
      </button>
    </div>
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

export const SelectDataTypeInCards = ({
  updateSelectedDataTypeDispatcher,
  cardContents,
}) => {
  const [selected, setSelected] = useState(-1);
  const onListChanged = (selectedItem) => {
    setSelected(selectedItem);
  };
  const history = useHistory();
  const handleRoute = () => {
    setTimeout(() => {
      updateSelectedDataTypeDispatcher(cardContents[selected]);
      history.push("/manage-data-download");
    }, 1000);
  };
  return (
    <>
      <h3 className="font-alt-lg margin-y-3 mobile-lg:text-center tablet:text-left">
        <b>Select a Data Type </b>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-primary font-body-sm question-icon position-relative top-neg-1px"
        />
      </h3>
      <div className="grid-row">
        <SelectableCardList contents={cardContents} onChange={onListChanged} />
      </div>
      {selected !== -1 && handleRoute()}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelectedDataTypeDispatcher: (selectedDataType) =>
      dispatch(updateSelectedDataType(selectedDataType)),
  };
};

export default connect(null, mapDispatchToProps)(SelectDataTypeInCards);
