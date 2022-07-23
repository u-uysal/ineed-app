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
import EyeDisabledIcon from 'src/ui/icons/EyeDisabledIcon'
import EyeIcon from 'src/ui/icons/EyeIcon'
import YupPassword from 'yup-password'
import { useMutation } from '@apollo/client'
import { LoginResponse } from 'src/types/login.interface'
import LOGIN from 'src/mutations/login'

YupPassword(Yup) // extend yup

function LoginPage() {
  
  const toast = useToast()
  const [showPassword, setShowPassword] = useState(false)

  const loginSchema: Yup.SchemaOf<Login> = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .minLowercase(1, 'password must contain at least 1 lower case letter')
      .minUppercase(1, 'password must contain at least 1 upper case letter')
      .minNumbers(1, 'password must contain at least 1 number')
      .minSymbols(1, 'password must contain at least 1 special character'),
  }).defined()

  const [login] = useMutation<LoginResponse>(LOGIN)
  const submitHandler = (values: Login) => {
    const { email, password } = values
    login({
      variables: {
        email,
        password,
      },
    })
  }

  return (
    <Formik
      initialValues={new Login()}
      // TODO onsubmit icin UseMutation Hookunu kullan (en son)
      onSubmit={(values) => submitHandler(values)}
      validationSchema={loginSchema}
      enableReinitialize
    >
      {({ isSubmitting, isValid, dirty }) => (
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
                  <FormInput
                    name='Email'
                    label='Email'
                    placeholder='Your email adress'
                  />
                  <FormInput
                    name='Password'
                    label='Password'
                    placeholder='Password'
                    type={showPassword ? 'text' : 'password'}
                    rightElement={
                      <Button
                        size='sm'
                        variant='ghost'
                        _focus={{ boxShadow: 'none' }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeDisabledIcon /> : <EyeIcon />}
                      </Button>
                    }
                  />

                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align='start'
                      justify='space-between'
                    >
                      <Link href='Todo' color='blue.400'>
                        Forgot password?
                      </Link>
                    </Stack>
                    <Button
                      disabled={!(isValid && dirty) || isSubmitting}
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
                      {!(isValid && dirty)
                        ? 'Check your credentials'
                        : 'Sign In'}
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
export default LoginPage
