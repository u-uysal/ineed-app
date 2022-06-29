/* eslint-disable no-useless-escape */
/* eslint-disable no-console */

import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import FormInput from 'src/components/form-fields/FormInput'
 import { Form, Formik } from 'formik'
 import Register from 'src/interfaces/register.interface'
 import * as Yup from 'yup'
import './register.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function RegistePage() {

  const emailAdresses = [
    'Duranakyol71@gmail.com',
    'Test2@gmail.com',
    'Test3@gmail.com'
  ];

  // const upperCaseRegex = /(?=.*[A-Z])/;
  // const numericRegex = /(?=.*[0-9])/; 

 // const myRegEx = "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$";

   const registerSchema: Yup.SchemaOf<Register> = Yup.object({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    // use regex for email validation
    // TODO servet
    email: Yup.string().email()
      .lowercase()
      .notOneOf(emailAdresses, 'Email already taken!')
       .required(),
    // Bir buyuk harf bir sembol(en az) ve en az 6 karakter
    // validationda bu hatayi goster
    password: Yup.string()
      .required('Password is mendatory')
      // .matches(upperCaseRegex, 'One upperCase required!')
      // .matches(numericRegex, 'One numeric required!')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .min(6, 'Password must be at 6 char long'),
    confirmPassword: Yup.string()
      .required('Password is mendatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  }).defined() 

  

  const submitHandler = (input: Register) => {
    // backend baglaninca
    // eslint-disable-next-line no-unused-vars
    const randomData = input
  } 

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [show2, setShow2] = useState(false);
  const handleClick2 = () => setShow2(!show2);

  const notify = () =>
    toast.success('Registration successfully sent! ', {
    icon: "🚀",
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  
  
 // önce ise add-to-do.jsx ekleyerek baslayacaz sonra icini doldurarak anladigim kadariyla usemutation hook yapacaz. ardindan da
  // buradan gönderilen formlari oraya kaydedecez.
  return (
     <Formik
      initialValues={new Register()}
      validationSchema={ registerSchema }
      onSubmit={(values, { resetForm }) => {  
        submitHandler(values);
        console.log(JSON.stringify(values));
        setTimeout(() => {
          resetForm();
        }, 4000);
      }  }
    >
      {({isValid, handleChange,  dirty, isSubmitting } ) => (
        
    <Form>
          <Flex
            minH='100vh'
            align='center'
            justify='center'
            bg={useColorModeValue('gray.50', 'gray.800')}
          >
            <Stack spacing={8} mx='auto' maxW='lg' py={6} px={6}>
              <Stack align='center'>
                <Heading fontSize='4xl' textAlign='center'>
                  Sign up
                </Heading>
                <Text fontSize='lg' color='gray.600'>
                  to enjoy all of our cool features ✌️
                </Text>
              </Stack>
              <Box
                rounded='lg'
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow='lg'
                p={12}
                width='420px'
              >
                 
                <Stack spacing={2}>
                  
                    <Box>
                      <FormInput
                        name='firstname'
                        label='First name'
                        placeholder='Your firstname'
                        onChange={handleChange} />
                    </Box>
                    
                    <Box>
                      <FormInput
                        name='lastname'
                        label='Lastname'
                        placeholder='Your lastname'
                        onChange={handleChange} />
                    </Box>
                   
                  <Box>
                    <FormInput
                      name='email'
                      label='Email'
                      placeholder='Your email adress'
                      onChange={handleChange} />
                  </Box>
                  <InputGroup>
                    <FormInput
                        name='password'
                        label='Password'
                        placeholder='Password'
                        type={show ? "text" : "password"}
                        onChange={handleChange} />
                  <InputRightElement width="3rem" mt='32px' pr="1px" className='rightElement'>
                    <Button h="2.40rem" onClick={handleClick}>
                        {show ? <ViewOffIcon/> : <ViewIcon/>}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                    <InputGroup>
                    <FormInput
                      name='confirmPassword'
                      label='ConfirmPassword'
                      placeholder='ConfirmPassword'
                      type={show2 ? "text" : "password"}
                      onChange={handleChange} />
                    <InputRightElement width="3rem" mt='32px' pr="1px" className='rightElement'>
                    <Button h="2.40rem" onClick={handleClick2}>
                        {show2 ? <ViewOffIcon/> : <ViewIcon/>}
                      </Button>
                    </InputRightElement>
                    </InputGroup>
                  <Stack spacing={10} pt={2}>
                    <Button
                      type='submit'
                      loadingText='Submitting'
                      size='lg'
                      bg='blue.400'
                      color='white'
                      disabled= { !isValid || isSubmitting || !dirty }
                      _hover={{
                        bg: 'blue.500',
                      }}
                      onClick={notify}
                      
                    >
                      Sign Up
                    </Button>
                    <ToastContainer
                     position="top-right"
                     autoClose={3000}
                     hideProgressBar={false}
                     newestOnTop={false}
                     closeOnClick
                     rtl={false}
                     pauseOnFocusLoss
                     draggable
                     pauseOnHover
                    />
                  </Stack>
                  <Stack pt={3}>
                    <Text align='center'>
                      Already a user?
                      <Link ml='2' href='/login' color='blue.400'>
                        Login
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </Form>
      )}
    </Formik>
  )
 }
export default RegistePage