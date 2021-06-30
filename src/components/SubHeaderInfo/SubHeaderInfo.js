import React from 'react';

const SubHeaderInfo = () =>{
  return (
    <div className="grid-row mobile-lg:margin-y-1 desktop:margin-y-3">
      <div className="mobile-lg:grid-col-auto desktop:grid-col-8 desktop-lg:grid-col-7 widescreen:grid-col-6 display-block bg-primary-darker">
        <h2 className="font-heading-xl text-white text-bold text-wrap padding-4 margin-0 text-accent-cool-lighter">
          Your resource for emissions, compliance, and allowance data.
        </h2>
        <div className="margin-left-4 width-15 height-05 bg-accent-cool" />
        <p className="font-body-md text-white text-wrap padding-4 margin-0 text-accent-cool-lighter text-ls-1 line-height-sans-6">
          The EPA collects CO2, NOX, SO2, and mercury emissions data from electricity generating units (EGUs)
          to ensure compliance with a variety of federal air quality programs. CAMPD is your one-stop shop for
          the emissions, compliance, allowance, and facility attributes data that is gathered under these programs.
        </p>
      </div>
    </div>
  );
}

export default SubHeaderInfo;
