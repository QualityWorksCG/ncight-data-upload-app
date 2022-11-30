import {
    Stack,
    Image,
    Center,
  } from '@chakra-ui/react';

export default function VerificationModalContent(props:any) {
    return(
        <Stack
        color={'primary.gray'}
        spacing={6}
        >
            <Center>
                <Image
                    alt={'thumbs up icon'}
                    src={
                        'https://drive.google.com/uc?id=1X-OvxjYqRwGjS8-n6l3wuWrWspoKMNwc'
                    }
                    boxSize={'25%'}
                />
            </Center>
            <Center textAlign={'center'}>
                You've been Successfully Verified
            </Center>
        </Stack>
    )
}