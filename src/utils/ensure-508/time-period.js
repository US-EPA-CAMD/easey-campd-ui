
export const fullDateEnsure508 = () =>{
  const startDateInput = document.getElementById('event-date-start');
  if (startDateInput) {
    startDateInput.setAttribute('aria-describedby', 'event-date-start-hint');
    startDateInput.nextSibling.setAttribute(
      'aria-label',
      'Toggle calendar for Start Date'
    );
  }
  const endDateInput = document.getElementById('event-date-end');
  if (endDateInput) {
    endDateInput.setAttribute('aria-describedby', 'event-date-end-hint');
    endDateInput.nextSibling.setAttribute(
      'aria-label',
      'Toggle calendar for End Date'
    );
  }
  const datePickerWrapper = document.querySelectorAll(
    '.usa-date-picker__wrapper'
  );
  datePickerWrapper.forEach((el) => {
    const sibling = el.previousSibling;
    if (sibling) {
      sibling.remove();
    }
  });
}
