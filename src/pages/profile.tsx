import {
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import Layout from "../components/Layout/Layout";
import { AuthenticateUser } from "../lib/ProtectedRoute";
import { PageWithLayout } from "../modules/Layout";

const Profile: PageWithLayout = () => {
  const { data: user } = useSession();
  return (
    <Stack>
      <Heading color={"secondary.yellow"}>Profile</Heading>
      <SimpleGrid spacing={4} columns={[1, 2, 3, 3]}>
        <FormControl>
          <FormLabel color={"white"}>First Name</FormLabel>
          <Input readOnly value={user?.user?.attributes?.given_name} />
        </FormControl>
        <FormControl>
          <FormLabel color={"white"}>Last Name</FormLabel>
          <Input readOnly value={user?.user?.attributes?.family_name} />
        </FormControl>
        <FormControl>
          <FormLabel color={"white"}>Email</FormLabel>
          <Input readOnly value={user?.user?.attributes?.email} />
        </FormControl>
        <FormControl>
          <FormLabel color={"white"}>Phone Number</FormLabel>
          <Input readOnly value={user?.user?.attributes?.phone_number} />
        </FormControl>
        <FormControl>
          <FormLabel color={"white"}>City</FormLabel>
          <Input readOnly value={user?.user?.attributes?.["custom:city"]} />
        </FormControl>
        <FormControl>
          <FormLabel color={"white"}>Orthopedic Practice</FormLabel>
          <Input
            readOnly
            value={user?.user?.attributes?.["custom:orthopedicPractice"]}
          />
        </FormControl>
        <FormControl>
          <FormLabel color={"white"}>Region</FormLabel>
          <Input readOnly value={user?.user?.attributes?.["custom:region"]} />
        </FormControl>
        <FormControl>
          <FormLabel color={"white"}>State</FormLabel>
          <Input readOnly value={user?.user?.attributes?.["custom:state"]} />
        </FormControl>
      </SimpleGrid>
    </Stack>
  );
};

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default Profile;
export async function getServerSideProps(context: any) {
  return await AuthenticateUser(context);
}
