import {
  Flex,
  Box,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon } from '@chakra-ui/icons'
import FormInput from 'src/components/form-fields/FormInput'
import { Form, Formik } from 'formik'
import Register from 'src/interfaces/register.interface'
import * as Yup from 'yup'
import './register.css'

function RegistePage() {
  const registerSchema: Yup.SchemaOf<Register> = Yup.object({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    // use regex for email validation
    // TODO servet
    email: Yup.string().email().required(),
    // Bir buyuk harf bir sembol(en az) ve en az 6 karakter
    // validationda bu hatayi goster
    password: Yup.string()
      .required('Password is mendatory')
      .min(4, 'Password must be at 6 char long'),
    confirmPassword: Yup.string()
      .required('Password is mendatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  }).defined()
  
  const submitHandler = (input: Register) => {
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
      initialValues={ new Register() }
      onSubmit={ (values) => submitHandler(values) }
      validationSchema={ registerSchema }
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
                p={8}
              >
                <Stack spacing={4}>
                  <HStack>
                    <Box>
                      <FormInput label='First Name' name='firstName' isRequired />
                    </Box>
                    <Box>
                      <FormInput label='Last Name' name='lastName' isRequired />
                    </Box>
                  </HStack>
                  <Box>
                      <FormInput label='Email' name='email' isRequired />
                    </Box>
                    <Box>
                    <FormInput label='Password' name='password' isRequired />
                  </Box>
                  <ViewIcon  onClick={togglePassword} className='icon' />
                    <Box>
                      <FormInput label='ConfirmPassword' name='confirmPassword' isRequired />
                    </Box>
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText='Submitting'
                      size='lg'
                      bg='blue.400'
                      color='white'
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align='center'>
                      Already a user?
                      <Link ml='2' href='/' color='blue.400'>
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
