import React, { useEffect, useState} from 'react';
import ReactMarkdown from "react-markdown";
import Markdown from 'react-markdown-v4';
import remarkGfm from "remark-gfm";
import remarkSubSuper from 'remark-sub-super';
import getContent from "../../utils/api/getContent";

const SubHeaderInfo = () =>{
  const [mainTitle, setMainTitle] = useState();
  const [mainContent, setMainContent] = useState();

  useEffect(() => {
    getContent("/campd/home/main-title.md").then((resp) =>
      setMainTitle(resp.data)
    );
    getContent("/campd/home/main-content.md").then((resp) =>
      setMainContent(resp.data)
    );
  }, []);

  return (
    <div className="grid-row mobile-lg:margin-y-1 desktop:margin-y-3">
      <div
        className="mobile-lg:grid-col-auto desktop:grid-col-8 desktop-lg:grid-col-7 widescreen:grid-col-6 display-block bg-primary-darker"
        id="main-content"
      >
        <ReactMarkdown
          children={mainTitle}
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ node, ...props }) => (
              <h2 className="font-sans-xl text-white text-bold text-wrap padding-4 margin-0 text-accent-cool-lighter">
                {props.children}
              </h2>
            ),
          }}
        />
        <div className="margin-left-4 width-15 height-05 bg-accent-cool" />
        <Markdown
          className="font-sans-md text-white text-wrap padding-4 margin-0 text-accent-cool-lighter text-ls-1 line-height-sans-6"
          source={mainContent}
          escapeHtml={false}
          plugins={[remarkSubSuper, remarkGfm]}
          renderers={{
            sub: "sub",
            sup: "sup"
          }}
        />
      </div>
    </div>
  );
}

export default SubHeaderInfo;
