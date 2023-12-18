export default function normalizeMeasurementName(measurementName) {
  if (measurementName === "Chest Width" || measurementName === "body width") {
    return "Chest Width";
  }

  if (
    measurementName === "Body Length at Back" ||
    measurementName === "body length" ||
    measurementName === "full body length"
  ) {
    return "Body Length";
  }

  if (
    measurementName === "Sleeve Length" ||
    measurementName === "sleeve length"
  ) {
    return "Sleeve Length";
  }

  return measurementName;
}
