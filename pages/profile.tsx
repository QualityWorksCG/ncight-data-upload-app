import {
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout/Layout";
import useUser from "../lib/useUser";
import { PageWithLayout } from "../modules/Layout";

type Props = {};

const Profile: PageWithLayout = () => {
  const { user } = useUser();

  console.log(user);

  return (
    <Stack>
      <Heading color={"secondary.yellow"}>Profile</Heading>
      <SimpleGrid spacing={4} columns={[1, 2, 3, 3]}>
        <FormControl>
          <FormLabel color={"white"}>First Name</FormLabel>
          <Input value={user.attributes.given_name} type="email" />
        </FormControl>
        <FormControl>
          <FormLabel color={"white"}>Last Name</FormLabel>
          <Input value={user.attributes.family_name} type="email" />
        </FormControl>
        <FormControl>
          <FormLabel color={"white"}>Email</FormLabel>
          <Input value={user.attributes.email} type="email" />
        </FormControl>
        <FormControl>
          <FormLabel color={"white"}>Phone Number</FormLabel>
          <Input value={user.attributes.phone_number} type="email" />
        </FormControl>
        <FormControl>
          <FormLabel color={"white"}>City</FormLabel>
          <Input value={user.attributes["custom:city"]} type="email" />
        </FormControl>
        <FormControl>
          <FormLabel color={"white"}>Orthopedic Practice</FormLabel>
          <Input
            value={user.attributes["custom:orthopedicPractice"]}
            type="email"
          />
        </FormControl>
      </SimpleGrid>
    </Stack>
  );
};

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default Profile;
