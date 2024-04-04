const clicker = document.getElementById("post-list");

console.log(clicker);

console.log(location);

clicker.onclick = async (event) => {
  const id = event.target.id;

  console.log(id);

  location.href = `/board/?id=${id}`;
};
