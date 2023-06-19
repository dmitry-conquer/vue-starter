export function isProductValid({ id, title, image, price }) {
  /* prettier-ignore */
  return [
   isNumber(id),
   isNumber(price),
   isNotEmptyString(title),
   isNotEmptyString(image),
  ].every(Boolean)
}

function isNumber(value) {
  return typeof value === "number";
}
function isNotEmptyString(value) {
  return value.length > 0;
}
