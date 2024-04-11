//카테고리
const categoriesId = [...document.getElementsByClassName("categories")];

categoriesId.forEach((category) => {
  category.id = category.innerText;
});

//태그
const tagsId = [...document.getElementsByClassName("tags")];
tagsId.forEach((tags) => {
  for (let i = 0; i < tags.children.length; i++) {
    tags.children[i].id = `${tags.id}-${tags.children[i].innerText}`;
  }
});
