// Click handler for in-app links: real hrefs keep "open in new tab" and copy-link
// working, while plain left clicks route through the App's onNavigate.
export function routeLinkHandler(onNavigate, route, treatmentId) {
  return (event) => {
    const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (!onNavigate || event.defaultPrevented || event.button !== 0 || isModified) return;
    event.preventDefault();
    onNavigate(route, treatmentId);
  };
}
