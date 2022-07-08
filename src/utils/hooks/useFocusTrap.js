import { useEffect, useState } from 'react';
import { focusTrap } from '../ensure-508/focus-trap';
//condition is an array with one element which is the conditional state
//element = ".side-nav"
const useFocusTrap = (element, conditionalStateArr, autoScroll = false) => {
  const [firstFocusableEl, setFirstFocusableEl] = useState(null);

  useEffect(() => {
    if (conditionalStateArr[0] && element) {
      const { firstComponentFocusableElement, handleKeyPress } =
        focusTrap(element);
      // set focus to first element only once
      if (firstFocusableEl === null && firstComponentFocusableElement) {
        setFirstFocusableEl(firstComponentFocusableElement);
        autoScroll
          ? firstComponentFocusableElement.focus()
          : firstComponentFocusableElement.focus({ preventScroll: true });
      }
      // *** FOCUS TRAP
      document.addEventListener('keydown', handleKeyPress);
      // * clean up
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }
    if (!conditionalStateArr[0]) {
      setFirstFocusableEl(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditionalStateArr[0]]);
};
export default useFocusTrap;
