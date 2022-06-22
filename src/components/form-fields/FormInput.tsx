/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Text, Textarea } from '@chakra-ui/react'
import { useField } from 'formik'
import React, { ChangeEvent, PropsWithChildren, ReactElement } from 'react'
import ReactInputMask, { Props as ReactInputMaskProps } from 'react-input-mask'
import { CustomInputProps, CustomTextareaProps } from 'src/utils/type-helpers'

type FormInputProps = {
  label?: string
  name: string
  extraInfo?: string | React.ReactNode
  innerRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
  customErrorMessage?: boolean
  inputType?: 'input' | 'textarea'
  rightElement?: React.ReactNode
}

function FormInput(
  props: PropsWithChildren<
    FormInputProps &
      Partial<ReactInputMaskProps> &
      (CustomInputProps | CustomTextareaProps)
  >
): ReactElement {
  const {
    label,
    name,
    customErrorMessage,
    inputType = 'input',
    isDisabled,
    isReadOnly,
    isRequired,
    extraInfo,
    rightElement,
    ...otherProps
  } = props

  const [field, meta, helpers] = useField(name)
  const { setValue } = helpers

  const hasErrors = !!(meta.touched && meta.error)

  let error: string | unknown = meta.error || ''
  const errorIsString = typeof error === 'string'

  if (errorIsString) {
    error = meta.error as string
  } else {
    error = meta.error as unknown
  }

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value)
  }

  return (
    <FormControl
      mb='6'
      isInvalid={hasErrors}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
    >
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}

      <InputGroup>
        {inputType === 'input' ? (
          <Input
            as={otherProps.mask ? ReactInputMask : undefined}
            value={field.value || ''}
            onChange={handleOnChange}
            {...(otherProps as CustomInputProps)}
            {...field}
            id={field.name}
          />
        ) : (
          <Textarea
            {...field}
            value={field.value || ''}
            onChange={handleOnChange}
            {...(otherProps as CustomTextareaProps)}
            id={field.name}
          />
        )}
        {rightElement && <InputRightElement>{rightElement}</InputRightElement>}
      </InputGroup>

      {extraInfo && (
        <Text size='small' color='gray.500' mt='2'>
          {extraInfo}
        </Text>
      )}

      <FormErrorMessage>
        {error !== undefined &&
          (customErrorMessage ? error : typeof error === 'string' ? error : '')}
      </FormErrorMessage>
    </FormControl>
  )
}

export default FormInput
