import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
const __dirname = fileURLToPath(new URL(".", import.meta.url));

import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";

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
