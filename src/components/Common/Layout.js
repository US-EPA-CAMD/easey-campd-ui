import React from "react";
import Footer from "./Footer/Footer";
import "../Common/style.css";
import WideHeader from "./WideHeader/WideHeader";
import SubHeader from "./SubHeader/SubHeader";
import "./Layout.css";


const Layout = (props) => {
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child)
  );
  return (
    <div>
      <div className="topHeader">
        <WideHeader />
        <SubHeader/>
      </div>
      <div className="mainContent">{childrenWithProps}</div>
      <div className="bottomFooter">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
