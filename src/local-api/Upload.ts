import axios, { AxiosAdapter, AxiosDefaults, AxiosError } from "axios";

export const GetUrlsAndUpload = async (
  uploadList: any,
  files: any,
  user: any
) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/uploads/get-signed-url`,

    uploadList,
    {
      headers: {
        Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
        "content-type": "application/json",
      },
    }
  );

  const promiseList: any = [];

  data.signedUrlList.forEach((element: any, index: number) => {
    const putPromise = axios.put(element, files[index], {
      headers: {
        "Content-Type": files[index].type,
      },
    });
    promiseList.push(putPromise);
  });

  return Promise.all(promiseList);
};

export const UploadToAPI = async (files: any) => {
  files.forEach(async (file: any) => {
    const body = new FormData();
    body.append("file", file.file);
    body.append("imageType", file.imageType);
    body.append("surgeryDate", file.surgeryDate);
    body.append("isImplantCase", file.isImplantCase);
    body.append("implantCount", file.implantCount);
    body.append("contentType", file.contentType);
    body.append("userId", file.userId);
    body.append("procedureId", file.procedureId);
    body.append("filePath", file.filePath);

    const response = await fetch("/api/file", {
      method: "POST",
      body,
    });
  });
};
