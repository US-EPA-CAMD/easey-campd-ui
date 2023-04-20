import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';

import setApiError from '../../store/actions/setApiErrorAction';
import getContent from "../../utils/api/getContent";
import Markdown from "../Markdown/Markdown";

const SubHeaderInfo = ({setApiErrorDispatcher}) =>{
  const [mainTitle, setMainTitle] = useState();
  const [mainContent, setMainContent] = useState();

  useEffect(() => {
    getContent("/campd/home/main-title.md", setApiErrorDispatcher).then((resp) =>
      resp && setMainTitle(resp.data)
    );
    getContent("/campd/home/main-content.md", setApiErrorDispatcher).then((resp) =>
      resp && setMainContent(resp.data)
    );//eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid-row mobile-lg:margin-y-1 desktop:margin-y-3">
      <div
        className="mobile-lg:grid-col-auto desktop:grid-col-8 desktop-lg:grid-col-7 widescreen:grid-col-6 display-block bg-primary-darker"
        id="main-content"
      >
        <Markdown h2Mode="subTitle">{mainTitle}</Markdown>
        <div className="margin-left-4 width-15 height-05 bg-accent-cool" />
        <Markdown
          className="link-accent-cool font-sans-md text-white text-wrap padding-4 margin-0 text-accent-cool-lighter text-ls-1 line-height-sans-6"
        >
          {mainContent}
        </Markdown>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({setApiErrorDispatcher: (api, state, errorMessage) => dispatch(setApiError(api, state, errorMessage))});

export default connect(null, mapDispatchToProps)(SubHeaderInfo);
