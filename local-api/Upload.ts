import axios from "axios";

export const GetUrlsAndUpload = async (values: any, files: any) => {
  let { data } = await axios.post(
    `https://66eh1rez3i.execute-api.us-east-1.amazonaws.com/dev/uploads/get-signed-url`,
    values,
    {
      headers: {
        "x-api-key": "9akX29Ac7tDpjHGXgz3C5nWS5BjCDWzaggj24eH6",
        "content-type": "application/json",
      },
    }
  );
  console.log(data);
};
