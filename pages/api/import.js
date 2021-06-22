import importer from "../../firebase/db/importer";

export default async function handler(req, res) {
  await importer();
  res.status(200).json({ status: "ok" });
}
