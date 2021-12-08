  // ***replace h4 tags in accordions with h3 tags for 508
const formatAccordionTitles = () => {
  const accordionTitles = document.getElementsByClassName(
    'usa-accordion__heading'
  );
  for (const el of accordionTitles) {
    const newTag = document.createElement('h3');
    const button = el.firstChild;
    newTag.append(button);
    newTag.className = 'usa-accordion__heading';
    el.parentNode.replaceChild(newTag, el);
  }
};
export default formatAccordionTitles;
