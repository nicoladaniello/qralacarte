export function slugify(string) {
  return string
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function generateQRCode(url, width = 300, height = 300) {
  const baseUrl = "https://chart.googleapis.com/chart?cht=qr";
  const size = `chs=${width}x${height}`;
  const data = `chl=${url}`;
  const marginRows = 3;
  const errorCorrection = `chld=Q|${marginRows}`;

  return `${baseUrl}&${size}&${data}&${errorCorrection}`;
}
