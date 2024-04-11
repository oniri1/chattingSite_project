//navbar 클릭 이벤트
const navBarEvent = (document.getElementById("navbar").onclick = (event) => {
  if (event.target.id == "navbar") return;
});

//카테고리 클릭 이벤트

const categoryEvent = document.getElementById("categories-container");

categoryEvent.onclick = (event) => {
  if (event.target.id == "categories-container") return;
  console.log(event.target.id);
};

//태크 클릭 이벤트
const tagEvent = document.getElementById("tags-container");

tagEvent.onclick = (event) => {
  if (event.target.id == "tags-container") return;
  console.log(event.target.id);
};
