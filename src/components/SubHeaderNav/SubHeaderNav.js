import React, { useEffect, useState } from 'react';
import {
  NavDropDownButton,
  PrimaryNav,
  Menu,
  Link,
} from '@trussworks/react-uswds';

const SubHeaderNav = ({
  pathname,
  menuList,
  navDropdownOpen,
  handleToggleNavDropdown,
  initialCategorySelected,
  isUtility = false,
}) => {
  useEffect(() => {
    setCategorySelected(initialCategorySelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const [categorySelected, setCategorySelected] = useState(initialCategorySelected);

  const handleSubMenuClick = (column, isUtility) => {
    handleToggleNavDropdown(column, isUtility);

    setCategorySelected(initialCategorySelected);
  };

  const utilityStyle = isUtility ? { fontSize: '11px'} : null

  return (
    <PrimaryNav
      items={menuList.map((el, i) => {
        if (el.items.length === 1 && el.items[0].menu === 'notMenu') {
          return (
            <>
              <Link
                href={el.items[0].link}
                title={el.label}
                aria-label={el.label}
                style={utilityStyle}
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
                style={utilityStyle}
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
                className="font-body-xs margin-top-neg-1"
                items={el.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    style={utilityStyle}
                    variant="nav"
                    onClick={() => handleSubMenuClick(i, isUtility)}
                  >
                    {item.menu}
                  </Link>
                ))}
                isOpen={navDropdownOpen[i]}
              />
              {isUtility && (
                <span className="utility-divider" />
              )}
              {categorySelected[i] === true && !isUtility ? (
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
