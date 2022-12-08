import {
    Container,
    Image,
    Show,
    Flex
} from '@chakra-ui/react';
import React from 'react';

export default function BaseLogoPage({ ChildComponent }: { ChildComponent: React.FC }) {
    return (
        <Container bg={'background.main'} minW={'100vw'} minH={'100vh'} >
        {/* <Show above='sm'> */}
            <Flex flex={1} justifyContent={'center'} p={6}>
                <Image
                    alt={'nCight Logo'}
                    src={
                        'https://drive.google.com/uc?id=1KhpLDZ7pTBmUh2_h3TWkvA1mkrI4OXwL'
                    }
                    boxSize='100px'
                />
            </Flex>
        {/* </Show> */}
        <ChildComponent/>
        </Container>
    );
}