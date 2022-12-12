import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Layout from "../components/Layout/Layout";
import { PageWithLayout } from "../modules/Layout";
import DatePicker from "react-datepicker";
import { useDropzone } from "react-dropzone";
import { FaFileUpload, FaRegThumbsUp } from "react-icons/fa";
import { FileModule } from "../modules/File";
import { AiFillDelete, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { MdHideImage } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { GetUrlsAndUpload } from "../local-api/Upload";
import useUser from "../lib/useUser";
import { v4 as uuidv4 } from "uuid";
import { Select } from "chakra-react-select";
import Router from "next/router";

const Upload: PageWithLayout = () => {
  const {
    handleSubmit,
    control,
    unregister,
    getValues,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      dateOfSurgery: new Date(),
    },
  });
  const [loading, isLoading] = useState(false);
  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();
  const { user } = useUser();
  const onSubmit = handleSubmit(async (values) => {
    isLoading(true);
    let uploadList: any = [];
    files.map((file) => {
      uploadList.push({
        fileName: file.name,
        imageType: values.bodyPart,
        surgeryDate: values.dateOfSurgery,
        isImplantCase: values.isImplant,
        implantCount: values.numberOfImplants,
        contentType: file.type,
      });
    });

    try {
      await GetUrlsAndUpload(
        { uploadList: uploadList, patientId: uuidv4() },
        files,
        user
      );
      onSuccessOpen();
    } catch (error) {
      onErrorOpen();
    }
    isLoading(false);
  });
  const [files, setFiles] = useState<FileModule[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      let oldFiles = files;
      setFiles(
        oldFiles.concat(
          //@ts-ignore
          acceptedFiles.map((file, index) => {
            const newFile = new File(
              [file],
              `${uuidv4()}.${file.type.split("/")[1]}`,
              { type: file.type }
            );
            Object.assign(newFile, {
              preview: URL.createObjectURL(file),
            });
            return newFile;
          })
        )
      );
    },
  });
  const removeFile = (file: FileModule) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const removeAll = () => {
    setFiles([]);
  };

  let selectValues = [
    {
      label: "1",
      value: "1",
      color: "white",
    },
    {
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },
    {
      label: "4",
      value: "4",
    },
    {
      label: "5",
      value: "5",
    },
    {
      label: "6",
      value: "6",
    },
    {
      label: "7",
      value: "7",
    },
    {
      label: "8",
      value: "8",
    },
    {
      label: "9",
      value: "9",
    },
    {
      label: "10",
      value: "10",
    },
  ];
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
        <FormControl isInvalid={errors.bodyPart != null} isRequired>
          <FormLabel color={"white"} fontSize={"lg"}>
            What body part are you uploading images for?
          </FormLabel>
          <Controller
            control={control}
            name="bodyPart"
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
                    borderColor={errors.bodyPart != null ? "red.500" : ""}
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
                    borderColor={errors.bodyPart != null ? "red.500" : ""}
                  >
                    <Radio value="elbow" id="radio-2">
                      <Text color={"white"}>Elbow</Text>
                    </Radio>
                  </Box>
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>{errors.bodyPart?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.dateOfSurgery != null} isRequired>
          <FormLabel color={"white"} fontSize={"lg"}>
            Date of surgery?
          </FormLabel>
          <Controller
            control={control}
            name="dateOfSurgery"
            rules={{ required: { value: true, message: "Date is required!" } }}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                maxDate={new Date()}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={new Date(getValues("dateOfSurgery") as string)}
                onChange={onChange}
                dateFormat="MM/d/yyyy"
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
              // <Input value={value} onChange={onChange} />
              <Select
                value={value}
                onChange={onChange}
                useBasicStyles
                options={selectValues}
                colorScheme={"orange"}
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
              ></Select>
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

          <FormErrorMessage>{errors?.numberOfFiles?.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <HStack pb={4} justifyContent={"space-between"} alignItems={"center"}>
            <FormLabel color={"white"} fontSize={"lg"}>
              Attached Files
            </FormLabel>
            <Button
              onClick={() => {
                removeAll();
              }}
              size={"sm"}
              colorScheme={"red"}
            >
              Delete All
            </Button>
          </HStack>

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
                      {file.name}
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
          isLoading={loading}
        >
          {loading ? "Upload files, please wait....." : "Confirm"}
        </Button>

        <Modal size={"lg"} isOpen={isSuccessOpen} onClose={onSuccessClose}>
          <ModalOverlay />
          <ModalContent w={"100vw"} bg="background.tabs">
            <ModalHeader></ModalHeader>
            <ModalCloseButton color={"#D8DADA"} fontSize={20} />
            <ModalBody>
              <VStack spacing={6}>
                <FaRegThumbsUp fontSize={150} color={"#F09E28"} />
                <Text fontSize={"larger"} color={"#D8DADA"}>
                  Your upload was successful!
                </Text>
                <Button
                  borderRadius={"full"}
                  bg={"secondary.yellow"}
                  _hover={{ bg: "secondary.yellow_light" }}
                  w={"full"}
                  color={"white"}
                  onClick={() => {
                    reset({
                      bodyPart: null,
                      dateOfSurgery: new Date(),
                      isImplant: null,
                      numberOfImplants: null,
                      numberOfFiles: null,
                    });
                    removeAll();
                    onSuccessClose();
                  }}
                >
                  Upload another case
                </Button>
                <Button
                  borderRadius={"full"}
                  borderColor={"secondary.yellow_light"}
                  _hover={{ bg: "" }}
                  w={"full"}
                  variant="outline"
                  color={"secondary.yellow_light"}
                  onClick={() => {
                    reset({
                      bodyPart: null,
                      dateOfSurgery: new Date(),
                      isImplant: null,
                      numberOfImplants: null,
                      numberOfFiles: null,
                    });
                    removeAll();
                    Router.push("/home");
                  }}
                >
                  Go back to home
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal size={"lg"} isOpen={isErrorOpen} onClose={onErrorClose}>
          <ModalOverlay />
          <ModalContent w={"100vw"} bg="background.tabs">
            <ModalHeader></ModalHeader>
            <ModalCloseButton color={"#D8DADA"} fontSize={20} />
            <ModalBody>
              <VStack spacing={6}>
                <MdHideImage fontSize={150} color={"#F09E28"} />
                <Text fontSize={"larger"} color={"#D8DADA"}>
                  Your upload was unsuccessful! Please try again
                </Text>
                <Button
                  borderRadius={"full"}
                  bg={"secondary.yellow"}
                  _hover={{ bg: "secondary.yellow_light" }}
                  w={"full"}
                  color={"white"}
                  onClick={onErrorClose}
                >
                  Try again
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Stack>
    </>
  );
};

Upload.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default Upload;
