/* eslint-disable jsx-a11y/anchor-is-valid */

import {
  Flex,
  Box,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import FormInput from 'src/components/form-fields/FormInput'
import Login from 'src/interfaces/login.interface'
import * as Yup from 'yup'
import { useState } from "react";
import { ViewIcon } from '@chakra-ui/icons'
import './login.css'


export default function LoginPage() {
  const loginSchema: Yup.SchemaOf<Login> = Yup.object({
    // use regex for email validation
    // TODO servet
    email: Yup.string().email().required(),
    // Bir buyuk harf bir sembol(en az) ve en az 6 karakter
    // validationda bu hatayi goster
    password: Yup.string().required(),
  }).defined()

  const submitHandler = (input: Login) => {
    // backend baglaninca
    // eslint-disable-next-line no-unused-vars
    const randomData = input
  }

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  

  return (
    <Formik
      initialValues={new Login()}
      // TODO onsubmit icin UseMutation Hookunu kullan (en son)
      onSubmit={(values) => submitHandler(values)}
      validationSchema={loginSchema}
    >
      {() => (
        <Form>
          <Flex
            minH='100vh'
            align='center'
            justify='center'
            bg={useColorModeValue('gray.50', 'gray.800')}
          >
            <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
              <Stack align='center'>
                <Heading fontSize='4xl'>Sign in to your account</Heading>
                <Text fontSize='lg' color='gray.600'>
                  to enjoy all of our cool{' '}
                  <Link color='blue.400'>features</Link> ✌️
                </Text>
              </Stack>
              <Box
                rounded='lg'
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow='lg'
                p={8}
              >
                <Stack spacing={4}>
                  <FormInput
                    name='email'
                    label='Email'
                    placeholder='Your email adress'
                  />
                  <FormInput
                    name='password'
                    label='Password'
                    placeholder='Password'                    
                    type={passwordShown ? "password" : "text"}
                   
                  />
                  <ViewIcon  onClick={togglePassword} className='icon' />
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align='start'
                      justify='space-between'
                    >
                      <Link color='blue.400'>Forgot password?</Link>
                    </Stack>
                    <Button
                      bg='blue.400'
                      color='white'
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Sign In
                    </Button>
                    <Stack pt={6}>
                    <Text align='center'>
                      New Account?
                      <Link ml='2' href='/register' color='blue.400'>
                        Register
                      </Link>
                    </Text>
                  </Stack>
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
