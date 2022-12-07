import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Link,
    Stack,
    Container,
    chakra,
} from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { Auth } from 'aws-amplify';
import {useRouter} from 'next/navigation';



export default function LoginForm(props:any) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const showLoginError = props.showLoginError;
  const Router = useRouter();
  // const moveToDashboard = () => {
  //   Router.push('/dashboard')
  // }

  async function signIn(username:string, password:string) {
    try {
        const user = await Auth.signIn(username, password);
        if (user){
          Router.push('/dashboard')
          console.log('Success', user)
        }
    } catch (error:any) {
      console.log(error);
        if(error.message === 'User does not exist.'){
            showLoginError({isError:true, errorMessage: 'Invalid username or password!'})
        }
        if(error.message === 'User is not confirmed.'){
          showLoginError({isError:true, errorMessage: 'Invalid username or password!'})
        }
        if(error.message === 'Password attempts exceeded'){
          showLoginError({isError:true, errorMessage: 'Too many login attempts. Your account is now locked for 15 mins. If you still need help, please contact info@ncight.com'})
        }
        if(error.message === 'Incorrect username or password.'){
          showLoginError({isError:true, errorMessage: 'Invalid username or password!'})
        }
    }
}

  const onSubmit = (data:any) => {
    console.log(data);
    signIn(
      data.email,
      data.password
    );
  };

  return (
    <Container maxW='lg'>
      <chakra.form onSubmit={handleSubmit(onSubmit)} w={'lg'}>
        <Stack spacing={10} w={'full'} maxW={'lg'}>
          <FormControl id="login-email" isInvalid={Boolean(errors.email)}>
            <FormLabel htmlFor='email'>Email address</FormLabel>
            <Input size='lg' type="email" {...register("email", { required: 'Email is required'})} />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={Boolean(errors.password)}>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input size='lg' type="password" {...register("password", { required: 'Password is required'})} />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox size='lg' colorScheme='secondary.yellow' iconColor='secondary.yellow'>Remember me</Checkbox>
              <Link>Forgot password?</Link>
            </Stack>
            <Button size='lg' variant='outline' type="submit" borderRadius= '3xl' _hover={{ bg:'primary.white', borderColor:'secondary.yellow', color:'secondary.yellow'}}  bg='secondary.yellow' color="primary.white">
              Login in
            </Button>
          </Stack>
        </Stack>
      </chakra.form>
    </Container>
  );
}