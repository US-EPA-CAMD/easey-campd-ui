import React, { useState, useEffect } from 'react';
import {
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { ArrowDownwardSharp, ArrowUpwardSharp } from '@material-ui/icons';

import { Button } from '@trussworks/react-uswds';
import './TableMenu.scss';
import { connect } from 'react-redux';
import { updateFilterCriteria } from '../../../store/actions/customDataDownload/filterCriteria';

const TableMenu = ({
  topic,
  fieldMappings,
  filterCriteria,
  setSortValue,
  setSortDesc,
  setSortAsc,
  setUnsort,
  setSelectedColumns,
  excludableColumns,
  updateFilterCriteriaDispatcher,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [columnMenuOpen, setColumnMenuOpen] = useState(false);
  const [sortArrowUp, setSortArrowUp] = useState(false);
  const [checkedBoxes, setCheckedBoxes] = useState({});
  const [excludableColumnsState, setExcludableColumnsState] = useState(null);
  const [nonExcludableColumns, setNonExcludableColumns] = useState([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const columns = {};
    const selectableColumns = {};
    const unSelectableColumns = [];
    if (excludableColumns) {
      excludableColumns.forEach((column) => (columns[column.label] = true));
      setExcludableColumnsState(columns);
      if (fieldMappings) {
        fieldMappings.forEach((el) => {
          columns[el.label]
            ? (selectableColumns[el.label] = el)
            : unSelectableColumns.push(el);
        });
        setCheckedBoxes(selectableColumns);
        setNonExcludableColumns(unSelectableColumns);
      }
    }
  }, [excludableColumns, fieldMappings]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    if (e?.key === 'Tab') {
      return;
    }
    setAnchorEl(null);
  };
  const handleCloseSubMenu = (e) => {
    if (e.key === 'Tab') {
      return;
    }
    setColumnMenuOpen(false);
    setAnchorEl(null);
  };
  const handleSortAsc = (e) => {
    setSortValue(topic.value);
    setSortDesc(false);
    setUnsort(false);
    setSortAsc(true);
    setSortArrowUp(true);
    handleClose(e);
  };
  const handleSortDesc = (e) => {
    setSortArrowUp(false);
    setSortValue(topic.value);
    setUnsort(false);
    setSortAsc(false);
    setSortDesc(true);
    handleClose(e);
  };
  const handleUnsort = () => {
    setSortValue(topic.value);
    setSortAsc(false);
    setSortDesc(false);
    setUnsort(true);
    setSortArrowUp(false);
    handleClose();
  };
  const handleApply = () => {
    const columns = [];
    const excludedColumns = [];
    Object.keys(checkedBoxes).forEach((el) => {
      if (checkedBoxes[el].checked) {
        columns.push(checkedBoxes[el]);
      } else if (checkedBoxes[el]) {
        excludedColumns.push(checkedBoxes[el].value);
      }
    });
    const columnsToDisplay = [...columns, ...nonExcludableColumns];
    const filterCriteriaCloned = JSON.parse(JSON.stringify(filterCriteria));
    filterCriteriaCloned.excludeParams = excludedColumns;
    filterCriteriaCloned.selectedColumns = columnsToDisplay;
    updateFilterCriteriaDispatcher(filterCriteriaCloned);
    setSelectedColumns(columnsToDisplay);
    handleClose();
  };

  return (
    <div
      className="display-flex"
      id="container"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {topic.label}
      <span
        id='icons'
        className='display-flex'
      >
        {sortArrowUp ? (
          <ArrowUpwardSharp
            className="text-base"
            style={{ fontSize: '18px' }}
            onClick={handleSortDesc}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSortDesc(e) : null)}
            id={'icon'}
            tabIndex={0}
          />
        ) : (
          <ArrowDownwardSharp
            className="text-base"
            style={{ fontSize: '18px' }}
            onClick={handleSortAsc}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSortAsc(e) : null)}
            id={'icon'}
            tabIndex={0}
          />
        )}
        <FontAwesomeIcon
          icon={faEllipsisV}
          color={'gray'}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          onKeyDown={(e) => (e.key === 'Enter' ? handleClick(e) : null)}
          id={'icon'}
          tabIndex={0}
        />
      </span>
      {!columnMenuOpen ? (
        <>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleUnsort} key="unsort" tabIndex={0}>
              Unsort
            </MenuItem>
            <MenuItem onClick={handleSortAsc} key="asc" tabIndex={0}>
              Sort by ASC
            </MenuItem>
            <MenuItem onClick={handleSortDesc} key="desc" tabIndex={0}>
              Sort by DESC
            </MenuItem>
            <MenuItem
              onClick={async () => {
                await setColumnMenuOpen(true);
                const search = document.querySelector('#textField');
                search && search.focus();
              }}
              tabIndex={0}
            >
              Customize Columns
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Menu
          id={topic}
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseSubMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            style: { maxHeight: 350 },
          }}
        >
          <div className="form-group margin-x-1" tabIndex={-1}>
            <div className="text-primary" tabIndex={0}>
              Find Column
            </div>
            <TextField
              placeholder="Column Title"
              variant="standard"
              id="textField"
            />
            <br />
            <div id="columns" className="padding-left-1">
              {fieldMappings?.map((el) => (
                <div key={el.label} className="padding-right-1 padding-top-1">
                  <MenuItem>
                  <FormControlLabel
                    control={
                      !excludableColumnsState[el.label] ? (
                        <Checkbox
                          sx={{ padding: 0 }}
                          tabIndex={-1}
                          disabled={true}
                          checked={true}
                        />
                      ) : (
                        <Checkbox
                          sx={{ padding: 0 }}
                          tabIndex={0}
                        />
                      )
                    }
                    label={el.label}
                    onChange={(e) =>
                      setCheckedBoxes({
                        ...checkedBoxes,
                        [el.label]: { ...el, checked: e.target.checked },
                      })
                    }
                  /></MenuItem>
                </div>
              ))}
            </div>
            <div>
              <div className="display-flex flex-justify">
                <div className="text-primary" tabIndex={0}>
                  Select All
                </div>
                <div className="text-primary" tabIndex={0}>
                  Deselect All
                </div>
              </div>
              <div className="width-10 margin-x-auto">
                <Button type="button" onClick={handleApply}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </Menu>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilterCriteriaDispatcher: (filterCriteria) =>
      dispatch(updateFilterCriteria(filterCriteria)),
  };
};
const mapStateToProps = (state) => {
  return {
    fieldMappings: state.customDataDownload.fieldMappings,
    filterCriteria: state.filterCriteria,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableMenu);
