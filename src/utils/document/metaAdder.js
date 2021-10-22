export const metaAdder = (queryProperty, value) => {
  // Get an element if it exists already
  let element = document.querySelector(`meta[name=${queryProperty}]`);

  // Check if the element exists
  if (element) {
    // If it does just change the content of the element
    element.setAttribute('content', value);
  } else {
    // It doesn't exist so lets make a HTML element string with the info we want
    element = `<meta name=${queryProperty} content="${value}" />`;

    // And insert it into the head
    document.head.insertAdjacentHTML('beforeend', element);
  }
};
