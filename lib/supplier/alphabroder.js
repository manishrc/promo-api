import * as cheerio from "cheerio";
import parseMeasurement from "@/lib/parse-measurement";
import normalizeMeasurementName from "@/lib/normalize-measurement-name";

// Example URL:
// https://www.alphabroder.com/product/g200

export async function alphabroder(itemId = "g200") {
  const res = await fetch(
    `https://www.alphabroder.com/product/${encodeURIComponent(itemId)}`
  );

  const html = await res.text();
  const $ = cheerio.load(html);

  const productName = $("h2.prodStyleDesc:first").text();
  const brand = { image: $("a#millImageLink img").attr("src") };

  const $sizeChart = $("table.oss-specSize:first");
  const sizeChart = {};

  // Get sizes
  const sizes = [];
  $sizeChart.find("thead > tr th:not(:first-child)").each((i, el) => {
    sizes.push($(el).text());
  });

  // Get measurement attributes
  const measurements = [];
  $sizeChart.find("tbody tr td:first-child").each((i, el) => {
    measurements.push($(el).text());
  });

  $sizeChart.find("tbody tr").map((rowIndex, measurementRow) => {
    $(measurementRow)
      .find("td:not(:first-child)")
      .each((columnIndex, cell) => {
        const measurementValue = parseMeasurement($(cell).text()).value;
        const measurementName = normalizeMeasurementName(
          measurements[rowIndex]
        );

        sizeChart[measurementName] = sizeChart[measurementName] || {};
        sizeChart[measurementName][sizes[columnIndex]] = measurementValue;
      });
  });

  const unit = parseMeasurement(
    $sizeChart.find("tbody tr:last-child td:last-child").text()
  ).unit; // TODO

  return { productName, brand, unit, measurements, sizes, sizeChart };
}
