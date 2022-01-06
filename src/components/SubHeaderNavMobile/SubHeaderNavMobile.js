import React, { useEffect } from 'react';
import { AccordionMenu } from '@us-epa-camd/easey-design-system';
import "./SubHeaderNavMobile.scss";

const SubHeaderNavMobile = ({
  showMobileMenu,
  subHeaderMenuList,
  subHeaderUtilityList,
  pathname
}) => {
  useEffect(()=>{
    if(showMobileMenu){
      const homeAnchorMenu = document.getElementById("mobile-accordion-menu").getElementsByTagName('a')[0];
      const homeSvgIcon = document.getElementById("mobile-accordion-menu").getElementsByTagName('svg')[0];
      homeAnchorMenu.removeChild(homeSvgIcon);
    }
  },[showMobileMenu]);

  const populateItems = () =>{
    const combinedMenu = [subHeaderMenuList, subHeaderUtilityList].flat();
    return combinedMenu.map((el, i)=>{
      if(el.label === "HOME"){
        return {
          current: pathname === "/",
          href: "/",
          id: i,
          label: el.label,
        }
      }else{
        return {
          current: el.items.filter(d => d.link === pathname).length > 0,
          expanded: false,
          id: i,
          label: el.label,
          subItems: el.items.map((e, i)=>{
            return {
              current: pathname === e.link,
              //href: e.link === "#" ? null : `${window.location.origin}${e.link}`,
              href: e.link === "#" ? null : e.link,
              id: e.menu,
              label: e.menu
            }
          })
        }
      }
    });
  }

  return (
    <>
      {showMobileMenu &&
        <div id="mobile-accordion-menu" className='margin-top-2'>
          <AccordionMenu
            items={populateItems()}
          />
        </div>
      }
    </>
  )
};
export default SubHeaderNavMobile;
