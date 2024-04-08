const followElems = [...document.getElementsByClassName("following")];

console.log(followElems);

document.onscroll = () => {
  if (window.scrollY > 90) {
    followElems.forEach((elem) => {
      elem.classList.add("active--costum");
    });
  } else {
    followElems.forEach((elem) => {
      elem.classList.remove("active--costum");
    });
  }
};
