import { useSession } from "next-auth/react";
import React from "react";
import DataTable from "react-data-table-component";
import Layout from "../components/Layout/Layout";
import { AuthenticateUser } from "../lib/ProtectedRoute";
import { PageWithLayout } from "../modules/Layout";
import { trpc } from "../utils/trpc";

const Uploads: PageWithLayout = () => {
  const { data: user, status } = useSession();
  const { data } = trpc.upload.getByUserId.useQuery(
    { UserId: user?.user?.username! },
    { enabled: status === "authenticated" }
  );

  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.id,
    },
    {
      name: "Content Type",
      selector: (row: any) => row.contentType,
    },
    {
      name: "File Path",
      selector: (row: any) => row.filePath,
    },
    {
      name: "Body Part",
      selector: (row: any) => row.imageType,
    },
    {
      name: "Body Part",
      selector: (row: any) => row.imageType,
    },
    {
      name: "Implant Count",
      selector: (row: any) => row.implantCount,
    },
    {
      name: "Is Implant Case",
      selector: (row: any) => row.isImplantCase,
    },
    {
      name: "Procedure Id",
      selector: (row: any) => row.procedureId,
    },
    {
      name: "Surgery Date",
      selector: (row: any) => row.surgeryDate,
    },
    {
      name: "User Id",
      selector: (row: any) => row.userId,
    },
  ];
  return (
    <>
      <DataTable pagination columns={columns} data={data!} />
    </>
  );
};

Uploads.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Uploads;

export async function getServerSideProps(context: any) {
  return await AuthenticateUser(context);
}
