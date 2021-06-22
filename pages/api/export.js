import exporter from "../../firebase/db/exporter";

export default async function handler(req, res) {
  const jsonDB = await exporter();
  console.log(jsonDB);
  res.status(200).json(jsonDB);
}
