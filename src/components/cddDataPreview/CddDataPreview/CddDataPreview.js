import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Button, Alert, Link } from '@trussworks/react-uswds';
import { Help } from '@material-ui/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { ModalToggleButton, Modal, ModalHeading, ModalFooter } from '@trussworks/react-uswds';
import { createBookmark } from '../../../utils/api/camdApi';
import DataPreview from '../DataPreview/DataPreview';
import FilterTags from '../../FilterTags/FilterTags';
import { isAddedToFilters, formatBookmarkDate, getBookmarkContent, initcap } from '../../../utils/selectors/general';
import { engageFilterLogic } from '../../../utils/selectors/filterLogic';
import {
  resetDataPreview,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import {
  resetFilter,
  updateTimePeriod,
  updateFilterCriteria,
} from '../../../store/actions/customDataDownload/filterCriteria';
import hideNav from '../../../store/actions/hideNavAction';
import { EMISSIONS_DATA_SUBTYPES } from '../../../utils/constants/emissions';
import { ALLOWANCES_DATA_SUBTYPES } from '../../../utils/constants/allowances';
import { COMPLIANCES_DATA_SUBTYPES } from '../../../utils/constants/compliances';
import { FACILITY_DATA_SUBTYPES } from '../../../utils/constants/facility';
import { MATS_DATA_SUBTYPES } from '../../../utils/constants/mats';
import { FILTERS_MAP } from "../../../utils/constants/customDataDownload";
import Tooltip from '../../Tooltip/Tooltip';
import config from "../../../config";
import getContent  from '../../../utils/api/getContent';
import MatsDataCaveat from '../../customDataDownload/MatsDataCaveat/MatsDataCaveat';
import "./CddDataPreview.scss";
import setApiError from '../../../store/actions/setApiErrorAction';
import ApiErrorAlert from '../../ApiErrorAlert/ApiErrorAlert';

const CddDataPreview = ({
  aggregation,
  dataType,
  dataSubType,
  appliedFilters,
  displayMobileDataType,
  setDisplayMobileDataType,
  timePeriod,
  handleFilterButtonClick,
  handleMobileFiltersButtonClick,
  hideNav,
  hideNavDispatcher,
  resetDataPreviewDispatcher,
  resetFiltersDispatcher,
  removeAppliedFiltersDispatcher,
  updateTimePeriodDispatcher,
  filterCriteria,
  updateFilterCriteriaDispatcher,
  renderPreviewData,
  setRenderPreviewData,
  handlePreviewDataButtonClick,
  isMobileOrTablet,
  totalCount,
  dataPreview,
  removedAppliedFilter,
  setRemovedAppliedFilter,
  setApiErrorDispatcher,
  setApplyFilterLoading,
}) => {
  const [requirementsMet, setRequirementsMet] = useState(false);
  const [helperText, setHelperText] = useState(null);
  const [limitAlert, setLimitAlert] = useState(null);
  const [apiErrorAlert, setApiErrorAlert] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [bookmark, setBookmark] = useState(null);
  const [modalFocus, setModalFocus] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    getContent('/campd/data/custom-data-download/helper-text.md', setApiErrorDispatcher).then(resp => setHelperText(resp?.data));
    getContent('/campd/data/custom-data-download/api-error-alert.md', setApiErrorDispatcher).then(resp => setApiErrorAlert(resp?.data));
    getContent('/campd/data/custom-data-download/download-limit-alert.md', setApiErrorDispatcher).then(
      (resp) => {
        if (resp){
          let limitText = resp.data;
          if (limitText.includes('[limit-configuration]')) {
            limitText = limitText.replace(
              '[limit-configuration]',
              parseInt(config.app.streamingLimit).toLocaleString()
            );
          }
          setLimitAlert(limitText);
        }
      }
    );//eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    if(dataPreview){
      resetDataPreviewDispatcher()
      setRenderPreviewData({
        display: false,
        dataType,
        dataSubType,
      });
    }// eslint-disable-next-line
  }, [aggregation])
  useEffect(() => {
    if (
      dataType &&
      dataSubType &&
      dataSubType !== '' &&
      contains()
    ) {
      setRequirementsMet(true);
    } else {
      setRequirementsMet(false);
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataType, dataSubType, appliedFilters]);

  useEffect(()=>{
    if(removedAppliedFilter !== null){
      if(filterCriteria.filterMapping.length>0){
        engageFilterLogic(dataType, dataSubType, removedAppliedFilter, JSON.parse(JSON.stringify(filterCriteria)), updateFilterCriteriaDispatcher, setApplyFilterLoading, true);
      }
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[appliedFilters]);


  useEffect(() => {
    if (!isMobileOrTablet) {
      hideNavDispatcher(false);
    } else {
      if (displayMobileDataType) {
        hideNavDispatcher(true);
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileOrTablet]);

  useEffect(()=>{
    if(bookmark !==null && dataPreview === null){
      setBookmark(null);
    }// eslint-disable-next-line
  },[dataPreview])

  const handleUpdateInAppliedFilters = () => {
    resetDataPreviewDispatcher();
    setRenderPreviewData({
      display: false,
      dataType: '',
      dataSubType: '',
    });
  };

  const onFilterTagRemovedHandler = (filterType, label) => {
    setApplyFilterLoading(true);
    if (filterType === 'Time Period' || filterType === "Transaction Date") {
      if(label === "Operating Hours Only"){
        updateTimePeriodDispatcher({
          startDate: timePeriod.startDate,
          endDate: timePeriod.endDate,
          opHrsOnly: false,
          comboBoxYear: []
        });
        removeAppliedFiltersDispatcher(filterType, false, true);
      }else{
        if(window.confirm(`Removing ${dataSubType==="Transactions"? "transaction date":"time period"} will clear out previously selected criteria. Do you want to proceed?`)){
          resetFiltersDispatcher(null, true);
          removeAppliedFiltersDispatcher(null, true);
        }
      }
    } else {
      resetFiltersDispatcher(filterType);
      removeAppliedFiltersDispatcher(filterType);
      setRemovedAppliedFilter(filterType);
      if(filterType){
        setApplyFilterLoading(true);
      }
    }
    handleUpdateInAppliedFilters();
    setTimeout(() => {setApplyFilterLoading(false)})
  };

  const onFilterTagClearAllHandler = () => {
    const filter = document.getElementById('filter0');
    resetFiltersDispatcher(null, true);
    removeAppliedFiltersDispatcher(null, true);
    handleUpdateInAppliedFilters();
    window.alert('Filters have been successfully cleared.');
    filter && filter.focus();
  };

  const contains = () => {
    const mapRequiredFilters = {
      EMISSIONS: EMISSIONS_DATA_SUBTYPES,
      ALLOWANCE: ALLOWANCES_DATA_SUBTYPES,
      COMPLIANCE: COMPLIANCES_DATA_SUBTYPES,
      FACILITY: FACILITY_DATA_SUBTYPES,
      "MERCURY AND AIR TOXICS EMISSIONS": MATS_DATA_SUBTYPES,
    };
    const subTypes = mapRequiredFilters[dataType] || null;
    if (!subTypes) {
      return false;
    }
    const index = subTypes.filter((el) => el.label === dataSubType);
    if (index.length === 0) {
      return false;
    }

    const search =
      index[0].required[0] === 'none'
        ? [true]
        : index[0].required.map((el) =>
            isAddedToFilters(el, appliedFilters)
          );
    return appliedFilters.length > 0 && search.indexOf(false) === -1;
  };

  const createBookmarkHandler = () =>{
    const content = getBookmarkContent(dataType, dataSubType, aggregation, FILTERS_MAP[dataType][dataSubType], filterCriteria);
    if(bookmark === null){
      createBookmark(content)
      .then(res=>{
        setBookmark({
          id: res.data.bookmarkId,
          dateCreated: formatBookmarkDate(new Date(res.data.bookmarkAddDate)),
          dataType: initcap(content.dataType),
          dataSubType: content.dataSubType,
          url: `${window.location.href}?bookmarkId=${res.data.bookmarkId}`
        });
        navigator.clipboard.writeText(`${window.location.href}?bookmarkId=${res.data.bookmarkId}`);
        modalRef.current.toggleModal(null, true);
      })
      .catch(err=>{
        console.error(err);
      });
    }else{
      navigator.clipboard.writeText(`${window.location.href}?bookmarkId=${bookmark.id}`);
      modalRef.current.toggleModal(null, true);
    }
  };
  const dataPreviewActiveAndRequirementsMet = dataPreview && requirementsMet;
  
  return (
    <div className="width-full" id="cdd-data-preview">
      <div className={`${isMobileOrTablet && renderPreviewData.display? 'display-none': 'desktop:display-flex flex-row flex-justify bg-base-lightest desktop:padding-x-3 minh-10 padding-0'}`} >
        <div className="tablet:display-flex tablet:flex-row tablet:flex-justify tablet:width-full">
          <h2 className="flex-align-self-center font-sans-xl text-bold margin-0 padding-x-2 tablet:padding-x-4 desktop:padding-x-0">
            Custom Data Download
          </h2>
          <div className='desktop:display-flex desktop:flex-row desktop:flex-justify-end'>
          {!isMobileOrTablet &&
            <div className={`flex-align-self-center padding-0${dataPreviewActiveAndRequirementsMet? '': ' display-none'}`}>
              {!hideNav && (
                <Tooltip
                  content="Bookmark button will be disabled until query is previewed."
                  field="Bookmark"
                >
                  <Help
                    className="text-primary desktop-lg:margin-bottom-2 desktop-lg:margin-left-2"
                    fontSize="small"
                  />
                </Tooltip>
              )}
              <Button
                type="button"
                className="clearfix width-card height-6 font-sans-md margin-left-1 margin-2 desktop:margin-0 desktop:margin-left-1"
                disabled={dataPreview===null || !requirementsMet}
                onClick={()=>createBookmarkHandler()}
              >
                Bookmark
              </Button>
            </div>
          }
          <div className="flex-align-self-center padding-0 desktop:padding-right-4 widescreen:padding-right-10">
            {!hideNav && (
              <Tooltip
                content={!requirementsMet ? "Preview button will be disabled until at least one filter is selected." : "Preview the first 100 rows of your query here."}
                field="Preview Data"
              >
                <Help
                  className="text-primary desktop-lg:margin-bottom-2 desktop-lg:margin-left-2"
                  fontSize="small"
                />
              </Tooltip>
            )}
            <Button
              type="button"
              className="clearfix width-card height-6 font-sans-md margin-left-1 margin-2 desktop:margin-0 desktop:margin-left-1"
              id='previewDataButton'
              disabled={!requirementsMet}
              onClick={handlePreviewDataButtonClick}
            >
              Preview Data
            </Button>
          </div>
          </div>
        </div>
        <div className={"margin-0 padding-y-2 padding-x-2 tablet:padding-left-4 desktop:padding-2 tablet:display-flex desktop:display-none width-full bg-base-lighter"}>
          <Button
            type="button"
            className="usa-button margin-y-1 desktop:display-none width-full height-6"
            id='dataTypeButton'
            onClick={() => {
              setDisplayMobileDataType(true);
              hideNavDispatcher(true);
            }}
          >
            Data Type
          </Button>
          <Button
            type="button"
            className="usa-button margin-y-1 desktop:display-none width-full height-6"
            id='filtersButton'
            disabled={!dataType || !dataSubType}
            onClick={() => {
              setDisplayMobileDataType(true)
              handleMobileFiltersButtonClick()}}
          >
            Filters {appliedFilters.length? `(${appliedFilters.length})`: ''}
          </Button>
        </div>
      </div>
      <>
        <Modal
          onFocus={()=>setModalFocus(!modalFocus)}
          ref={modalRef}
          id="bookmark-modal"
          aria-labelledby="bookmark-modal-heading"
          aria-describedby="bookmark-modal-description"
        >
          <ModalHeading id="bookmark-modal-heading">
            Bookmark created
          </ModalHeading>
          <div className="usa-prose" id="bookmark-modal-description">
            <p>
              {`${bookmark?.dataType}, ${bookmark?.dataSubType}`}
            </p>
            <p>
              {`Created: ${bookmark?.dateCreated}`}
            </p>
            <p>Bookmark has been successfully copied to the clipboard.</p>
            <p>
              Bookmark Link:
              {// eslint-disable-next-line
              <a className='display-block' href={bookmark?.url} target="_blank" rel="noopener noreferrer">{bookmark?.url}</a>}
            </p>
          </div>
          <ModalFooter>
            <ModalToggleButton
              className="float-left"
              modalRef={modalRef}
              closer
            >
              Ok
            </ModalToggleButton>
          </ModalFooter>
        </Modal>
      </>
      {appliedFilters.length > 0 && (
        <div className="display-none desktop:display-block">
          <div className="bg-base-lightest padding-left-3 padding-right-3 padding-bottom-2 font-sans-sm">
            <FilterTags
              dataType={dataType}
              items={appliedFilters}
              onClick={(filterType, evtTarget) =>
                handleFilterButtonClick(filterType, evtTarget)
              }
              onRemove={(filterType, filterTag) =>
                onFilterTagRemovedHandler(filterType, filterTag)
              }
              onClearAll={() => onFilterTagClearAllHandler()}
            />
          </div>
        </div>
      )}
      <ApiErrorAlert parentComponentPath={'/data/custom-data-download'}/>
      {requirementsMet && totalCount !== null && Number(totalCount) > Number(config.app.streamingLimit) && (
        <div className='padding-x-2 padding-top-3 margin-right-2'>
          <Alert type="warning" aria-live="assertive" headingLevel="h4">
            <ReactMarkdown
              children={limitAlert}
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, ...props }) => (
                  <Link {...props} target="_blank" rel="noopener noreferrer" />
                ),
                p: "span"
              }}
            />
          </Alert>
        </div>
      )}
      {renderPreviewData.dataType === 'MERCURY AND AIR TOXICS EMISSIONS' && renderPreviewData.display && (
        <div className="margin-2 margin-bottom-0 padding-right-2">
          <MatsDataCaveat
          styling={'alert-wrapper usa-alert--warning font-sans-3xs desktop:line-height-sans-2'}
          ></MatsDataCaveat>
        </div>
      )}
      {apiError ? (
      <div className='padding-x-3 padding-top-3'>
        <Alert type="warning" aria-live="assertive" headingLevel="h4" >
          <ReactMarkdown children={apiErrorAlert} remarkPlugins={[remarkGfm]}
          components={{
            p: ({node, ...props}) => <span>{props.children}</span>,
          }}
          />
        </Alert>
      </div>
      ) : null}
      {renderPreviewData.display ? (
        <DataPreview
          handleUpdateInAppliedFilters={handleUpdateInAppliedFilters}
          createBookmarkHandler={createBookmarkHandler}
          setApiError={setApiError}
        />
      ) : (
        <div className="desktop:margin-3 tablet:margin-x-10 flex-justify-center padding-3 tablet:border mobile-lg:width-mobile-lg line-height-sans-5 margin-0 tablet:margin-3">
          <ReactMarkdown
            className="helper-text"
            children={helperText}
            remarkPlugins={[remarkGfm]}
            components={{
              h3: ({node, ...props}) => <h3 className="font-sans-lg margin-top-0">{props.children}</h3>,
              a: ({node, ...props}) => <Link {...props} target="_blank" rel="noopener noreferrer" />,
              // eslint-disable-next-line
              img: ({node, ...props}) => <img {...props}/>
            }}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
    aggregation: state.customDataDownload.aggregation,
    appliedFilters: state.customDataDownload.appliedFilters,
    totalCount: state.customDataDownload.totalCount,
    dataPreview: state.customDataDownload.dataPreview,
    timePeriod: state.filterCriteria.timePeriod,
    filterCriteria: state.filterCriteria,
    hideNav: state.hideNav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideNavDispatcher: (boolean) => dispatch(hideNav(boolean)),
    resetDataPreviewDispatcher: () => dispatch(resetDataPreview()),
    removeAppliedFiltersDispatcher: (removedFilter, removeAll, opHours) =>
      dispatch(removeAppliedFilter(removedFilter, removeAll, opHours)),
    resetFiltersDispatcher: (filterToReset, resetAll) =>
      dispatch(resetFilter(filterToReset, resetAll)),
    setApiErrorDispatcher: (api, state, errorMessage) =>
      dispatch(setApiError(api, state, errorMessage)),
    updateTimePeriodDispatcher: (timePeriod) =>
      dispatch(updateTimePeriod(timePeriod)),
    updateFilterCriteriaDispatcher: (filterCriteria) =>
      dispatch(updateFilterCriteria(filterCriteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CddDataPreview);
