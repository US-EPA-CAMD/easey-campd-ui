import React from "react";
import Footer from "../Footer/Footer";
import WideHeader from "../WideHeader/WideHeader";
import SubHeader from "../SubHeader/SubHeader";
import "./Layout.scss";

const Layout = (props) => {
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child)
  );
  return (
    <div className="react-transition fade-in">
      <div className="topHeader">
        <WideHeader />
        <SubHeader />
      </div>
      <div className="mainContent" role="main">{childrenWithProps}</div>
      <div className="bottomFooter">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
