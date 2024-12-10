import random from "random";

export const generateEmail = (base = "test") => {
  const today = new Date();
  const dateString = today.toISOString().slice(0, 10).replace(/-/g, "").slice(2);

  const randomNum = random.int(1000, 9999);

  const result = `${base}${dateString}_${randomNum}@test.com`;
  console.log(result);

  return result;
};

export function sanitizeText(text) {
    return text.split("\n") // split string by new lines
        .filter(line => line.length > 0) // remove empty lines
        .map(line => line.replace(/\s{2,}/g, "")) // remove multiple spaces
}
