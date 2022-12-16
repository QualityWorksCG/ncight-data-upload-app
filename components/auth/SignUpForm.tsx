import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Link,
  Stack,
  Grid,
  GridItem,
  Text,
  Container,
  FormErrorMessage,
  chakra,
  HStack,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { InfoOutlineIcon, CheckIcon } from "@chakra-ui/icons";
import { useForm, Controller } from "react-hook-form";
import * as stateData from "../../data/us-states-and-regions";
import { Auth } from "aws-amplify";
import VerificationModalEmailContent from "./VerificationModalEmailContent";
import BaseModal from "../general/BaseModal";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface StateObject {
  state: string;
  region: string;
}

function formatPhoneNumber(phone_number: string) {
  var cleanPhoneNumber = phone_number.replaceAll("-", "");
  var finalPhoneNumber = "+1" + cleanPhoneNumber;
  return finalPhoneNumber;
}

export default function SignUpForm() {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [modal, showModal] = useState<boolean>(false);
  const watchPassword = watch("password");
  const [loading, isLoading] = useState(false);
  const toast = useToast();
  async function signUp(
    username: string,
    password: string,
    email: string,
    phone_number: string,
    family_name: string,
    given_name: string,
    orthopedic_practice: string,
    stateObject: StateObject,
    city: string
  ) {
    isLoading(true);
    try {
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number,
          family_name,
          given_name,
          "custom:orthopedicPractice": orthopedic_practice,
          "custom:state": stateObject.state,
          "custom:city": city,
          "custom:region": stateObject.region,
        },
      });

      if (user) {
        showModal(true);
      }
    } catch (error: any) {
      if (error.message === "An account with the given email already exists.") {
        toast({
          title: "Email already in use!",
          description: "An account with the given email already exists.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
    isLoading(false);
  }

  const onSubmit = (data: any) => {
    signUp(
      data.signup_email,
      data.password,
      data.signup_email,
      formatPhoneNumber(data.mobile_phone_number),
      data.last_name,
      data.first_name,
      data.orthopedic_practice,
      data.state.value,
      data.city
    );
  };

  return (
    <Container maxW="lg">
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} maxW={"lg"}>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem>
              <FormControl
                id="first_name"
                isInvalid={Boolean(errors.first_name)}
              >
                <FormLabel htmlFor="first_name">First Name</FormLabel>
                <Input
                  type="text"
                  size="lg"
                  {...register("first_name", {
                    required: "First Name is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.first_name && errors.first_name.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl id="last_name" isInvalid={Boolean(errors.last_name)}>
                <FormLabel htmlFor="last_name">Last Name</FormLabel>
                <Input
                  type="text"
                  size="lg"
                  {...register("last_name", {
                    required: "Last Name is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.last_name && errors.last_name.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>

          <FormControl
            id="signup_email"
            isInvalid={Boolean(errors.signup_email)}
          >
            <FormLabel htmlFor="signup_email">Email Address</FormLabel>
            <Input
              type="email"
              size="lg"
              {...register("signup_email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Email format is incorrect",
                },
              })}
            />
            <FormErrorMessage>
              {errors.signup_email && errors.signup_email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            id="signup-password"
            isInvalid={Boolean(errors.password)}
          >
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              size="lg"
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
            />
            <FormErrorMessage>Password is required.</FormErrorMessage>
            <FormHelperText fontWeight="700" color="secondary.yellow">
              <HStack>
                {watchPassword?.length < 8 ? (
                  <AiOutlineClose />
                ) : (
                  <CheckIcon color={"green"} />
                )}
                <Text>8 characters</Text>
              </HStack>
            </FormHelperText>
            <FormHelperText fontWeight="700" color="secondary.yellow">
              <HStack>
                {!RegExp("(.*[A-Z].*)").test(watchPassword) ? (
                  <AiOutlineClose />
                ) : (
                  <CheckIcon color={"green"} />
                )}
                <Text>at least 1 uppercase letter</Text>
              </HStack>
            </FormHelperText>
            <FormHelperText fontWeight="700" color="secondary.yellow">
              <HStack>
                {!RegExp("(.*[a-z].*)").test(watchPassword) ? (
                  <AiOutlineClose />
                ) : (
                  <CheckIcon color={"green"} />
                )}
                <Text>at least 1 lowercase letter</Text>
              </HStack>
            </FormHelperText>
            <FormHelperText fontWeight="700" color="secondary.yellow">
              <HStack>
                {!RegExp("([^A-Za-z0-9])").test(watchPassword) ? (
                  <AiOutlineClose />
                ) : (
                  <CheckIcon color={"green"} />
                )}
                <Text>at least 1 special character</Text>
              </HStack>
            </FormHelperText>
            <FormHelperText fontWeight="700" color="secondary.yellow">
              <HStack>
                {!RegExp(".*[0-9].*").test(watchPassword) ? (
                  <AiOutlineClose />
                ) : (
                  <CheckIcon color={"green"} />
                )}
                <Text>at least 1 number</Text>
              </HStack>
            </FormHelperText>
          </FormControl>
          <FormControl
            id="orthopedic_practice"
            isInvalid={Boolean(errors.orthopedic_practice)}
          >
            <FormLabel htmlFor="orthopedic_practice">
              Name of Orthopedic Practice
            </FormLabel>
            <Input
              type="text"
              placeholder="Practice Name"
              _placeholder={{ color: "primary.gray" }}
              size="lg"
              {...register("orthopedic_practice", {
                required: "Orthopedic Practice is required",
              })}
            />
            <FormErrorMessage>
              {errors.orthopedic_practice && errors.orthopedic_practice.message}
            </FormErrorMessage>
          </FormControl>

          <SimpleGrid gap={6} columns={[1, 2]} spacing={[2]}>
            <Controller
              control={control}
              name="state"
              rules={{ required: "State is required" }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
              }) => (
                <FormControl isInvalid={!!error} id="state">
                  <FormLabel htmlFor="state">State</FormLabel>

                  <Select
                    id="long-value-select"
                    instanceId="long-value-select"
                    useBasicStyles
                    size="lg"
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    options={stateData}
                    placeholder="Select a State"
                    colorScheme={"orange"}
                    closeMenuOnSelect={true}
                    chakraStyles={{
                      menuList: (provided) => ({
                        ...provided,
                        bg: "background.tabs",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        bg: state.isSelected
                          ? "secondary.yellow"
                          : "background.tabs",
                        color: "white",
                        _hover: { backgroundColor: "orange" },
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: "primary.gray",
                      }),
                    }}
                  />

                  <FormErrorMessage>{error && error.message}</FormErrorMessage>
                </FormControl>
              )}
            />
            <FormControl id="city" isInvalid={Boolean(errors.city)}>
              <FormLabel htmlFor="city">City</FormLabel>
              <Input
                type="text"
                placeholder="Enter a City"
                color="primary.gray"
                _placeholder={{ color: "primary.gray" }}
                size="lg"
                {...register("city", { required: "City is required" })}
              />
              <FormErrorMessage>
                {errors.city && errors.city.message}
              </FormErrorMessage>
            </FormControl>
          </SimpleGrid>

          <FormControl
            id="mobile_phone_number"
            isInvalid={Boolean(errors.mobile_phone_number)}
          >
            <FormLabel htmlFor="mobile_phone_number">
              Mobile Phone Number
            </FormLabel>
            <Input
              type="number"
              placeholder="(XXX) XXX - XXXX"
              _placeholder={{ color: "primary.gray" }}
              size="lg"
              {...register("mobile_phone_number", {
                required: "Mobile Phone Number is required",
                minLength: {
                  value: 10,
                  message: "Phone number can't be less than 10 digits",
                },
                maxLength: {
                  value: 15,
                  message: "Phone number can't be greater than 15 digits",
                },
              })}
            />
            <FormErrorMessage>
              {errors.mobile_phone_number && errors.mobile_phone_number.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            id="terms_and_conditions"
            isInvalid={Boolean(errors.terms_and_conditions)}
          >
            <FormLabel htmlFor="terms_and_conditions"></FormLabel>
            <Checkbox
              size="lg"
              colorScheme="secondary.yellow"
              iconColor="secondary.yellow"
              {...register("terms_and_conditions", {
                required: "Please read and accept the terms and conditions.",
              })}
            >
              <Text>
                I accept the{" "}
                <Link
                  color="secondary.yellow"
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions
                </Link>{" "}
                &{" "}
                <Link
                  color="secondary.yellow"
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Link>
              </Text>
            </Checkbox>
            <FormErrorMessage>
              {errors.terms_and_conditions &&
                errors.terms_and_conditions.message}
            </FormErrorMessage>
          </FormControl>

          {/*<Text color="secondary.yellow" ><InfoOutlineIcon/> <Link href="https://www.ncight.com" target="_blank" rel="noopener noreferrer">Learn More about nCight</Link></Text>*/}
          <Button variant={"custom"} isLoading={loading} type="submit">
            Sign Up
          </Button>
          <BaseModal
            ChildComponent={VerificationModalEmailContent}
            modal={modal}
            showModal={showModal}
          />
        </Stack>
      </chakra.form>
    </Container>
  );
}
