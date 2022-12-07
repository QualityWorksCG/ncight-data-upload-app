import type { NextPage } from 'next'
import Router from 'next/router'
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';
import {
  Flex,
  Stack,
  HStack,
  Image,
  Show,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Hide,
  Center
} from '@chakra-ui/react';

const Home: NextPage = () => {
  const moveToRequireAuthenticationPage = () => {
    Router.push('/admin')
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} bg='background.main'>
      <Show above='md'>
      <Flex >
      <Image
          alt={'Sign up Image'}
          objectFit={'cover'}
          src={
            //'https://drive.google.com/uc?id=10o5dt6LjNRdlLkjepmKK9ALU4Y1epgHs'
            '/images/Welcome_Image.png'
          }
        />
      </Flex>
      </Show>
      <Flex p={8} flex={1} align={'center'} justify={'center'} bg='background.main'>
        <Stack spacing={4} w={'xl'} maxW={'full'} color="primary.gray">
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
          <Heading textAlign={'center'}>Welcome to nCight!</Heading>
          <Tabs variant='unstyled' size='lg' >
            <TabList>
                <HStack borderTopRadius='6px' bg='background.tabs'>
                  <Tab  _selected={{ bg: 'secondary.yellow', borderTopLeftRadius:'md' }}>Login</Tab>
                  <Tab  _selected={{ bg: 'secondary.yellow', borderTopRightRadius:'md' }}>Sign Up</Tab>
                </HStack>
            </TabList>
            <TabPanels bg='background.tabs'>
              <TabPanel>
                <LoginForm/>
              </TabPanel>
              <TabPanel>
                <SignUpForm/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Flex>
    </Stack>
  );
}

export default Home