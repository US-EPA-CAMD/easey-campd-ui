import React from 'react';
import { Button, TextInput } from '@trussworks/react-uswds';
import { ClearIcon } from '@material-ui/icons/Clear';

const SearchComponent = ({ searchText, onSearchHandler, onChangeHandler, onClearHandler }) => {
  return (
    <div>
      <TextInput
        id="search-input"
        name="input-search"
        type="text"
        placeholder="Keyword"
        value={searchText}
			  onChange={onChangeHandler}
      >
        <ClearIcon
          onClick={onClearHandler}
        />
      </TextInput>
      <Button
        type="button"
        className="flex-end margin-x-1"
        onClick={onSearchHandler}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchComponent;
