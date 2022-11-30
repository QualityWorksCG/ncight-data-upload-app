import {
    Button,
    FormControl,
    Flex,
    Stack,
    HStack,
    Image,
    PinInput,
    PinInputField,
    Show,
    Hide,
    Center,
    Heading,
    chakra
  } from '@chakra-ui/react';
import { useRouter } from 'next/navigation'
import { useForm, Controller } from "react-hook-form";
import React,{ useState }from 'react';
import { Auth } from 'aws-amplify';
import VerificationModalContent from './VerificationModalContent';
import FailedVerificationModalContent from './FailedVerificationModalContent';
import BaseModal from '../general/BaseModal';

export default function VerificationPageContent(props:any) {
    const { handleSubmit, control } = useForm();
    const Router = useRouter();

    const [successModal, showSuccessModal] = useState<boolean>(false);
    const [errorModal, showErrorModal] = useState<boolean>(false);

    async function confirmSignUp(username:string, confirmationCode:string) {
        try {
            const confirmUser = await Auth.confirmSignUp(username,confirmationCode);
            
            if(confirmUser){
                showSuccessModal(true);
            }
            
        } catch (error) {
            showErrorModal(true);
            console.log('error signing up:', error);
        }
    }

    const onSubmit = (data:any) => {
        confirmSignUp(
            decodeURIComponent(new URLSearchParams(window.location.search).get("email")|| ""),
            data.confirmation_code
        )
    };

    return (<Flex
        align={'center'}
        justify={'center'}
        bg={'background.main'}>
    <Stack
        maxW={'full'}
        bg={'background.main'}
        direction={{ base: 'column'}}
        color={'primary.gray'}
    >
         <Hide above='sm'>
            <Show below='md'>
                <Center>
                    <Image
                        alt={'nCight Logo'}
                        src={
                            'https://drive.google.com/uc?id=1KhpLDZ7pTBmUh2_h3TWkvA1mkrI4OXwL'
                        }
                        boxSize='100px'
                    />
                </Center>
            </Show>
        </Hide>

        <Image
            alt={'Verify Email Image'}
            src={
                'https://drive.google.com/uc?id=1gLWzKn-0r8T-c9jbocRcyNY1A1LJzXEl'
            }
        />

    <Center>
      <Heading textAlign={'center'} fontSize={{ base: '2xl', md: '3xl' }}>
        Enter Verification Code
      </Heading>
    </Center>

    <Center
        textAlign={'center'}
      >
      We've sent a verification code to your email, username@mail.com. Please check your email for the code.
    </Center>

    <chakra.form onSubmit={handleSubmit(onSubmit)} w={'inherit'}>
        <Controller
            control={control}
            name="confirmation_code"
            render={({ field: { ref, ...rest } }) => (
                <FormControl>
                <Center>
                    <HStack>
                    <PinInput 
                        otp                                         
                        {...rest}
                        size={'lg'} 
                    >
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                    </PinInput>
                    </HStack>
                </Center>
                </FormControl>
            )}
        />



    <Center>
        <Stack spacing={6} pt={'10'} >
        <Button type="submit" w={'xs'} borderRadius= '3xl'  bg='secondary.yellow' color="primary.white">
            Verify
        </Button>
        <Button w={'xs'} variant='outline' borderRadius= '3xl'  borderColor={'secondary.yellow'} bg='transparent' color="secondary.yellow">
            Cancel
        </Button>
        <BaseModal ChildComponent={FailedVerificationModalContent} modal={errorModal} showModal={showErrorModal}/>
        <BaseModal ChildComponent={VerificationModalContent} modal={successModal} showModal={showSuccessModal}/>
        </Stack>
    </Center>
    </chakra.form> 
  </Stack>
  </Flex>
  );
}