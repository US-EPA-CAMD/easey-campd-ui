import React, { useEffect, useCallback } from "react";
import { AccordionMenu } from "@us-epa-camd/easey-design-system";
import "./SubHeaderNavMobile.scss";

const SubHeaderNavMobile = ({
  showMobileMenu,
  subHeaderMenuList,
  subHeaderUtilityList,
  pathname,
}) => {
  const populateItems = useCallback(() => {
    const combinedMenu = [subHeaderMenuList, subHeaderUtilityList].flat();
    return combinedMenu.map((el, i) => {
      if (el.items.length === 1 && el.items[0].menu === "notMenu") {
        return {
          current: pathname === el.items[0].link,
          href: el.items[0].link,
          id: i,
          label: el.label,
        };
      } else {
        return {
          current: el.items.filter((d) => d.link === pathname).length > 0,
          expanded: false,
          id: i,
          label: el.label,
          subItems: el.items.map((e, i) => {
            return {
              current: pathname === e.link,
              //href: e.link === "#" ? null : `${window.location.origin}${e.link}`,
              href: e.link === "#" ? null : e.link,
              id: e.menu,
              label: e.menu,
            };
          }),
        };
      }
    });
  }, [pathname, subHeaderMenuList, subHeaderUtilityList]);

  useEffect(() => {
    if (!showMobileMenu) return;

    const items = populateItems();
    const links = document.querySelectorAll("#mobile-accordion-menu a");

    links.forEach((link, index) => {
      if (!items[index].subItems) {
        const svg = link.querySelector("svg");
        link.removeChild(svg);
      }
    });
  }, [showMobileMenu, populateItems]);

  return (
    <>
      {showMobileMenu && (
        <div id="mobile-accordion-menu" className="margin-top-2">
          <AccordionMenu items={populateItems()} />
        </div>
      )}
    </>
  );
};
export default SubHeaderNavMobile;
