import React, { useState, useEffect } from 'react';
import { List, ListItem, ClickAwayListener } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { ArrowDownwardSharp, ArrowUpwardSharp } from '@material-ui/icons';

import { Button, Checkbox, TextInput } from '@trussworks/react-uswds';
import './TableMenu.scss';
import { connect } from 'react-redux';
import { updateFilterCriteria } from '../../../store/actions/customDataDownload/filterCriteria';
import { usePopper } from 'react-popper';
import Portal from '../../Portal/Portal';
import { handleKeyDown } from '../../../utils/ensure-508/handleKeyDown';

const TableMenu = ({
  topic,
  fieldMappings,
  filterCriteria,
  setSortValue,
  setSortDesc,
  setSortAsc,
  setUnsort,
  setSelectedColumns,
  selectedColumns,
  excludableColumns,
  updateFilterCriteriaDispatcher,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(anchorEl, popperElement);

  const [menuOpen, setMenuOpen] = useState(false);
  const [columnMenuOpen, setColumnMenuOpen] = useState(false);
  const [sortArrowUp, setSortArrowUp] = useState(false);

  const [checkedBoxes, setCheckedBoxes] = useState({});
  const [excludableColumnsState, setExcludableColumnsState] = useState(null);
  const [nonExcludableColumns, setNonExcludableColumns] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState([]);
  const [checkAll, setCheckAll] = useState(null);
  const [filterMappingsCopy, setFilterMappingsCopy] = useState([]);
  const [closed, setClosed] = useState(true);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const columns = {};
    const removableColumns = {};
    const requiredColumns = [];

    if (excludableColumns) {
      excludableColumns.forEach((column) => (columns[column.label] = true));
      setExcludableColumnsState(columns);
      const tempFieldMappings = JSON.parse(JSON.stringify(fieldMappings));
      if (fieldMappings) {
        tempFieldMappings.forEach((el) => {
          const label = el.label;
          if (columns[label]) {
            removableColumns[label] = el;
            removableColumns[label].checked = true;
          } else {
            requiredColumns.push(el);
          }
        });
        if (filterCriteria.columnState) {
          setCheckedBoxes(
            JSON.parse(JSON.stringify(filterCriteria.columnState))
          );
        } else {
          setCheckedBoxes(removableColumns);
        }
        setCheckAll(removableColumns);
        setNonExcludableColumns(requiredColumns);
        setFilteredColumns(tempFieldMappings);
        setFilterMappingsCopy(tempFieldMappings);
      }
    } //eslint-disable-next-line
  }, [excludableColumns, selectedColumns]);
  useEffect(() => {
    // setCheckedBoxes()
    if (closed) {
      if (filterCriteria.columnState) {
        setCheckedBoxes(JSON.parse(JSON.stringify(filterCriteria.columnState)));
      } else {
        checkAll && setCheckedBoxes(checkAll);
      }
      setClosed(false);
    }
  }, [closed, filterCriteria.columnState, checkAll]);
  const openMenu = async (event) => {
    setMenuOpen(true);
    await setAnchorEl(event.currentTarget);
    const unsortMenuOption = document.querySelector('#unsort');
    unsortMenuOption && unsortMenuOption.focus();
  };
  const openSubMenu = async () => {
    await setColumnMenuOpen(true);
    setMenuOpen(false);
    const search = document.querySelector('#textField');
    search && search.focus();
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    setColumnMenuOpen(false);
    setMenuOpen(false);
    setClosed(true);
    // setCheckedBoxes(applied)
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

  const handleSearch = (e) => {
    setFilteredColumns(
      filterMappingsCopy.filter((column) =>
        column.label.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleSelectAll = () => {
    const columns = [...filteredColumns];
    const temp = { ...checkedBoxes };
    columns.forEach((el) => {
      const label = el.label;
      if (checkedBoxes[label]) {
        temp[label].checked = true;
      }
    });
    setFilteredColumns(columns);
    setCheckedBoxes(temp);
  };

  const handleDeselectAll = () => {
    const columns = [...filteredColumns];
    const temp = { ...checkedBoxes };
    columns.forEach((el) => {
      const label = el.label;
      if (checkedBoxes[label]) {
        temp[label].checked = false;
      }
    });
    setFilteredColumns(columns);
    setCheckedBoxes(temp);
  };
  const handleApply = () => {
    const columns = [];
    const excludedColumns = [];
    filteredColumns.forEach((el) => {
      const label = el.label;
      if (checkedBoxes[label]?.checked) {
        columns.push(checkedBoxes[label]);
      } else if (checkedBoxes[label]) {
        excludedColumns.push(checkedBoxes[label].value);
      }
    });
    const columnsToDisplay = [...columns, ...nonExcludableColumns];
    const filterCriteriaCloned = JSON.parse(JSON.stringify(filterCriteria));
    filterCriteriaCloned.excludeParams = excludedColumns;
    filterCriteriaCloned.selectedColumns = columnsToDisplay;
    filterCriteriaCloned.columnState = checkedBoxes;
    updateFilterCriteriaDispatcher(filterCriteriaCloned);
    setSelectedColumns(columnsToDisplay);
    handleClose(true);
  };
  const getCheckBoxStatus = (checkbox) => {
    if (checkedBoxes[checkbox]) {
      return checkedBoxes[checkbox]?.checked;
    }

    return true;
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
        id="icons"
        className="display-flex"
        style={open ? { visibility: 'visible' } : { display: 'flex' }}
      >
        {sortArrowUp ? (
          <ArrowUpwardSharp
            className="text-base"
            onClick={handleSortDesc}
            onKeyDown={(e) => handleKeyDown(e, handleSortDesc, 'Enter')}
            id={'icon'}
            tabIndex={0}
          />
        ) : (
          <ArrowDownwardSharp
            className="text-base"
            onClick={handleSortAsc}
            onKeyDown={(e) => handleKeyDown(e, handleSortAsc, 'Enter')}
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
          onClick={openMenu}
          onKeyDown={(e) => handleKeyDown(e, openMenu, 'Enter')}
          id={'icon'}
          tabIndex={0}
          ref={setAnchorEl}
        />
      </span>
      {menuOpen ? (
        <Portal>
          <ClickAwayListener onClickAway={handleClose}>
            <List
              id="subMenuContainer"
              ref={setPopperElement}
              onClose={handleClose}
              style={styles.popper}
              {...attributes.popper}
              sx={{ bgcolor: 'white', boxShadow: 1 }}
              component="nav"
              aria-labelledby="submenu"
            >
              <ListItem
                onClick={handleUnsort}
                onKeyDown={(e) => handleKeyDown(e, handleUnsort, 'Enter')}
                key="unsort"
                id="unsort"
                tabIndex={0}
              >
                Unsort
              </ListItem>
              <ListItem
                onClick={handleSortAsc}
                onKeyDown={(e) => handleKeyDown(e, handleSortAsc, 'Enter')}
                key="asc"
                tabIndex={0}
              >
                Sort by ASC
              </ListItem>
              <ListItem
                onClick={handleSortDesc}
                key="desc"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, handleSortDesc, 'Enter')}
              >
                Sort by DESC
              </ListItem>
              <ListItem
                onClick={openSubMenu}
                onKeyDown={(e) => handleKeyDown(e, openSubMenu, 'Enter')}
                tabIndex={0}
              >
                Customize Columns
              </ListItem>
            </List>
          </ClickAwayListener>
        </Portal>
      ) : null}
      {columnMenuOpen ? (
        <Portal>
          <ClickAwayListener onClickAway={handleClose}>
            <List
              id="subMenuContainer"
              ref={setPopperElement}
              onClose={handleCloseSubMenu}
              style={styles.popper}
              {...attributes.popper}
              sx={{ bgcolor: 'white', boxShadow: 1 }}
              component="nav"
              aria-labelledby="submenu"
            >
              <div>
                <div className="form-group margin-1" id="columnMenu">
                  <div className="text-primary">Find Column</div>
                  <TextInput
                    placeholder="Column Title"
                    type="search"
                    id="textField"
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSearch(e);
                    }}
                    tabIndex={0}
                  />
                  <br />
                  <div id="columns" className="padding-left-1">
                    {filteredColumns?.map((el) => (
                      <div key={el.label} className="padding-right-1">
                        {!excludableColumnsState[el.label] ? (
                          <Checkbox
                            id={el.label}
                            label={el.label}
                            disabled={true}
                            checked={true}
                          />
                        ) : (
                          <Checkbox
                            id={el.label}
                            label={el.label}
                            checked={getCheckBoxStatus(el.label)}
                            onChange={(e) => {
                              setCheckedBoxes({
                                ...checkedBoxes,
                                [el.label]: {
                                  ...el,
                                  checked: e.target.checked,
                                },
                              });
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                const status = e.target.checked ? false : true;
                                e.target.checked = status;

                                setCheckedBoxes({
                                  ...checkedBoxes,
                                  [el.label]: {
                                    ...el,
                                    checked: status,
                                  },
                                });
                              }
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="margin-top-1">
                    <div className="display-flex flex-justify">
                      <div
                        className="text-primary"
                        tabIndex={0}
                        role="button"
                        onClick={handleSelectAll}
                        onKeyDown={(e) =>
                          handleKeyDown(e, handleSelectAll, 'Enter')
                        }
                      >
                        Select All
                      </div>
                      <div
                        className="text-primary"
                        tabIndex={0}
                        role="button"
                        onClick={handleDeselectAll}
                        onKeyDown={(e) =>
                          handleKeyDown(e, handleDeselectAll, 'Enter')
                        }
                      >
                        Deselect All
                      </div>
                    </div>
                    <div className="width-10 margin-x-auto">
                      <Button type="button" onClick={handleApply} tabIndex={0}>
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </List>
          </ClickAwayListener>
        </Portal>
      ) : null}
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
