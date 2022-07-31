import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import FormInput from 'src/components/form-fields/FormInput'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import RegisterInput from 'src/interfaces/register.interface'
import EyeDisabledIcon from 'src/ui/icons/EyeDisabledIcon'
import EyeIcon from 'src/ui/icons/EyeIcon'
import { useMutation } from '@apollo/client'
import { RegisterResponse } from 'src/types/register.interface'
import REGISTER from 'src/mutations/register'
import { useNavigate } from 'react-router-dom'
import clientSideMessages from 'src/utils/messages/messages'
import defaultToastProps from 'src/utils/toast-default'

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const [register] = useMutation<RegisterResponse>(REGISTER)

  const registerSchema: Yup.SchemaOf<RegisterInput> = Yup.object({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    email: Yup.string().email().lowercase().required(),
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

  const submitHandler = (values: RegisterInput) => {
    const { firstname, lastname, password, confirmPassword, email } = values

    register({
      variables: {
        firstname,
        lastname,
        password,
        confirmPassword,
        email,
      },
    })
      .then(() => {
        toast({
          title: clientSideMessages.succesfullySaved,
          status: 'success',
          ...defaultToastProps,
        })
        navigate('/login')
      })
      .catch((err) => {
        toast({
          title: err.message,
          status: 'error',
          ...defaultToastProps,
        })
      })
  }
  return (
    <Formik
      initialValues={new RegisterInput()}
      validationSchema={registerSchema}
      onSubmit={(values) => {
        submitHandler(values)
      }}
    >
      {({ isValid, isSubmitting }) => (
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
                      onClick={() => {
                        "console.log('clicked')"
                      }}
                    >
                      Sign up
                    </Button>
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

export default RegisterPage
