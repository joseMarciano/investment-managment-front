import { HStack, Spinner } from '@chakra-ui/react';

type LoaderProps = {
    isLoading: boolean
}

export function Loader({ isLoading }: LoaderProps) {
    return isLoading ? <HStack justify='center' align='center' width='100%' height='100%' position='absolute' left='0' top='0' backgroundColor={'hsl(0deg 0% 0% / 52%)'}>
        <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
        />
    </HStack> : <></>
}