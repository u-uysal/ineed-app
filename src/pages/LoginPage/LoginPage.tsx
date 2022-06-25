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
  useToast,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import FormInput from 'src/components/form-fields/FormInput'
import Login from 'src/interfaces/login.interface'
import * as Yup from 'yup'
import { useState } from 'react'
import './login.css'
import isEmailValidator from 'validator/lib/isEmail'

export default function LoginPage() {



  // ******************************************************
  // 01. EMAIL/PASSWORD VALIDATION => COMPLETED <=
  // *****************************************************
  const loginSchema: Yup.SchemaOf<Login> = Yup.object({
    email: Yup.string()
      .email()
      .required()
      .test(
        'is-valid',
        (message) => `${message.path} is invalid`,
        (value) =>
          value
            ? isEmailValidator(value)
            : new Yup.ValidationError('Invalid value')
      ),
    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  }).defined()



  // *****************************************************
  // 02. BACKEND BAGLANINCA => CONTINUES <=
  // *****************************************************
  const submitHandler = (input: Login) => {
    // backend baglaninca
    // eslint-disable-next-line no-unused-vars
    const randomData = input
  }



  // *****************************************************
  // 03. SHOW PASSWORD FEATURE => COMPLETED <=
  // *****************************************************
  const [showPassword, setShowPassword] = useState(false)
  const handleShowClick = () => {
    setShowPassword(!showPassword)
  }



  // *****************************************************
  // 03. TOAST => COMPLETED <=
  // *****************************************************
  const toast = useToast()



  
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
                    type={showPassword ? 'text' : 'password'}
                  />
                  <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align='start'
                      justify='space-between'
                    >
                      <Link color='blue.400'>Forgot password?</Link>
                    </Stack>
                    <Button
                      onClick={() =>
                        toast({
                          title: 'Login successful.',
                          description: "We've prepared your account for you.",
                          status: 'success',
                          duration: 9000,
                          isClosable: true,
                        })
                      }
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
                        Don’t have an account?
                        <Link ml='2' href='/register' color='blue.400'>
                          Sign up
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
