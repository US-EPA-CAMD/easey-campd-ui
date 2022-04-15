import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  NavDropDownButton,
  PrimaryNav,
  Menu,
} from '@trussworks/react-uswds';

import './SubHeaderNav.scss';
import { useClickOutside } from 'react-click-outside-hook'


const SubHeaderNav = ({
  pathname,
  menuList,
  navDropdownOpen,
  handleToggleNavDropdown,
  handleCloseNavDropdown,
  initialCategorySelected,
  isUtility = false,
}) => {
  useEffect(() => {
    setCategorySelected(initialCategorySelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const [categorySelected, setCategorySelected] = useState(initialCategorySelected);
  // const navRef = useClickOutClose(()=>handleCloseNavDropdown(isUtility))
  const [ref, hasClickedOutside] = useClickOutside()

  const handleSubMenuClick = (column) => {
    handleToggleNavDropdown(column, isUtility);

    setCategorySelected(initialCategorySelected);
  };
  useEffect(() => {
    if(hasClickedOutside) {
      handleCloseNavDropdown(isUtility)
    }//eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasClickedOutside])

  return (
    <span ref={ref}>
    <PrimaryNav
      items={menuList.map((el, i) => {
        if (el.items.length === 1 && el.items[0].menu === 'notMenu') {
          return (
            <>
              <Link
                to={el.items[0].link}
                title={el.label}
                aria-label={el.label}
                className={`is-utility-${isUtility}`}
              >
                {el.label}
              </Link>
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
                className={`is-utility-${isUtility}`}
                menuId={`menu-${el.label}`}
                isOpen={navDropdownOpen[i]}
                onToggle={() => {
                  handleToggleNavDropdown(i, isUtility);
                }}
              />
              <Menu
                id={
                  i === menuList.length - 1 ? `extended-nav-section-last` : null
                }
                className="font-sans-xs margin-top-neg-1"
                items={el.items.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    target={item.link.pathname ? "_blank" : null}
                    className={`is-utility-${isUtility}`}
                    onClick={() => handleSubMenuClick(i)}
                  >
                    {item.menu}
                  </Link>
                ))}
                isOpen={navDropdownOpen[i]}
              />
              {isUtility && (i !== menuList.length - 1) ? (
                <span className="utility-divider" />
              ) : null}
              {categorySelected[i] === true && !isUtility ? (
                <div className="menu-underline" />
              ) : null}
            </>
          );
        }
      })}
    /></span>
  );
};
export default SubHeaderNav;
