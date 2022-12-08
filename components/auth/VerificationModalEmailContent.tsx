import {
    Button,
    Flex,
    Image,
    Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation'

export default function VerificationModalEmailContent(props:any) {
    const Router = useRouter();
    return (
      <>
        <Flex flex={1} justifyContent={'center'}>
          <Image
              alt={'Verification Success Image'}
              src={
                //'https://drive.google.com/uc?id=19rAQF9rH3J-NwuC6AJWi7W9k33eLePiN'
                '/images/Email_Verification_Modal_Image.png'
              }
              sizes={'sm'}
            />
        </Flex>
        <Text pt="1.5rem" align={'center'}>We’ve sent you an email to verify your account.</Text>
        <Text align={'center'}>Please follow the instructions in your email to continue.</Text>
        <Text pb="1.5rem" pt="0.5rem" align={'center'}>If you didn’t receive an email, please reach out to info@ncight.com</Text>
        <Button w={'full'} borderRadius= '3xl'  bg='secondary.yellow' color="primary.white" onClick={()=>{Router.refresh()}}>
          Go to Login
        </Button>
      </>
    )
}