import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const ManageDataDownloadRoute = ({component: Component, selectedDataType, ...rest}) =>{
  return (
    <Route {...rest} render={(props) => (
      selectedDataType!==null
      ? <Component {...props}/>
      : <Redirect to='/select-data-type'/>
    )}/>
  )
};

const mapStateToProps = (state) => {
  return {
    selectedDataType: state.customDataDownload.dataType
  };
};

export default connect(mapStateToProps, null)(ManageDataDownloadRoute);
