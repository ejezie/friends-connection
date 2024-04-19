export const toggleClassname = (state: { [key: string]: boolean }) => {
  const body = document.body;

  state.isDarkMode
    ? body.classList.add("dark-mode")
    : body.classList.remove("dark-mode");
};

export const getScrollbarWidth = () => {
  // Create the div
  const scrollDiv = document.createElement("div");
  scrollDiv.className = "scrollbar-measure";
  document.body.appendChild(scrollDiv);
  // Get the scrollbar width
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  // Delete the div
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};
