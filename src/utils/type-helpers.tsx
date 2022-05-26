import { InputProps } from '@chakra-ui/input'
import { CheckboxProps, RadioProps, TextareaProps } from '@chakra-ui/react'
import { StyleProps } from '@chakra-ui/styled-system'

export type CustomInputProps = Omit<InputProps, 'id'>

export type CustomTextareaProps = Omit<TextareaProps, 'id'>

export type CustomCheckboxProps = Omit<CheckboxProps, 'id'>

export type CustomRadioProps = Omit<RadioProps, 'id'>

export type CustomIconProps = Omit<StyleProps, 'apply'>

export type Dict = Record<string, any>

export type Merge<P, T> = Omit<P, keyof T> & T
