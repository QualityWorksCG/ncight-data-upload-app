import type { NextPage } from 'next'
import Router from 'next/router'
import styles from '../styles/page.module.css'
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';
import {
  Flex,
  Stack,
  VStack,
  HStack,
  Image,
  Show,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Box
} from '@chakra-ui/react';

const Home: NextPage = () => {
  const moveToRequireAuthenticationPage = () => {
    Router.push('/admin')
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} bg='background.main'>
    <Show above='lg'>
    <Flex flex={1}>
        <Image
          alt={'Sign up Image'}
          objectFit={'cover'}
          src={
            'https://drive.google.com/uc?id=10o5dt6LjNRdlLkjepmKK9ALU4Y1epgHs'
          }
        />
    </Flex>
    </Show>
    <Flex flex={1} align={'center'} justify={'center'} bg='background.main'>
      <VStack spacing={8} color="primary.gray">
          <Heading>Welcome to nCight!</Heading>
      <Tabs variant='unstyled' size='lg' >
          <TabList w={'2xl'}>
            <HStack borderTopRadius='6px' bg='background.tabs'>
              <Tab w={'10rem'} _selected={{ bg: 'secondary.yellow', borderTopLeftRadius:'md' }}>Login</Tab>
              <Tab w={'10rem'} _selected={{ bg: 'secondary.yellow', borderTopRightRadius:'md' }}>Sign Up</Tab>
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
      </VStack>
    </Flex>
  </Stack>
  )
}

export default Home
