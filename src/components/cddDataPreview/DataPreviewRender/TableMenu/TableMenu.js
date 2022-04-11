import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { ArrowDownwardSharp, ArrowUpwardSharp } from '@material-ui/icons';

import { Button } from '@trussworks/react-uswds';
import useHover from '../../../../utils/hooks/useHover';

const TableMenu = ({
  topic,
  fieldMappings,
  setSortValue,
  setSortDesc,
  setSortAsc,
  setUnsort,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [columMenuOpen, setColumnMenuOpen] = useState(false);
  const [sortArrowUp, setSortArrowUp] = useState(false);
  const [ref, isHovered] = useHover();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseSubMenu = () => {
    setColumnMenuOpen(false);
    setAnchorEl(null);
  };
  const handleSortAsc = () => {
    setSortValue(topic.value);
    setSortDesc(false);
    setUnsort(false);
    setSortAsc(true);
    setSortArrowUp(true);
    handleClose();
  };
  const handleSortDesc = () => {
    setSortArrowUp(false);
    setSortValue(topic.value);
    setUnsort(false);
    setSortAsc(false);
    setSortDesc(true);
    handleClose();
  };
  const handleUnsort = () => {
    setSortValue(topic.value);
    setSortAsc(false);
    setSortDesc(false);
    setUnsort(true);
    setSortArrowUp(false);
    handleClose();
  };

  return (
    <div
      className="display-flex"
      id="container"
      onClick={(e) => {
        e.stopPropagation();
      }}
      ref={ref}
    >
      {topic.label}
      <span style={isHovered | open ? { display: 'flex' } : { visibility: 'hidden' }}>
        {sortArrowUp ? (
          <ArrowUpwardSharp
            className="text-base"
            style={{ fontSize: '18px' }}
            onClick={handleSortDesc}
            id={'icon'}
          />
        ) : (
          <ArrowDownwardSharp
            className="text-base"
            style={{ fontSize: '18px' }}
            onClick={handleSortAsc}
            id={'icon'}
          />
        )}
        <FontAwesomeIcon
          icon={faEllipsisV}
          color={'gray'}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          id={'icon'}
        />
      </span>
      {!columMenuOpen ? (
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
            <MenuItem onClick={handleUnsort} key="unsort">
              Unsort
            </MenuItem>
            <MenuItem onClick={handleSortAsc} key="asc">
              sort by ASC
            </MenuItem>
            <MenuItem onClick={handleSortDesc} key="desc">
              sort by DESC
            </MenuItem>
            <MenuItem onClick={() => setColumnMenuOpen(true)}>
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
        >
          <FormGroup className="margin-x-1">
            <div className="text-primary">Find Column</div>
            <TextField
              placeholder="Column Title"
              variant="standard"
              id="textField"
            />
            {fieldMappings?.map((el) => (
              <MenuItem key={el.label}>
                <FormControlLabel control={<Checkbox />} label={el.label} />
              </MenuItem>
            ))}
            <div className="display-flex flex-justify">
              <div className="text-primary">Select All</div>
              <div className="text-primary">Deselect All</div>
            </div>
            <Button type="button" className="width-10 margin-x-auto">
              Apply
            </Button>
          </FormGroup>
        </Menu>
      )}
    </div>
  );
};

export default TableMenu;
