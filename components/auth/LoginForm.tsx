import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Container
} from '@chakra-ui/react';


export default function LoginForm() {
    return (
      <Container maxW='lg'>
        <Stack spacing={4} w={'full'} maxW={'lg'}>
          <FormControl id="login-email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Link color={'blue.500'}>Forgot password?</Link>
            </Stack>
            <Button variant='outline' type="submit" borderRadius= '3xl' _hover={{ bg:'primary.white', borderColor:'secondary.yellow', color:'secondary.yellow'}}  bg='secondary.yellow' color="primary.white">
              Login in
            </Button>
          </Stack>
        </Stack>
      </Container>
    );
}