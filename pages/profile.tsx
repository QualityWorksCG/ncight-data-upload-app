import React from "react";
import Layout from "../components/Layout/Layout";
import { PageWithLayout } from "../modules/Layout";

type Props = {};

const Profile: PageWithLayout = () => {
  return <div>Profile</div>;
};

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default Profile;
