import {
    Container,
    Image,
    Show,
} from '@chakra-ui/react';
import React from 'react';

export default function BaseLogoPage({ ChildComponent }: { ChildComponent: React.FC }) {
    return (
        <Container bg={'background.main'} minW={'100vw'} minH={'100vh'}>
        <Show above='sm'>
                <Image
                    alt={'nCight Logo'}
                    src={
                        'https://drive.google.com/uc?id=1KhpLDZ7pTBmUh2_h3TWkvA1mkrI4OXwL'
                    }
                    boxSize='100px'
                />
        </Show>
        <ChildComponent/>
        </Container>
    );
}