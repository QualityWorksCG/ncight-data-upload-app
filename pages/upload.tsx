import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Link,
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
import { FaRegThumbsUp } from "react-icons/fa";
import { BsImageFill } from "react-icons/bs";
import { FileModule } from "../modules/File";
import { AiFillDelete, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { MdHideImage } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { GetUrlsAndUpload } from "../local-api/Upload";
import useUser from "../lib/useUser";
import { v4 as uuidv4 } from "uuid";
import { Select } from "chakra-react-select";
import Router from "next/router";
import { AxiosError } from "axios";

const Upload: PageWithLayout = () => {
  const {
    handleSubmit,
    control,
    unregister,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      dateOfSurgery: new Date(),
    },
  });
  const isImplant = watch("isImplant");

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
    setFileError("");
    let uploadList: any = [];
    files.map((file) => {
      uploadList.push({
        fileName: file.name,
        imageType: values.bodyPart,
        surgeryDate: values.dateOfSurgery,
        isImplantCase: values.isImplant,
        implantCount:
          values.isImplant === "No" ? 0 : values.numberOfImplants.value,
        contentType: file.type,
      });
    });

    GetUrlsAndUpload(
      { uploadList: uploadList, procedureId: uuidv4() },
      files,
      user
    )
      .then((val: any) => {
        onSuccessOpen();
        isLoading(false);
      })
      .catch((error: AxiosError) => {
        onErrorOpen();
        isLoading(false);
      });
  });
  const [files, setFiles] = useState<FileModule[]>([]);
  const [fileError, setFileError] = useState<string>("");
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/tiff": [".tiff"],
      "image/bmp": [".bmp"],
    },
    maxSize: 10000000,
    onDrop: (acceptedFiles, fileRejections) => {
      setFileError("");
      let oldFiles = files;
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            setFileError(
              `Error: 1 or more files weren't selected as they exceeded 10 mb. Please ensure that your files are not too large`
            );
          }
          if (err.code === "file-invalid-type") {
            setFileError(
              `Error: Invalid file type selected. File type must be .png .jpeg .tiff or .bmp`
            );
          }
        });
      });
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
    setFileError("");
  };

  const removeAll = () => {
    setFiles([]);
    setFileError("");
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

    setItemOffset(newOffset);
  };

  return (
    <>
      <Head>
        <title>Upload</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button
        w={["100%", "20%"]}
        onClick={() => {
          Router.push("/home");
        }}
        my={4}
        variant={"custom_outline"}
      >
        Cancel
      </Button>
      <Stack spacing={6} borderRadius={"lg"} p={4} bg={"background.tabs"}>
        <FormControl isInvalid={errors.bodyPart != null} isRequired>
          <FormLabel color={"white"} fontSize={"xl"}>
            What body part are you uploading images for?
          </FormLabel>
          <Controller
            control={control}
            name="bodyPart"
            rules={{
              required: { value: true, message: "Please select an option" },
            }}
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
                <SimpleGrid spacing={4} columns={[2, 2, 3, 4]}>
                  <Box
                    p={2}
                    borderWidth={1}
                    borderRadius={"lg"}
                    borderColor={errors.bodyPart != null ? "red.500" : ""}
                    _hover={{
                      cursor: "pointer",
                    }}
                  >
                    <Radio w={"100%"} h={"100%"} value="knee" id="radio-2">
                      <Text color={"white"}>Knee</Text>
                    </Radio>
                  </Box>
                  <Box
                    p={2}
                    borderWidth={1}
                    borderRadius={"lg"}
                    borderColor={errors.bodyPart != null ? "red.500" : ""}
                  >
                    <Radio w={"100%"} h={"100%"} value="shoulder" id="radio-2">
                      <Text color={"white"}>Shoulder</Text>
                    </Radio>
                  </Box>
                  <Box
                    p={2}
                    borderWidth={1}
                    borderRadius={"lg"}
                    borderColor={errors.bodyPart != null ? "red.500" : ""}
                    _hover={{
                      cursor: "pointer",
                    }}
                  >
                    <Radio w={"100%"} h={"100%"} value="hip" id="radio-2">
                      <Text color={"white"}>Hip</Text>
                    </Radio>
                  </Box>
                  <Box
                    p={2}
                    borderWidth={1}
                    borderRadius={"lg"}
                    borderColor={errors.bodyPart != null ? "red.500" : ""}
                    _hover={{
                      cursor: "pointer",
                    }}
                  >
                    <Radio w={"100%"} h={"100%"} value="elbow" id="radio-2">
                      <Text color={"white"}>Elbow</Text>
                    </Radio>
                  </Box>
                </SimpleGrid>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>{errors.bodyPart?.message}</FormErrorMessage>
        </FormControl>
        <SimpleGrid spacing={4} columns={[1, 2, 3, 4]}>
          <FormControl isInvalid={errors.dateOfSurgery != null} isRequired>
            <FormLabel color={"white"} fontSize={"xl"}>
              Date of surgery?
            </FormLabel>
            <Controller
              control={control}
              name="dateOfSurgery"
              rules={{
                required: { value: true, message: "Date is required!" },
              }}
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
        </SimpleGrid>
        <FormControl isInvalid={errors.isImplant != null} isRequired>
          <FormLabel color={"white"} fontSize={"xl"}>
            Is this an implant case?
          </FormLabel>
          <Controller
            control={control}
            name="isImplant"
            rules={{
              required: { value: true, message: " Please select an option" },
            }}
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
                <SimpleGrid spacing={4} columns={[2, 2, 3, 4]}>
                  <Box
                    p={2}
                    borderWidth={1}
                    borderRadius={"lg"}
                    borderColor={errors.isImplant != null ? "red.500" : ""}
                    _hover={{
                      cursor: "pointer",
                    }}
                  >
                    <Radio h={"100%"} w={"100%"} value="Yes" id="radio-2">
                      <Text color={"white"}>Yes</Text>
                    </Radio>
                  </Box>
                  <Box
                    p={2}
                    borderWidth={1}
                    borderRadius={"lg"}
                    borderColor={errors.isImplant != null ? "red.500" : ""}
                    _hover={{
                      cursor: "pointer",
                    }}
                  >
                    <Radio h={"100%"} w={"100%"} value="No" id="radio-2">
                      <Text color={"white"}>No</Text>
                    </Radio>
                  </Box>
                </SimpleGrid>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>{errors.isImplant?.message}</FormErrorMessage>
        </FormControl>

        <SimpleGrid spacing={4} columns={[1, 2, 3, 4]}>
          {isImplant === "Yes" && (
            <FormControl isInvalid={errors.numberOfImplants != null} isRequired>
              <FormLabel color={"white"} fontSize={"xl"}>
                How many implants did you use?
              </FormLabel>
              <Controller
                control={control}
                name="numberOfImplants"
                rules={{
                  required: { value: true, message: "Field is required!" },
                }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={value}
                    onChange={onChange}
                    useBasicStyles
                    options={selectValues}
                    colorScheme={"orange"}
                    chakraStyles={{
                      input: (provided) => ({
                        ...provided,
                      }),
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
          )}
        </SimpleGrid>

        <FormControl isInvalid={errors?.numberOfFiles != null} isRequired>
          <FormLabel color={"white"} fontSize={"xl"}>
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
                backgroundColor={"#707070"}
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
                <BsImageFill fontSize={60} color="#D8DADA" />
                <Text color={"white"}>
                  <Link color={"orange"}>Click to upload </Link>or drag and drop
                  files here
                </Text>
                <Text color={"white"}>Maximum file size is 10 MB</Text>
                <Text color={"white"}>
                  Accepted image formats are png, jpeg, bitmap and tiff.
                </Text>
              </VStack>
            )}
          />

          <FormErrorMessage>{errors?.numberOfFiles?.message}</FormErrorMessage>
        </FormControl>
        <Text py={4} color={"red.500"}>
          {fileError.toString()}
        </Text>

        {files.length > 0 && (
          <FormControl>
            <HStack
              pb={4}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <FormLabel color={"white"} fontSize={"xl"}>
                Attached Files ({files.length > 0 && files.length})
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

            <SimpleGrid spacing={2} columns={[2, 2, 3, 3]}>
              {currentItems.map((file) => {
                return (
                  <Box position={"relative"}>
                    <IconButton
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
                      bg={file.type === "image/tiff" ? "gray.300" : ""}
                      padding={file.type === "image/tiff" ? 8 : ""}
                      borderRadius={"lg"}
                      src={file.preview}
                      fallbackSrc={
                        file.type === "image/tiff"
                          ? "https://cdn-icons-png.flaticon.com/512/80/80549.png"
                          : ""
                      }
                      alt="Alt Image"
                    />
                  </Box>
                );
              })}
            </SimpleGrid>

            <Spacer py={4} />
            {files.length > 0 && (
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
            )}
          </FormControl>
        )}

        <Center w={"full"}>
          <Button
            w={["full", "50%", "40%"]}
            variant={"custom"}
            onClick={() => {
              onSubmit();
            }}
            isLoading={loading}
          >
            {loading ? "Upload files, please wait....." : "Submit"}
          </Button>
        </Center>

        <Modal size={"lg"} isOpen={isSuccessOpen} onClose={onSuccessClose}>
          <ModalOverlay />
          <ModalContent w={"100vw"} bg="background.tabs">
            <ModalHeader></ModalHeader>
            <ModalCloseButton color={"#D8DADA"} fontSize={20} />
            <ModalBody>
              <VStack spacing={6}>
                <FaRegThumbsUp fontSize={150} color={"#F09E28"} />
                <Text py={4} fontSize={"larger"} color={"#D8DADA"}>
                  Your upload was successful!
                </Text>
                <Button
                  variant={"custom"}
                  w={"full"}
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
                    Router.reload();
                  }}
                >
                  Upload another case
                </Button>
                <Button
                  variant={"custom_outline"}
                  w={"full"}
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
                <Spacer />
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
                <Button variant={"custom"} onClick={onErrorClose}>
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
