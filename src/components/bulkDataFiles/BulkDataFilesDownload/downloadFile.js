export const downloadFile = (url) => {
    const iframe = document.createElement('iframe');
    iframe.style.visibility = 'collapse';
    document.body.append(iframe);
    iframe.contentDocument.write(`<form action="${url}" method="GET"></form>`);
    iframe.contentDocument.forms[0].submit();
    setTimeout(() => iframe.remove(), 2000);
  };