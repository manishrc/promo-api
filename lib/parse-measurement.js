// Function to parse a measurement string and return a number in inches
// Example values:
// 30
// 30.5
// 30.50
// 30 1/2
// 30 1/2"
// 30 1/2 inch
// 30 1/2 inches
// 30 1/2'
// 30 ½
// 30½
// 30½"
// 30½'
export default function parseMeasurement(value) {
  // Unit regexes
  const inchRegex = /inch(es)?|"$/i;
  const footRegex = /foot|feet|'$/i;
  const cmRegex = /cms?$/i;

  // Find Unit
  const unit = value.match(inchRegex)
    ? "inch"
    : value.match(footRegex)
    ? "foot"
    : value.match(cmRegex)
    ? "cm"
    : "inch"; // default to inch

  // Strip unit from value
  const valueWithoutUnit = value
    .replace(inchRegex, "")
    .replace(footRegex, "")
    .replace(cmRegex, "")
    .trim();

  // Normalize fractions: ½, ¼, ¾, ⅓, ⅔
  const valueWithNormalFractions = valueWithoutUnit
    .replace(/½/g, " 1/2")
    .replace(/¼/g, " 1/4")
    .replace(/¾/g, " 3/4")
    .replace(/⅓/g, " 1/3")
    .replace(/⅔/g, " 2/3")
    .replace(/ {2,}/g, " ") // collapse multiple spaces
    .trim();

  // Convert any fractions to decimals
  const fractionRegex = /^(\d+(\.\d+)?)(( (\d+)\/(\d+))?)$/;
  const fractionMatch = valueWithNormalFractions.match(fractionRegex);
  if (fractionMatch) {
    const wholeNumber = fractionMatch[1];
    const numerator = fractionMatch[5];
    const denominator = fractionMatch[6];
    const decimal =
      numerator && denominator ? Number(numerator) / Number(denominator) : 0;
    return { unit, value: Number(wholeNumber) + decimal };
  }
  return null;
}
