import artifact from "../../contracts/artifacts/PolygonEscrow.json";
import { json } from "../_lib/http.js";
const onRequestGet = async () => json({ source: artifact.source });
export {
  onRequestGet
};
