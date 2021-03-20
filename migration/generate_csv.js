const yaml = require("js-yaml");
const fs = require("fs");
const marked = require("marked");

const escape = (str) => {
  // return `"${str.replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
  // return `"${str.replace(/"/g, '\\"')}"`;
  return `"${str.replace(/"/g, '""')}"`;
};

const createMapFromCsv = (csvFilePath) => {
  const file = fs.readFileSync(csvFilePath, { encoding: "utf-8" });
  const lines = file.split("\n");
  const map = new Map();
  lines.forEach((line) => {
    const splitted = line.split(",");
    map[splitted[1]] = splitted[0];
  });
  return map;
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
    lineList.push(escape(marked(this.body)));
    lineList.push(escape(this.metaData.categories.join(",")));
    lineList.push(escape(this.metaData.tags.join(",")));
    lineList.push(this.metaData.date.toISOString());
    return lineList.join(",");
  }

  updateTagsWithMap(map) {
    const newTags = this.metaData.tags.map((tag) => map[tag]);
    this.metaData.tags = newTags;
  }

  updateCategoriesWithMap(map) {
    const newCategories = this.metaData.categories.map(
      (category) => map[category]
    );
    this.metaData.categories = newCategories;
  }

  get tags() {
    return this.metaData.tags;
  }

  get categories() {
    return this.metaData.categories;
  }
}

class CsvFile {
  constructor(lines) {
    this.lines = lines;
  }

  save(outputPath) {
    const data = Array.from(this.lines).join("\n");
    fs.writeFileSync(outputPath, data);
  }
}

const basePath = "/home/abekoh/src/github.com/abekoh/blog/content/post";

const fileNames = fs.readdirSync(basePath, { withFileTypes: true });

const bodies = [];
const categories = new Set();
const tags = new Set();

const categoryMap = createMapFromCsv("migration/categories.csv");
const tagMap = createMapFromCsv("migration/tags.csv");

fileNames.forEach((fileName) => {
  const filePath = `${basePath}/${fileName.name}`;
  const content = fs.readFileSync(filePath, { encoding: "utf-8" });
  const post = new Post(fileName.name, content);
  post.updateCategoriesWithMap(categoryMap);
  post.updateTagsWithMap(tagMap);
  bodies.push(post.toCsvLine());
  // post.categories.forEach((category) => categories.add(category));
  // post.tags.forEach((tag) => tags.add(tag));
});

new CsvFile(bodies).save("migration/bodies.csv");
// new CsvFile(categories).save("migration/categories.csv");
// new CsvFile(tags).save("migration/tags.csv");
