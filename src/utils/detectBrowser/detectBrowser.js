export const detectBrowser = () => {
    let browser = "unknown";
    if (
        (navigator.userAgent.indexOf("Opera") ||
            navigator.userAgent.indexOf("OPR")) !== -1
    ) {
        browser = "Opera";
    } else if (navigator.userAgent.indexOf("Edg") !== -1) {
        browser = "Edge";
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
        browser = "Chrome";
    } else if (navigator.userAgent.indexOf("Safari") !== -1) {
        browser = "Safari";
    } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
        browser = "Firefox";
    } else if (
        navigator.userAgent.indexOf("MSIE") !== -1 ||
        !!document.documentMode === true
    ) {
        //IF IE > 10
        browser = "IE";
    }
    return browser
}
