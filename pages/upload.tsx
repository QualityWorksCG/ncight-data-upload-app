import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Layout from "../components/Layout/Layout";
import { PageWithLayout } from "../modules/Layout";
import DatePicker from "react-datepicker";
import { useDropzone } from "react-dropzone";
import { FaFileUpload } from "react-icons/fa";
import { ST } from "next/dist/shared/lib/utils";
import { File } from "../modules/File";
import { AiFillDelete } from "react-icons/ai";

const Upload: PageWithLayout = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        //@ts-ignore
        acceptedFiles.map((file, index) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const removeFile = (file: File) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const removeAll = () => {
    setFiles([]);
  };

  return (
    <>
      <Head>
        <title>Upload</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack spacing={6} borderRadius={"lg"} p={4} bg={"background.tabs"}>
        <FormControl isInvalid={errors.bodyParts != null} isRequired>
          <FormLabel color={"white"} fontSize={"lg"}>
            What body part are you uploading images for?
          </FormLabel>
          <Controller
            control={control}
            name="bodyParts"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                defaultValue="text"
                onChange={(value: any) => {
                  onChange(value);
                }}
                id="radio-group"
                colorScheme={"orange"}
                value={value}
              >
                <Stack spacing={4} direction={["column", "column", "row"]}>
                  <Box p={2} borderWidth={1} borderRadius={"lg"}>
                    <Radio value="knee" id="radio-2">
                      <Text color={"white"}>Knee</Text>
                    </Radio>
                  </Box>
                  <Box p={2} borderWidth={1} borderRadius={"lg"}>
                    <Radio value="shoulder" id="radio-2">
                      <Text color={"white"}>Shoulder</Text>
                    </Radio>
                  </Box>
                  <Box p={2} borderWidth={1} borderRadius={"lg"}>
                    <Radio value="hip-admin" id="radio-2">
                      <Text color={"white"}>Hip</Text>
                    </Radio>
                  </Box>
                  <Box p={2} borderWidth={1} borderRadius={"lg"}>
                    <Radio value="elbow" id="radio-2">
                      <Text color={"white"}>Elbow</Text>
                    </Radio>
                  </Box>
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>{errors.dateOfSurgery?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.dateOfSurgery != null} isRequired>
          <FormLabel color={"white"} fontSize={"lg"}>
            Date of surgery?
          </FormLabel>
          <Controller
            control={control}
            name="dateOfSurgery"
            rules={{ required: { value: true, message: "Field is required!" } }}
            render={({ field: { onChange } }) => (
              <DatePicker
                maxDate={new Date()}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={
                  getValues("dob")
                    ? new Date(getValues("dob") as string)
                    : new Date()
                }
                onChange={onChange}
                dateFormat="MMMM d, yyyy"
              />
            )}
          />
        </FormControl>

        <FormControl isInvalid={errors.isImplant != null} isRequired>
          <FormLabel color={"white"} fontSize={"lg"}>
            Is this an implant case?
          </FormLabel>
          <Controller
            control={control}
            name="isImplant"
            rules={{ required: { value: true, message: "Field is required!" } }}
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                defaultValue="text"
                onChange={(value: any) => {
                  onChange(value);
                }}
                id="radio-group"
                colorScheme={"orange"}
                value={value}
              >
                <Stack spacing={4} direction={["column", "column", "row"]}>
                  <Box p={2} borderWidth={1} borderRadius={"lg"}>
                    <Radio value="Yes" id="radio-2">
                      <Text color={"white"}>Yes</Text>
                    </Radio>
                  </Box>
                  <Box p={2} borderWidth={1} borderRadius={"lg"}>
                    <Radio value="No" id="radio-2">
                      <Text color={"white"}>No</Text>
                    </Radio>
                  </Box>
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>{errors.isImplant?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.numberOfImplants != null} isRequired>
          <FormLabel color={"white"} fontSize={"lg"}>
            How many implants did you use?
          </FormLabel>
          <Controller
            control={control}
            name="numberOfImplants"
            rules={{ required: { value: true, message: "Field is required!" } }}
            render={({ field: { onChange, value } }) => (
              <Input
                // borderColor={errors.numberOfImplants?.message ? "red" : ""}
                // color={"white"}
                value={value}
                onChange={onChange}
              />
            )}
          />
          <FormErrorMessage>
            {errors.numberOfImplants?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel color={"white"} fontSize={"lg"}>
            Upload and attach images
          </FormLabel>
          <Controller
            control={control}
            name="files"
            rules={{
              validate: (d) => {
                return "";
              },
            }}
            render={({}) => (
              <VStack
                p={6}
                borderWidth={2}
                borderRadius={"lg"}
                borderStyle={"dashed"}
                textAlign={"center"}
                {...getRootProps({ className: "dropzone" })}
              >
                <input {...getInputProps()} />
                <FaFileUpload fontSize={60} color="orange" />
                <Text color={"white"}>
                  Click to upload or drag and drop files here
                </Text>
                <Text color={"white"}>Maximum file size is 50 MB</Text>
              </VStack>
            )}
          />
          <FormErrorMessage>{errors.files?.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel color={"white"} fontSize={"lg"}>
            Attached Files
          </FormLabel>
          <SimpleGrid spacing={2} columns={[1, 2, 3, 4]}>
            {files.map((file) => {
              return (
                <Box>
                  <HStack
                    position={"absolute"}
                    p={1}
                    ml={["255px", "230px", "235px"]}
                  >
                    <IconButton
                      size={"sm"}
                      colorScheme={"red"}
                      aria-label="Search database"
                      icon={<AiFillDelete />}
                      onClick={removeFile(file)}
                    />
                  </HStack>
                  <Box
                    borderTopRadius={"lg"}
                    opacity={0.6}
                    w={"278px"}
                    mt={250}
                    bg={"white"}
                    position={"absolute"}
                    h={"50px"}
                    p={2}
                  >
                    <Text color={"black"} noOfLines={1}>
                      {file.name}
                    </Text>
                    <Text color={"black"} fontSize={"sm"}>
                      {(file.size / (1024 * 1024)).toFixed(2)} mb
                    </Text>
                  </Box>
                  <Image
                    borderRadius={"lg"}
                    h={300}
                    w={300}
                    src={file.preview}
                    alt="Dan Abramov"
                  />
                </Box>
              );
            })}
          </SimpleGrid>
        </FormControl>
        <Button
          borderRadius={"full"}
          bg={"secondary.yellow"}
          _hover={{ bg: "secondary.yellow_light" }}
          onClick={() => {
            onSubmit();
          }}
        >
          Confirm
        </Button>
      </Stack>
    </>
  );
};

Upload.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default Upload;
