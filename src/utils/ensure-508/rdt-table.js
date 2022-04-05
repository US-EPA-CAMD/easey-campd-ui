/*****************************************************
 * ensure508:
 *
 *   This is the "parent" function (i.e., it calls individual standalone functions),
 *   used to make sure all input present on the screen is in 508 complaint format
 *
 *       Inputs:
 *              triggerAddAriaLabelToDatatable - flag whether or not it will use addAriaLabelToDatatable()
 *       Outputs:
 *              none
 *****************************************************/
 export const ensure508 = (triggerAddAriaLabelToDatatable = false) => {
  if (triggerAddAriaLabelToDatatable) {
    // *** add aria label to all data tables
    addAriaLabelToDatatable();
  }

  // *** add aria sorted-by to data tables
  addInitialAriaSort();

  // *** change auto-generated attribute value
  changeGridCellAttributeValue();

  // *** assign aria sort handlers
  assignAriaSortHandlersToDatatable();
};

/*****************************************************
 * cleanUp508:
 *
 *   This is the "parent" function (i.e., it calls individual standalone functions),
 *   used to clean up any modification made to ensure 508 compliance
 *
 *       Inputs:
 *              none
 *       Outputs:
 *              none
 *****************************************************/
export const cleanUp508 = () => {
  removeAriaSortHandlersFromDatatable();
};

/*****************************************************
 * changeGridCellAttributeValue:
 *
 *   This function is used to change auto-generated attribute value in order to
 *   make datatable 508 compliant
 *
 *       Inputs:
 *              none
 *       Outputs:
 *              none
 *****************************************************/
export const changeGridCellAttributeValue = () => {
  setTimeout(() => {
    // *** change auto-generated attribute role from "gridcell" to "cell"
    document.querySelectorAll(`[role="gridcell"]`).forEach((element) => {
      // console.log('element',element)
      element.setAttribute("role", "cell");
      // element.setAttribute("id", `${element.id}${element.className}`);
    });
  });
};

/*****************************************************
 * addAriaLabelToDatatable:
 *
 *   This function is used to initially set aria-sort attribute appropriately
 *
 *       Inputs:
 *              none
 *       Outputs:
 *              none
 *****************************************************/
export const addAriaLabelToDatatable = () => {
  document.querySelectorAll(`.rdt_Table`).forEach((element) => {
    console.log('element: ', element);
    let label = "Data Table";
    const tableContainer = document.querySelector(".data-display-table");
    if(tableContainer){
      console.log('tableContainer: ', tableContainer);
      label = tableContainer.getAttribute("table-aria-labelledby");
      element.setAttribute("aria-labelledby", label);
      console.log('inner el within tableContainer', element);
    }else{
      console.log('inner el', element);
      element.setAttribute("aria-label", label);
    }
  });
};

/*****************************************************
 * addInitialAriaSort:
 *
 *   This function is used to initially set aria-sort attribute appropriately
 *
 *       Inputs:
 *              none
 *       Outputs:
 *              none
 *****************************************************/
export const addInitialAriaSort = () => {
  setTimeout(() => {
    document.querySelectorAll(`.rdt_TableCol_Sortable`).forEach((column) => {
      // *** traverse all sort icons
      if (column.querySelectorAll(".__rdt_custom_sort_icon__").length > 0) {
        // *** isolate the svg element of the icon
        const sortIcon = column.querySelector(".MuiSvgIcon-root");

        // *** if svg element is displayed, set
        if (window.getComputedStyle(sortIcon).opacity === "1") {
          if (
            column
              .querySelector(".__rdt_custom_sort_icon__")
              .classList.contains("asc")
          ) {
            column
              .closest(`.rdt_TableCol_Sortable`)
              .setAttribute("aria-sort", "ascending");
          } else if (
            column
              .querySelector(".__rdt_custom_sort_icon__")
              .classList.contains("desc")
          ) {
            column
              .closest(`.rdt_TableCol_Sortable`)
              .setAttribute("aria-sort", "descending");
          }
        }else {
          column
            .closest(`.rdt_TableCol_Sortable`)
            .setAttribute("aria-sort", "none");
        }
      }
    });
  });
};

/*****************************************************
 * setAriaSort:
 *
 *   This function is used to set aria-sort attribute appropriately
 *
 *       Inputs:
 *              event - browser event to which action is linked
 *       Outputs:
 *              none
 *****************************************************/
export const setAriaSort = (event) => {
  const currentColumn = event.target.closest(".rdt_TableCol_Sortable");
  const sortIcon = currentColumn.querySelector(".__rdt_custom_sort_icon__");

  // *** disregard any events that don't result in sorting
  if (
    (event.type === "keydown" && event.key !== "Enter") ||
    event.type === "click"
  ) {

    // *** make sure aria-sort attribute is set
    document.querySelectorAll(`.rdt_TableCol_Sortable`).forEach((column) => {
      if(column === currentColumn){
        if(currentColumn.ariaSort === "none"){
          if(sortIcon.classList.contains("asc")){
            currentColumn.ariaSort = "ascending";
          }else if(sortIcon.classList.contains("desc")){
            currentColumn.ariaSort = "descending";
          }
        }else{
          if(currentColumn.ariaSort === "ascending"){
            currentColumn.ariaSort = "descending"
          } else{
            currentColumn.ariaSort = "ascending";
          }
        }
      }else{
        column.ariaSort = "none";
      }
    });
  }
};

/*****************************************************
 * assignAriaSortHandlersToDatatable:
 *
 *   This function is used to add event listeners to all sortable columns and make
 *   sure aria-sort attribute is set appropriately
 *
 *       Inputs:
 *              none
 *       Outputs:
 *              none
 *****************************************************/
export const assignAriaSortHandlersToDatatable = () => {
  setTimeout(() => {
    // *** only event being taken into account are the ones that result in sorting of the datatable
    document.querySelectorAll(".rdt_TableCol_Sortable").forEach((element) => {
      element.addEventListener("click", setAriaSort, true);
      element.addEventListener("keydown", setAriaSort, true);
    });
  });
};

/*****************************************************
 * removeAriaSortHandlersFromDatatable:
 *
 *   This function is used to clean up event listeners assigned to data table for
 *   508 compliance
 *****************************************************/
export const removeAriaSortHandlersFromDatatable = () => {
  document.querySelectorAll(".rdt_TableCol_Sortable").forEach((element) => {
    element.removeEventListener("click", setAriaSort);
    element.removeEventListener("keydown", setAriaSort);
  });
};

/*****************************************************
 * setCheckboxToReferenceColumn:
 *
 *   This function is used to set compliant aria-labels to all the checkboxes
 *
 *       Inputs:
 *              data - an array of data elements that populate the table
 *              columnToReference - what the checkboxes should reference (is an attribute of data)
 *              selectAllReference - what the select all checkbox should reference (is just a label)
 *       Outputs:
 *              none
 *****************************************************/
export const setCheckboxToReferenceColumn = (data, coulmnToReference, selectAllReference) => {
  setTimeout(() => {
    const selectAll = document.querySelector('[name="select-all-rows"]');
    if (selectAll) {
      selectAll.setAttribute('aria-label', `Select/deselect all ${selectAllReference}`);
    }
    document.querySelectorAll('[type="checkbox"]').forEach((element) => {
      if (element.getAttribute('name') !== 'select-all-rows') {
        const index = parseInt(element.getAttribute('name').split('select-row-')[1]);
        const label = `select-row-${data[index][coulmnToReference]}`
        element.setAttribute("aria-label", label);
        element.setAttribute("name", label);
      }
    });
  });
};
