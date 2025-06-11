import * as path from "path";

const svgTransform = {
  process(filename: string) {
    return "module.exports = " + JSON.stringify(path.basename(filename)) + ";";
  },
};

export default svgTransform;
