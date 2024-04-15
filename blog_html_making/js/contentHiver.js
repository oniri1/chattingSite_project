const contentsContainer = document.getElementById("contents-container");

[...contentsContainer.children].forEach((Elems) => {
  [...Elems.children].forEach((elem) => {
    elem.style.display = "none";
  });
});
