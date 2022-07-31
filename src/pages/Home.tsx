import React from 'react'
import {
  Button,
  Grid,
  GridItem,
  Flex,
  Center,
  Text,
  Square,
} from '@chakra-ui/react'

export default function Home() {
  return (
    <div>
      <Grid
        h='100vh'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1} bg='tomato'>
          <span>Home</span>
        </GridItem>
        <GridItem colSpan={2} bg='papayawhip'>
          <Button className='btn' type='button'>
            Send
          </Button>
        </GridItem>
        <GridItem colSpan={2} bg='papayawhip'>
          <Flex color='white' h='100%'>
            <Center w='100%' h='100%' bg='green.500'>
              <Text>
                <Button className='send-btn btn' type='button'>
                  Send
                </Button>
              </Text>
            </Center>
          </Flex>
        </GridItem>
        <GridItem colSpan={4} bg='tomato'>
          {' '}
          <Square bg='blue.500' size='150px'>
            <Text>Box 2</Text>
          </Square>
        </GridItem>
      </Grid>
    </div>
  )
}
