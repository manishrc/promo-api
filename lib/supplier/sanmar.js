import * as cheerio from "cheerio";
import normalizeMeasurementName from "@/lib/normalize-measurement-name";
import parseMeasurement from "@/lib/parse-measurement";

// Example URL:
// https://www.apparelvideos.com/cs/CatalogBrowser?todo=mm&productId=2000

export async function sanmar(itemId) {
  const res = await fetch(
    `https://www.apparelvideos.com/cs/CatalogBrowser?todo=mm&productId=${encodeURIComponent(
      itemId
    )}`
  );

  const html = await res.text();
  const $ = cheerio.load(html);

  const productName = $("#style_name").text();
  const brand = { image: $("img#brand_logo").attr("src") };

  const $sizeChart = $("#size_chart table");
  const sizeChart = {};

  const sizes = [];
  $sizeChart.find("thead > tr td:not(.unused)").each((i, el) => {
    sizes.push($(el).text());
  });

  const measurements = [];
  $sizeChart.find("tbody tr td.label").each((i, el) => {
    measurements.push($(el).text());
  });

  $sizeChart.find("tbody tr").map((rowIndex, measurementRow) => {
    $(measurementRow)
      .find("td:not(.label)")
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
    $sizeChart.find("tbody tr td:not(.label):first").text()
  ).unit;

  const comments = $("#how_to_measure_description").text().trim();

  return { productName, brand, unit, measurements, sizes, sizeChart, comments };
}
