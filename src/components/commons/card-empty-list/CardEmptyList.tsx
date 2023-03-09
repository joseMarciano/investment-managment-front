import { Heading, HStack } from '@chakra-ui/react';

type CardEmptyListProps = {
    model: string
}

export function CardEmptyList({ model }: CardEmptyListProps) {
    return <HStack justify='center' align='center' height='100px'>
        <Heading textAlign='center' size='md'>Não foram encontradas {model} por aqui. 🔎</Heading>
    </HStack>
}