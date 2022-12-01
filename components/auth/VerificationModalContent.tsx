import {
    Stack,
    Image,
    Center,
    Flex,
    Button
  } from '@chakra-ui/react';
import {useRouter} from 'next/navigation';

export default function VerificationModalContent(props:any) {
    const Router = useRouter();
    return(
        <Flex flex={1} justify={'center'}>
        <Stack
        color={'primary.gray'}
        spacing={'10'}
        >
                <Image
                        alt={'thumbs up icon'}
                        src={
                            //'https://drive.google.com/uc?id=1X-OvxjYqRwGjS8-n6l3wuWrWspoKMNwc'
                            '/vectors/thumbs_up_yellow.png'
                        }
                    />

            <Center textAlign={'center'}>
                You've been Successfully Verified!
            </Center>
            <Button onClick={()=>{Router.push('/')}} borderRadius= '3xl' _hover={{ bg:'primary.white', borderColor:'secondary.yellow', color:'secondary.yellow'}}  bg='secondary.yellow' color="primary.white">
                Go back to Login
            </Button>
        </Stack>
        </Flex>
    )
}