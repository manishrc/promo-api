import * as cheerio from "cheerio";

/**
 * Convert HTML table to JSON format in node.js
 * @param {String} html HTML Text
 * @param {{ useFirstRowForHeadings: Boolean ,headings: [String] }} options Settings (useFirstRowForHeadings: whether to use the first row as headings, headings: custom headings)
 * @return {[{ String: String }]} Result
 */
export function tableToJSON(html, options = {}) {
  const { useFirstRowForHeadings, headings = [] } = options;

  const $ = cheerio.load(html);

  const trs = $("table tr");
  const rowCount = trs.length;
  const output = [];

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    const { children } = trs[rowIndex];
    const colCount = children.length;
    const row = {};

    for (let colIndex = 0; colIndex < colCount; colIndex += 1) {
      const td = cheerio(children[colIndex]);

      if (rowIndex === 0 && useFirstRowForHeadings) {
        headings.push(td.text());
      } else {
        row[headings[colIndex] || colIndex] = td.text();
      }
    }

    if (!(rowIndex === 0 && useFirstRowForHeadings)) {
      output.push(row);
    }
  }
  return output;
}
