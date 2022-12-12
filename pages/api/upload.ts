import { NextApiRequest, NextApiResponse } from "next";
import axios from "./axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await axios.put(`/uploads/get-signed-url`, req.body, {
      headers: {
        "x-api-key": `9akX29Ac7tDpjHGXgz3C5nWS5BjCDWzaggj24eH6`,
      },
    });
    res.status(200).json(data);
  } catch (err: any) {
    res.status(err.response.data.error.status).json(err.response.data.error);
  }
}
