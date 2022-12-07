import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Link,
    Stack,
    Grid,
    GridItem,
    Text,
    Container,
    FormErrorMessage,
    chakra,
} from '@chakra-ui/react';
import { Select } from "chakra-react-select";
import { InfoOutlineIcon, CheckIcon } from '@chakra-ui/icons';
import { useForm, Controller } from "react-hook-form";
import * as stateData from '../../data/us-states-and-regions';
import { Auth } from 'aws-amplify';
import VerificationModalEmailContent from './VerificationModalEmailContent';
import BaseModal from '../general/BaseModal';
import React,{ useState }from 'react';


interface StateObject {
    state: string
    region: string
}

function formatPhoneNumber(phone_number:string){
    var cleanPhoneNumber = phone_number.replaceAll("-", "");
    var finalPhoneNumber = "+1" + cleanPhoneNumber;
    return finalPhoneNumber;
}

export default function SignUpForm() {
    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [modal, showModal] = useState<boolean>(false);

    async function signUp(username:string,password:string,email:string,
        phone_number:string,family_name:string,given_name:string,orthopedic_practice:string,
        stateObject:StateObject,city:string,
        ) {
        try {
            const user = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,          
                    phone_number,
                    family_name,
                    given_name,
                    "custom:orthopedicPractice": orthopedic_practice,
                    "custom:state": stateObject.state,
                    "custom:city": city,
                    "custom:region": stateObject.region,
                },
            });
    
            if(user){
                showModal(true);
            }
        } catch (error) {
            console.log('error signing up:', error);
        }
    }


    const onSubmit = (data:any) => {
        signUp(
            data.signup_email,
            data.password,
            data.signup_email,
            formatPhoneNumber(data.mobile_phone_number),
            data.last_name,
            data.first_name,
            data.orthopedic_practice,
            JSON.parse(`"${data.state.value}"`),
            data.city,
        )
    };
    
    return (
        <Container maxW='lg' centerContent>
            <chakra.form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} maxW={'lg'}>
                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                        <GridItem>
                            <FormControl id="first_name" isInvalid={Boolean(errors.first_name)}>
                                <FormLabel htmlFor='first_name'>First Name</FormLabel>
                                <Input type="text" size='lg' {...register("first_name", { required: 'First Name is required'})}/>
                                <FormErrorMessage>{errors.first_name && errors.first_name.message}</FormErrorMessage>
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl id="last_name" isInvalid={Boolean(errors.last_name)}>
                                <FormLabel htmlFor='last_name'>Last Name</FormLabel>
                                <Input type="text" size='lg' {...register("last_name", { required: 'Last Name is required'})}/>
                                <FormErrorMessage>{errors.last_name && errors.last_name.message}</FormErrorMessage>
                            </FormControl>
                        </GridItem>
                    </Grid>
                    <FormControl id="signup_email" isInvalid={Boolean(errors.signup_email)}>
                        <FormLabel htmlFor='signup_email'>Email address</FormLabel>
                        <Input type="email" size='lg' {...register("signup_email", { required: 'Email is required'})}/>
                        <FormErrorMessage>{errors.signup_email && errors.signup_email.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="signup-password">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" size='lg' {...register("password")}/>
                        <FormErrorMessage>Password is required.</FormErrorMessage>
                        <FormHelperText fontWeight="700" color="secondary.yellow"><CheckIcon  color={"primary.gray"}/> 8 characters</FormHelperText>
                        <FormHelperText fontWeight="700" color="secondary.yellow"><CheckIcon color={"primary.gray"}/>  at least 1 uppercase letter</FormHelperText>
                        <FormHelperText fontWeight="700" color="secondary.yellow"><CheckIcon color={"primary.gray"}/> at least 1 lowercase letter</FormHelperText>
                        <FormHelperText fontWeight="700" color="secondary.yellow"><CheckIcon color={"primary.gray"}/> at least 1 special character</FormHelperText>
                        <FormHelperText fontWeight="700" color="secondary.yellow"><CheckIcon color={"primary.gray"}/> at least 1 number</FormHelperText>
                    </FormControl>
                    <FormControl id="orthopedic_practice" isInvalid={Boolean(errors.orthopedic_practice)}>
                        <FormLabel htmlFor='orthopedic_practice'>Name of Orthopedic Practice</FormLabel>
                        <Input type="text" placeholder="Practice Name" _placeholder={{ color: 'primary.gray' }} size='lg' {...register("orthopedic_practice",{ required: 'Orthopedic Practice is required'})}/>
                        <FormErrorMessage>{errors.orthopedic_practice && errors.orthopedic_practice.message}</FormErrorMessage>
                    </FormControl>
                    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                        <GridItem>
                        <Controller
                            control={control}
                            name="state"
                            rules={{ required: "State is required" }}
                            render={({field: { onChange, onBlur, value, name, ref }, fieldState: { error }}) => (
                                <FormControl isInvalid={!!error} id="state">
                                    <FormLabel htmlFor='state'>State</FormLabel>

                                    <Select
                                        id="long-value-select" 
                                        instanceId="long-value-select"
                                        useBasicStyles
                                        size='lg'
                                        name={name}
                                        ref={ref}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        options={stateData}
                                        placeholder="Select a State"
                                        closeMenuOnSelect={true}
                                        chakraStyles={{
                                            menuList:(provided) =>({
                                                ...provided,
                                                bg: 'background.tabs',
                                            }),
                                            option: (provided,state)=>({
                                                ...provided,
                                                bg: state.isSelected ? 'secondary.yellow' : 'background.tabs',
                                            }),
                                            placeholder: (provided) => ({
                                                ...provided,
                                                color: 'primary.gray'
                                            })
                                        }}
                                    />

                                    <FormErrorMessage>{error && error.message}</FormErrorMessage>
                                </FormControl>
                            )}
                        />
                        </GridItem>
                        <GridItem>
                            <FormControl id="city" isInvalid={Boolean(errors.city)}>
                                <FormLabel htmlFor='city'>City</FormLabel>
                                <Input type="text" placeholder='Enter a City' color="primary.gray" _placeholder={{ color: 'primary.gray' }} size='lg' {...register("city",{ required: 'City is required'})}/>
                                <FormErrorMessage>{errors.city && errors.city.message}</FormErrorMessage>
                            </FormControl>
                        </GridItem>
                    </Grid>
                    <FormControl id="mobile_phone_number" isInvalid={Boolean(errors.mobile_phone_number)}>
                        <FormLabel htmlFor='mobile_phone_number'>Mobile Phone Number</FormLabel>
                        <Input type="tel" placeholder="(XXX) XXX - XXXX" _placeholder={{ color: 'primary.gray' }} size='lg' {...register("mobile_phone_number", { required: 'Mobile Phone Number is required'})}/>
                        <FormErrorMessage>{errors.mobile_phone_number && errors.mobile_phone_number.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="terms_and_conditions" isInvalid={Boolean(errors.terms_and_conditions)}>
                        <FormLabel htmlFor='terms_and_conditions'></FormLabel>
                        <Checkbox size='lg' colorScheme='secondary.yellow' iconColor='secondary.yellow' {...register("terms_and_conditions",{ required: 'Please read and accept the terms and conditions.'})}>
                            <Text>
                                I accept the <Link color="secondary.yellow" href="https://www.ncight.com" target="_blank" rel="noopener noreferrer">Terms and Conditions & Privacy Policy</Link>
                            </Text>
                        </Checkbox>
                        <FormErrorMessage>{errors.terms_and_conditions && errors.terms_and_conditions.message}</FormErrorMessage>
                    </FormControl>

                    {/*<Text color="secondary.yellow" ><InfoOutlineIcon/> <Link href="https://www.ncight.com" target="_blank" rel="noopener noreferrer">Learn More about nCight</Link></Text>*/}
                    <Button variant='outline' isLoading={isSubmitting} type="submit" borderRadius= '3xl' _hover={{ bg:'primary.white', borderColor:'secondary.yellow', color:'secondary.yellow'}}  bg='secondary.yellow' color="primary.white">Sign Up</Button>
                    <BaseModal ChildComponent={VerificationModalEmailContent} modal={modal} showModal={showModal}/>
            </Stack>
            </chakra.form>
        </Container>
        
    )
}
