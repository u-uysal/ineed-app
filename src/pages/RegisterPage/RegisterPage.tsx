/* eslint-disable no-unused-vars */
// todo
import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import FormInput from 'src/components/form-fields/FormInput'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RegisterInput from 'src/interfaces/register.interface'
import EyeDisabledIcon from 'src/ui/icons/EyeDisabledIcon'
import EyeIcon from 'src/ui/icons/EyeIcon'
import { useMutation } from '@apollo/client'
import REGISTER from 'src/mutations/register'

function RegistePage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [register, { data, loading, error }] = useMutation(REGISTER)

  const emailAdresses = [
    'Duranakyol71@gmail.com',
    'Test2@gmail.com',
    'Test3@gmail.com',
  ]

  const registerSchema: Yup.SchemaOf<RegisterInput> = Yup.object({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    email: Yup.string()
      .email()
      .lowercase()
      .notOneOf(emailAdresses, 'Email already taken!')
      .required(),
    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .minLowercase(1, 'password must contain at least 1 lower case letter')
      .minUppercase(1, 'password must contain at least 1 upper case letter')
      .minNumbers(1, 'password must contain at least 1 number')
      .minSymbols(1, 'password must contain at least 1 special character'),
    confirmPassword: Yup.string()
      .required('Password is mendatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  }).defined()

  const submitHandler = (input: RegisterInput) => {
    const { firstname, lastname, password, confirmPassword, email } = input
    // backend baglaninca
    // eslint-disable-next-line no-unused-vars
    register({
      variables: {
        firstname,
        lastname,
        password,
        confirmPassword,
        email,
      },
    })
  }

  const notify = () =>
    toast.success('Registration successfully sent! ', {
      icon: '🚀',
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  // önce ise add-to-do.jsx ekleyerek baslayacaz sonra icini doldurarak anladigim kadariyla usemutation hook yapacaz. ardindan da
  // buradan gönderilen formlari oraya kaydedecez.
  return (
    <Formik
      initialValues={new RegisterInput()}
      validationSchema={registerSchema}
      onSubmit={(values) => submitHandler(values)}
    >
      {({ isValid, dirty, isSubmitting }) => (
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
                    />
                  </Box>

                  <Box>
                    <FormInput
                      name='lastname'
                      label='Last name'
                      placeholder='Your lastname'
                    />
                  </Box>

                  <Box>
                    <FormInput
                      name='email'
                      label='Email'
                      placeholder='Your email adress'
                    />
                  </Box>

                  <FormInput
                    name='password'
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

                  <FormInput
                    name='confirmPassword'
                    label='ConfirmPassword'
                    placeholder='Confirm password'
                    type={showConfirmPassword ? 'text' : 'password'}
                    rightElement={
                      <Button
                        size='sm'
                        variant='ghost'
                        _focus={{ boxShadow: 'none' }}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeDisabledIcon />
                        ) : (
                          <EyeIcon />
                        )}
                      </Button>
                    }
                  />

                  <Stack spacing={10} pt={2}>
                    <Button
                      type='submit'
                      loadingText='Submitting'
                      size='lg'
                      bg='blue.400'
                      color='white'
                      disabled={!isValid || isSubmitting}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      onClick={notify}
                    >
                      Sign Up
                    </Button>
                    <ToastContainer
                      position='top-right'
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
