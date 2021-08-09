/***** this function will keep the focus restricted to elements displayed within the
 *     component currently displayed on top
 *
 *    Params:
 *      selector - css selector for component displayed on top
 *      callback - (optional), potential extra functions to call
 *                             [only one implemented so far is 'Escape' press for modal]
 *****/
 export const focusTrap = (selector, callback = () => {}) => {
  // *** identify focusable component elements
  const componentFocusableElements =
    'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  // *** isolate component and its focusable content
  const component = document.querySelector(selector);
  let focusableComponentContent, firstComponentFocusableElement , lastComponentFocusableElement;

  // handles an update on focusable elements as result of user interaction that may have brought change to the DOM
  const findFocusableElements = () =>{
    focusableComponentContent = component.querySelectorAll(
      componentFocusableElements
    );

    // *** isolate first element to be focused inside component
    firstComponentFocusableElement=focusableComponentContent?.[0];

    // *** isolate last element to be focused inside component
    lastComponentFocusableElement=focusableComponentContent?.[focusableComponentContent.length-1];
  };

  // *** this function will be used to deal with key presses while the component is open
  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      callback();
    }
    //update list of focusable elements in case DOM has updated
    findFocusableElements();

    // *** disregard anything other than tab (which leads to change of focus)
    if (event.key === "Tab") {
      // *** handle shift + tab
      if (event.shiftKey) {
        // *** if focused on first focusable element, cycle back to last on next tab press
        if (document.activeElement === firstComponentFocusableElement) {
          lastComponentFocusableElement.focus();
          event.preventDefault();
        }
      }
      // *** handle tab
      else {
        // *** if focused on last focusable element, cycle back to first on next tab press
        if (document.activeElement === lastComponentFocusableElement) {
          firstComponentFocusableElement.focus();
          event.preventDefault();
        }
      }
    }
  };

  // *** find all elements in scope and initailize enabled first and last focusable elements
  findFocusableElements();


  return {
    component,
    focusableComponentContent,
    firstComponentFocusableElement,
    lastComponentFocusableElement,
    handleKeyPress,
  };
};
