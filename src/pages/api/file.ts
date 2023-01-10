import { type NextApiRequest, type NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
export const config = {
  api: {
    bodyParser: false,
  },
};
import { prisma } from "../../server/db/client";
import { join } from "path";

const uploadFiles = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, file) {
    await saveFile(file.file, fields);
    return res.status(201).send("");
  });
};

const saveFile = async (file: any, fields: any) => {
  const data = fs.readFileSync(file.filepath);
  const fullPath = join(
    process.cwd(),
    "/public/uploads/",
    file.originalFilename
  );
  fs.writeFileSync(
    join(process.cwd(), "/public/uploads/", file.originalFilename),
    data
  );
  await fs.unlinkSync(file.filepath);
  fields.filePath = fullPath;
  await prisma?.uploads.create({ data: fields });
  return;
};

export default uploadFiles;
