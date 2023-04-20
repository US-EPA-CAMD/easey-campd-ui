import React from "react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { Button, Link } from "@trussworks/react-uswds";

const renderH1 = () => {
  return ({ node, ...props }) => {
    return <h1 className="margin-0 text-bold font-sans-2xl">{props.children}</h1>
  }
}

const renderH2 = (mode) => {
  return ({ node, ...props }) => {
    if (mode === "subTitle") {
      return (
        <h2 className="font-sans-xl text-white text-bold text-wrap padding-4 margin-0 text-accent-cool-lighter">
          {props.children}
        </h2>
      )
    }

    return <h2>{props.children}</h2>
  }
}

const renderUL = () => {
  return ({ node, ...props }) => {
    return <ul className="padding-left-3">{props.children}</ul>
  }
}

const renderImg = (id, alt) => {
  return ({ node, ...props }) => {
    return <img {...props} id={id} alt={alt ?? id}/>
  }
}

const renderTable = () => {
  return ({ node, ...props }) => {
    delete props.isHeader;
    return <table {...props} role="Presentation" />
  }
}

const renderTableHead = () => {
  return ({ node, ...props }) => {
    delete props.isHeader;
    return <td {...props} />
  }
}

const renderLink = (history) => {
  return ({ node, ...props }) => {
    switch(node.properties.title) {
      case "Header Link":
        return (
          <h2>
            <Button
              className="header-link font-heading-xl text-bold"
              unstyled="true"
              onClick={() => history.push(props.href)}
            >
              {props.children[0]}
            </Button>
          </h2>
        )
      case "Button Link":
        return (
          <Button
            className="margin-top-2"
            type="button"
            onClick={() => history.push(props.href)}
            role="link"
            rel={"Data"}
            title={props.children[0]}
          >
            {props.children[0]}
          </Button>
        )
      default:
        return (
          <Link className="usa-link"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        )
    }
  }
}

export const Markdown = (props) => {
  return(
    <ReactMarkdown
      className={props.className}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={{
        a: renderLink(props.history),
        h1: renderH1(),
        h2: renderH2(props.h2Mode),
        th: renderTableHead(),
        ul: renderUL(),
        img: renderImg(props.imgId, props.imgAlt),
        table: renderTable(),
      }}
    >
      {props.children}
    </ReactMarkdown>
  );
}

export default Markdown;