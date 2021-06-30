import { Button, Menu as UswdsMenu, Link } from '@trussworks/react-uswds';
import React, { useState } from 'react';
import {handleTabfocus} from "../../utils/selectors/general";

import './FooterMenu.scss';
import { collapsableFooterTopics } from '../../utils/constants/menuTopics';

const FooterMenu = () => {
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const toggleMenu = () => {
    if (!showMenuOptions) {
      setShowMenuOptions(true);
    } else {
      setShowMenuOptions(false);
    }
  };

  const menuCreation = collapsableFooterTopics.map((value) => {
    return (
      <Link
        href={value.link}
        target="_blank"
        rel="noopener noreferrer"
        id={`${value.name.replace(/\s/g, '')}Link`}
        aria-labelledby={`${value.name.replace(/\s/g, '')}Link`}
        title={value.name}
      >
        {value.name}
      </Link>
    );
  });

  return (
    <>
      <Button
        onFocus={handleTabfocus}
        onClick={toggleMenu}
        title={!showMenuOptions ? 'collapsable' : 'close'}
        className="menuBtn padding-0 margin-0 float-right opacity-100 border-primary"
        id={!showMenuOptions ? 'collapsable' : 'close'}
        aria-expanded="false"
        aria-haspopup="true"
        aria-labelledby={!showMenuOptions ? 'collapsable' : 'close'}
        aria-label="Secondary Menu"
      >
        {showMenuOptions ? (
          <b className="fa fa-times fa-sm" />
        ) : (
          <b className="fa fa-bars" />
        )}
      </Button>
      <div
        aria-labelledby="menuContent"
        className={showMenuOptions ? 'menuOn' : 'menuOff'}
      >
        <UswdsMenu
          className="menuContent bg-base-lightest float-right position-absolute height-15 z-auto text-left text-semibold font-sans-sm"
          items={menuCreation}
          isOpen="true"
        />
      </div>
    </>
  );
};

export default FooterMenu;
