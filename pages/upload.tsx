import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Spacer,
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
import { File } from "../modules/File";
import { AiFillDelete, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ReactPaginate from "react-paginate";

const Upload: PageWithLayout = () => {
  const {
    handleSubmit,
    control,
    unregister,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((values) => {
    values.files = files;
    console.log(values);
  });
  const watchFiles = watch("numberOfFiles");
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
            fileName: `image-${index}`,
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

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = files.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(files.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % files.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
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
                colorScheme={"yellow"}
                value={value}
              >
                <Stack spacing={4} direction={["column", "column", "row"]}>
                  <Box
                    p={2}
                    borderWidth={1}
                    borderRadius={"lg"}
                    borderColor={errors.bodyParts != null ? "red.500" : ""}
                  >
                    <Radio value="knee" id="radio-2">
                      <Text color={"white"}>Knee</Text>
                    </Radio>
                  </Box>
                  <Box
                    p={2}
                    borderWidth={1}
                    borderRadius={"lg"}
                    borderColor={errors.bodyParts != null ? "red.500" : ""}
                  >
                    <Radio value="shoulder" id="radio-2">
                      <Text color={"white"}>Shoulder</Text>
                    </Radio>
                  </Box>
                  <Box
                    p={2}
                    borderWidth={1}
                    borderRadius={"lg"}
                    borderColor={errors.bodyParts != null ? "red.500" : ""}
                  >
                    <Radio value="hip-admin" id="radio-2">
                      <Text color={"white"}>Hip</Text>
                    </Radio>
                  </Box>
                  <Box
                    p={2}
                    borderWidth={1}
                    borderRadius={"lg"}
                    borderColor={errors.bodyParts != null ? "red.500" : ""}
                  >
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
            render={({ field: { onChange, value } }) => (
              <DatePicker
                maxDate={new Date()}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={value}
                selected={
                  getValues("dateOfSurgery")
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
                colorScheme={"yellow"}
                value={value}
              >
                <Stack spacing={4} direction={["column", "column", "row"]}>
                  <Box
                    p={2}
                    borderWidth={1}
                    borderRadius={"lg"}
                    borderColor={errors.isImplant != null ? "red.500" : ""}
                  >
                    <Radio value="Yes" id="radio-2">
                      <Text color={"white"}>Yes</Text>
                    </Radio>
                  </Box>
                  <Box
                    p={2}
                    borderWidth={1}
                    borderRadius={"lg"}
                    borderColor={errors.isImplant != null ? "red.500" : ""}
                  >
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
              <Input value={value} onChange={onChange} />
            )}
          />
          <FormErrorMessage>
            {errors.numberOfImplants?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors?.numberOfFiles != null}>
          <FormLabel color={"white"} fontSize={"lg"}>
            Upload and attach images
          </FormLabel>
          <Controller
            control={control}
            name="numberOfFiles"
            rules={{
              validate: () => {
                {
                  if (files.length <= 0) {
                    return "Please upload at least 1 image";
                  }
                }
              },
            }}
            render={({ field: { onChange, value } }) => (
              <VStack
                p={6}
                borderWidth={2}
                borderRadius={"lg"}
                borderStyle={"dashed"}
                textAlign={"center"}
                borderColor={errors?.numberOfFiles != null ? "red" : "white"}
                {...getRootProps({ className: "dropzone" })}
              >
                <input
                  onChange={() => {
                    unregister("numberOfFiles");
                    onChange(files.length);
                  }}
                  value={value}
                  {...getInputProps()}
                />
                <FaFileUpload fontSize={60} color="orange" />
                <Text color={"white"}>
                  Click to upload or drag and drop files here
                </Text>
                <Text color={"white"}>Maximum file size is 50 MB</Text>
              </VStack>
            )}
          />
          {console.log(errors.numberOfFiles)}
          <FormErrorMessage>{errors?.numberOfFiles?.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel color={"white"} fontSize={"lg"}>
            Attached Files
          </FormLabel>
          <SimpleGrid spacing={2} columns={[2, 2, 3, 4]}>
            {currentItems.map((file) => {
              return (
                <Box position={"relative"}>
                  <IconButton
                    zIndex={10}
                    position={"absolute"}
                    m={2}
                    size={"sm"}
                    colorScheme={"red"}
                    aria-label="Search database"
                    icon={<AiFillDelete />}
                    onClick={removeFile(file)}
                  />

                  <Box
                    borderTopRadius={"lg"}
                    opacity={0.6}
                    w={"100%"}
                    bg={"white"}
                    bottom={0}
                    position={"absolute"}
                    h={"50px"}
                    p={2}
                  >
                    <Text color={"black"} noOfLines={1}>
                      {file.fileName}
                    </Text>
                    <Text color={"black"} fontSize={"sm"}>
                      {(file.size / (1024 * 1024)).toFixed(2)} mb
                    </Text>
                  </Box>

                  <Image
                    borderRadius={"lg"}
                    src={file.preview}
                    alt="Dan Abramov"
                  />
                </Box>
              );
            })}
          </SimpleGrid>
          <Spacer py={4} />
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <IconButton
                color={"orange"}
                variant={"unstyled"}
                icon={<AiOutlineRight />}
                aria-label={""}
              />
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel={
              <IconButton
                pl={6}
                color={"orange"}
                variant={"unstyled"}
                icon={<AiOutlineLeft />}
                aria-label={""}
              />
            }
            containerClassName={"pagination"}
            pageLinkClassName={"page-num"}
            activeLinkClassName={"active"}
          />
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
