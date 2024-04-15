//navbar 클릭 이벤트
const navBarEvent = (document.getElementById("navbar").onclick = (event) => {
  if (event.target.id == "navbar") return;
});

const categoryContainer = document.getElementById("categories-container");
const tagContainer = document.getElementById("tags-container");

//카테고리 클릭 이벤트

const displayNone = (elems) => {
  for (let i = 0; i < elems.children.length; i++) {
    elems.children[i].style.display = "none";
  }
};

const getTarget = (elem, id) => {
  for (let i = 0; i < elem.children.length; i++) {
    if (elem.children[i].id == id) {
      return elem.children[i];
    }
  }
};

//
//code
//

categoryContainer.onclick = (event) => {
  if (event.target.id == "categories-container") return;
  // console.log(event.target.id);

  const targetId = event.target.id + "-tag";
  // console.log("target@@@@", targetId);

  const target = getTarget(tagContainer, targetId);
  displayNone(tagContainer);

  target.style.display = "flex";
};

//태크 클릭 이벤트

tagContainer.onclick = (event) => {
  if (event.target.id == "tags-container") return;
  // console.log(event.target.id);

  const contentsContainerOnclick =
    document.getElementById("contents-container");

  const contents = [...contentsContainerOnclick.children].map((Elems) => Elems);

  // console.log(contents);

  let getTargetContent;

  contents.forEach((elems) => {
    console.log(elems);

    [...elems.children].forEach((elem) => {
      elem.style.display = "none";
    });

    const getTargetElem = [...elems.children].find((elem) => {
      return event.target.id == `${elems.className}-${elem.id}`;
    });

    console.log("타겟 엘렘", getTargetElem);

    if (getTargetElem != undefined) getTargetContent = getTargetElem;
  });

  getTargetContent.style.display = "flex";

  // if(event.target.id == )
};
