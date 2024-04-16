import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = fileURLToPath(new URL(".", import.meta.url));

import { unified } from "../node_modules/unified/index.js";
import markdown from "../node_modules/remark-parse/index.js";
import remark2rehype from "../node_modules/remark-rehype/index.js";
import html from "../node_modules/rehype-stringify/index.js";

const contentsPath = path.join(__dirname, "..", "post");

console.log(contentsPath);

const contents = fs.readdirSync(contentsPath);

console.log("everycontetns", contents);

const filteredContents = contents.filter((content) => {
  if (content[0] != ".") return content;
});

console.log(filteredContents);

const contentPaths = filteredContents.map((file) => {
  console.log("@@@@@@@@@@@@", path.join(contentsPath, file));
  return path.join(contentsPath, file);
});

console.log(contentPaths);

//

//func

//

const getContent = (filePath) => {
  const fileContents = fs.readFileSync(filePath, "utf8");

  return fileContents;
};

const text = getContent(contentPaths[0]);

const html_text = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(html)
  .processSync(text);

console.log(html_text.toString());

///

//추가

document.getElementById("contents-container").innerHTML = html_text.toString();
