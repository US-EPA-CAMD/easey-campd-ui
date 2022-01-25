import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@trussworks/react-uswds';
import getContent  from '../../utils/api/getContent';
import config from "../../config";

import { metaAdder } from '../../utils/document/metaAdder';
import "./GlossaryPage.scss";

const GlossaryPage = () => {
  const [mainContent, setMainContent] = useState(null);

  useEffect(() => {
    getContent('/campd/resources/glossary/index.md').then(resp => setMainContent(resp.data));
    document.title = 'Glossary | CAMPD | US EPA';
  }, []);

  metaAdder(
    'description',
    'The glossary provides a list of all data elements available through CAMPD.'
  );
  metaAdder(
    'keywords',
    'Dictionary, data label, CAMPD APIs, JSON, glossary, excel file, column headings, definitions'
  );

  return (
    <div
      id="glossary-page"
      className="padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <ReactMarkdown
        className="main-content margin-bottom-5"
        children={mainContent}
        remarkPlugins={[remarkGfm]}
      />
      <Button className='display-block margin-y-2' onClick={()=>window.open(`${config.services.content.uri}/campd/resources/glossary/CAMPD-Glossary.xlsx`, "_blank")}>
        Download Glossary (XLSX)
      </Button>
      <Button className='display-block margin-y-2' onClick={()=>window.open(`${config.services.content.uri}/campd/resources/glossary/CAMPD-Glossary.pdf`, "_blank")}>
        Download Glossary (PDF)&nbsp;&nbsp;
      </Button>
    </div>
  );
};

export default GlossaryPage;
