import React, { useEffect, useState } from 'react';
import {
  NavDropDownButton,
  PrimaryNav,
  Menu,
  Link,
} from '@trussworks/react-uswds';

const SubHeaderNav = ({
  pathname,
  cddPath,
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

  const handleSubMenuClick = (column) => {
    handleToggleNavDropdown(column);

    setCategorySelected(initialCategorySelected);
  };

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
                style={isUtility ? { fontSize: '11px'} : null}
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
                style={isUtility ? { fontSize: '11px' } : null}
                menuId={`menu-${el.label}`}
                isOpen={navDropdownOpen[i]}
                onToggle={() => {
                  handleToggleNavDropdown(i);
                }}
              />
              <Menu
                id={
                  i === menuList.length - 1 ? `extended-nav-section-last` : null
                }
                className="font-body-xs"
                items={el.items.map((item, index) => (
                  <Link
                    key={index}
                    style={isUtility ? { fontSize: '11px' } : null}
                    href={item.link}
                    variant="nav"
                    onClick={() => handleSubMenuClick(i)}
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
