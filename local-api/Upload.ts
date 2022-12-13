import axios from "axios";

export const GetUrlsAndUpload = async (
  uploadList: any,
  files: any,
  user: any
) => {
  let { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/uploads/get-signed-url`,

    uploadList,
    {
      headers: {
        Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
        "content-type": "application/json",
      },
    }
  );

  let promiseList: any = [];
  data.signedUrlList.forEach((element: any, index: number) => {
    let putPromise = axios.put(element, files[index], {
      headers: {
        "Content-Type": files[index].type,
      },
    });
    promiseList.push(putPromise);
  });

  try {
    Promise.all(promiseList).then((val) => {});
  } catch (error) {}
};
