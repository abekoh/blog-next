const yaml = require("js-yaml");
const fs = require("fs");

const escape = (str) => {
  return `"${str.replace(/"/g, '\\"')}"`;
};

class Post {
  constructor(fileName, content) {
    this.fileName = fileName;
    this.parse(content);
  }

  parse(content) {
    const splitted = content.split("\n---\n");
    this.metaData = yaml.load(splitted[0]);
    this.body = splitted[1];
  }

  toCsvLine() {
    const lineList = [];
    lineList.push(this.fileName.replace(/^(.*)\.md$/, "$1"));
    lineList.push(escape(this.metaData.title));
    // lineList.push(escape(this.body));
    lineList.push(escape(this.metaData.categories.join(",")));
    lineList.push(escape(this.metaData.tags.join(",")));
    lineList.push(this.metaData.date.toISOString());
    return lineList.join(",");
  }
}

const basePath = "/home/abekoh/src/github.com/abekoh/blog/content/post";

const fileNames = fs.readdirSync(basePath, { withFileTypes: true });

fileNames.forEach((fileName) => {
  const filePath = `${basePath}/${fileName.name}`;
  const content = fs.readFileSync(filePath, { encoding: "utf-8" });
  const post = new Post(fileName.name, content);
  const csvLine = post.toCsvLine();
  console.log(csvLine);
});
