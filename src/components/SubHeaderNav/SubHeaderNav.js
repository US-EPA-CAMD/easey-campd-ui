import React from 'react';
import {
  NavDropDownButton,
  PrimaryNav,
  Menu,
  Link,
} from '@trussworks/react-uswds';

import config from '../../config';

const SubHeaderNav = ({
  handleSubMenuClick,
  categorySelected,
  menuList,
  navDropdownOpen,
  handleToggleNavDropdown,
  isUtility = false}
) => {

  return (
    <PrimaryNav
      items={menuList.map((el, i) => {
        if (i === 0) {
          return (
            <>
              <a
                href={config.app.path}
                title={el.label}
                aria-label={el.label}
                onClick={() => handleSubMenuClick(i)}
              >
                {el.label}
              </a>
              {categorySelected[i] === true ? (
                <div className="menu-underline" />
              ) : null}
            </>
          );
        } else {
          return (
            <>
              <NavDropDownButton
                key={i}
                label={el.label}
                menuId={`menu-${el.label}`}
                isOpen={navDropdownOpen[i]}
                onToggle={() => {
                  handleToggleNavDropdown(i);
                }}
              />
              <Menu
                id={
                  i === menuList.length - 1
                    ? `extended-nav-section-last`
                    : null
                }
                className="font-body-xs"
                items={el.items.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    onClick={() => handleSubMenuClick(i)}
                  >
                    {item.menu}
                  </Link>
                ))}
                isOpen={navDropdownOpen[i]}
              />
              {categorySelected[i] === true ? (
                <div className="menu-underline" />
              ) : null}
            </>
          );
        }
      })}
    />
  );
};
export default SubHeaderNav;
