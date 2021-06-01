import { Button, Menu as UswdsMenu, Link } from '@trussworks/react-uswds';
import React, { useState } from 'react';

import './Menu.scss';
import { collapsableFooterTopics } from './menuTopics';

const Menu = () => {
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
        onClick={toggleMenu}
        title={!showMenuOptions ? 'collapsable' : 'close'}
        className="menuBtn"
        aria-haspopup="true"
        aria-labelledby={!showMenuOptions ? 'collapsable' : 'close'}
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
        <UswdsMenu className="menuContent" items={menuCreation} isOpen="true" />
      </div>
    </>
  );
};

export default Menu;
