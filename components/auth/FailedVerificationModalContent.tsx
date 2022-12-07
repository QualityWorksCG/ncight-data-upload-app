import {
    Stack,
    Image,
    Center,
    Heading,
    Button,
  } from '@chakra-ui/react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/navigation'

export default function FailedVerificationModalContent(props:any) {
    const Router = useRouter();

    async function resendConfirmationCode(username:string) {
        try {
            await Auth.resendSignUp(username);
        } catch (err) {
            console.log('error resending code: ', err);
        }
    }

    return(
        <Stack
        color={'primary.gray'}
        spacing={2}
        >
            <Center>
                <Image
                    alt={'nCight Logo'}
                    src={
                        'https://drive.google.com/uc?id=18z2Eiyh6kFmgHXsaCqWGQK85VDatuFut'
                    }
                    boxSize={'50%'}
                />
            </Center>
            <Center>
                <Heading textAlign={'center'} fontSize={{ base: '2xl', md: '3xl' }}>
                    Unable to Verify your account!
                </Heading>
            </Center>

            <Center textAlign={'center'}>
                Your account could not be verified. Please return to the Login Page or resend your verification link.
            </Center>
            <Stack spacing={2} pt={'2'} >
                <Button borderRadius= '3xl'  bg='secondary.yellow' color="primary.white" onClick={()=>(resendConfirmationCode(new URLSearchParams(window.location.search).get("email")|| "",))}>
                    Resend Verification
                </Button>
                <Button variant='outline' borderRadius= '3xl'  borderColor={'secondary.yellow'} bg='transparent' color="secondary.yellow" onClick={()=>{Router.push('/')}}>
                    Go to login
                </Button>
            </Stack>

        </Stack>
    )
}