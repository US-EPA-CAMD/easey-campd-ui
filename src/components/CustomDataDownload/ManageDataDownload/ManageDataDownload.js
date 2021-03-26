import React from "react";
import { useHistory } from "react-router-dom";

const ManageDataDownload = (props) => {
    const history = useHistory();
    if(props.location.state===undefined){
        history.push("/");
        return null;
    }
    return (
        <>
            <p style={{marginLeft:"30px"}}>Selected data type is: {props.location.state.selectedDataType}</p>
        </>
    );
};

export default ManageDataDownload;
