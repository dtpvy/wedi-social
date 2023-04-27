import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const place = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = req.query;
  const data = await axios
    .get("https://map.coccoc.com/map/search.json", {
      params,
    })
    .then((res) => res.data);
  res.status(200).send(data);
};

export default place;
