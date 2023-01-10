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
  Text,
  HStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const showLoginError = props.showLoginError;
  const Router = useRouter();
  const [loading, isLoading] = useState(false);
  async function Login(username: string, password: string) {
    isLoading(true);

    const user = await signIn("credentials", {
      redirect: false,
      email: username,
      password: password,
    });
    if (user?.error === null) {
      Router.push("/home");
    }
    if (user?.error === "User does not exist.") {
      showLoginError({
        isError: true,
        errorMessage: "Invalid username or password!",
      });
    }
    if (user?.error === "User is not confirmed.") {
      showLoginError({
        isError: true,
        errorMessage: "Invalid username or password!",
      });
    }
    if (user?.error === "Password attempts exceeded") {
      showLoginError({
        isError: true,
        errorMessage:
          "Too many login attempts. Your account is now locked for 15 mins. If you still need help, please contact info@ncight.com",
      });
    }
    if (user?.error === "Incorrect username or password.") {
      showLoginError({
        isError: true,
        errorMessage: "Invalid username or password!",
      });
    }
    isLoading(false);
  }

  const onSubmit = (data: any) => {
    Login(data.email, data.password);
  };

  return (
    <Container maxW="lg">
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={10} w={"full"} maxW={"lg"} pb={5}>
          <FormControl id="login-email" isInvalid={Boolean(errors.email)}>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              size="lg"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            <FormErrorMessage>
              <>{errors.email && errors.email.message}</>
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={Boolean(errors.password)}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              size="lg"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            <FormErrorMessage>
              <>{errors.password && errors.password.message}</>
            </FormErrorMessage>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"end"}
            >
              <Link href="/forgotPassword">Forgot Password?</Link>
            </Stack>
            <Button
              size="lg"
              isLoading={loading}
              variant="custom"
              type="submit"
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </chakra.form>
    </Container>
  );
}
