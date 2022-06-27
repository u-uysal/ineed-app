import Icon from '@chakra-ui/icon'
import { CustomIconProps } from 'src/utils/type-helpers'

function EyeDisabledIcon(props: CustomIconProps) {
  return (
    <Icon viewBox='0 0 20 20' {...props} fill='none'>
      <path
        d='M1 1L19 19'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8.5 8.6771C8.1888 9.0296 8 9.4928 8 10C8 11.1045 8.8954 12 10 12C10.5072 12 10.9703 11.8112 11.3229 11.5'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.36185 5.56107C3.68002 6.73966 2.27894 8.4188 1 10C2.88856 12.991 6.2817 16 10 16C11.5499 16 13.0434 15.4772 14.3949 14.6508M10 4C14.0084 4 16.7015 7.1582 19 10C18.6816 10.5043 18.3203 11.0092 17.922 11.5L10 4Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Icon>
  )
}

export default EyeDisabledIcon
