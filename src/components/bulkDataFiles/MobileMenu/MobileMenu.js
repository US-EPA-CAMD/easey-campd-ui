import React from 'react';

import { Button } from '@trussworks/react-uswds';

export const MobileMenu = ({
  setShowMobileFilters,
  handleClearAll,
  setPreviewDataApplied,
  dataType
}) => {
  const handleBackButtonClick = () => setShowMobileFilters(false);
  const handlePreviewData = () => {
    setPreviewDataApplied(true);
    setShowMobileFilters(false);
  };
  return (
    <div className="mobile-lg:display-flex flex-justify border-top-1px border-base-light padding-y-3 desktop:display-none">
      <Button
        className="float-left clearfix height-6"
        outline="true"
        onClick={handleBackButtonClick}
      >
        Back
      </Button>
        <Button
          type="button"
          className="clearfix width-card height-6 font-sans-md"
          onClick={handlePreviewData}
          disabled={!dataType}
        >
          Preview Data
        </Button>
      <Button
        type="button"
        outline="true"
        className="float-left clearfix height-6"
        onClick={handleClearAll}
        disabled={!dataType}
      >
        Clear All
      </Button>
    </div>
  );
};

export default MobileMenu;
