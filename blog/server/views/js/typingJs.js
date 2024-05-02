const typingFunc = (rootId, timer) => {
  const root = document.getElementById(rootId);

  const [...rootStr] = document.getElementById(rootId).innerText;

  root.innerText = "";

  let i = 0;
  setInterval(() => {
    if (i < rootStr.length) {
      if (rootStr[i] == " ") {
        root.innerHTML += "&nbsp";
      } else {
        root.innerText += rootStr[i];
      }
      i++;
    } else {
      i = 0;
      root.innerText = "";
    }
  }, timer);
};

typingFunc("type1", 300);
