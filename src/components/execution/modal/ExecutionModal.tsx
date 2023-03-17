import { Button, FormControl, FormLabel, HStack, Input, InputGroup, InputRightElement, Stack, UseDisclosureReturn } from '@chakra-ui/react';
import { TbCurrencyReal } from 'react-icons/tb';
import { FaPercent } from 'react-icons/fa';
import { useEffect, useMemo, useState } from 'react';
import { DefaultModal } from '../../commons/modal/DefaultModal';
import { SelectStock } from '../../commons/select/stock/SelectStock';
import { Calendar } from '../../commons/calendar/Calendar';
import { useForm } from "react-hook-form";
import http from '../../../config/http/axios'
import { useParams } from 'react-router-dom';

type ExecutionModalProps = {
	params?: any,
	disclosure: UseDisclosureReturn
}

export function ExecutionModal({ params, disclosure }: ExecutionModalProps) {
	const title = useMemo(() => `${params?.id ? 'Editando' : 'Adicionando'} execução`, [params?.id])
	const { register, handleSubmit, reset } = useForm();

	const { walletId } = useParams();
	const [stock, setStock] = useState<any>();
	const [executedAt, setExecutedAt] = useState<Date>(new Date());
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() =>{
		if(params?.stock) setStock(params?.stock)


	} , [])

	return <DefaultModal
		title={title}
		disclosure={disclosure}
		Body={<Body />}
		Footer={<Footer />}

	/>

	function Body() {
		return <form id='executionModal' onSubmit={handleSubmit(onSubmit)}>
			<Stack >
				<HStack>
					<FormControl isRequired>
						<FormLabel>Ticket</FormLabel>
						<SelectStock setStock={setStock} stock={stock} isDisabled={isLoading || params?.stock} />
					</FormControl>

					<FormControl isRequired>
						<FormLabel>Parâmetro de lucro</FormLabel>
						<InputGroup>
							<InputRightElement
								pointerEvents='none'
								children={<FaPercent color='gray.300' />}
							/>
							<Input isDisabled={isLoading} type='number' {...register('profitPercentage')} />
						</InputGroup>
					</FormControl>
				</HStack>

				<FormControl isRequired>
					<FormLabel>Data da execução</FormLabel>
					<Calendar executedAt={executedAt} setExecutedAt={setExecutedAt} isDisabled={isLoading} />
				</FormControl>

				<HStack>
					<FormControl isRequired>
						<FormLabel>Número de ações</FormLabel>
						<Input isDisabled={isLoading} type='number' {...register('executedQuantity')} />
					</FormControl>

					<FormControl isRequired>
						<FormLabel>Preço por ação</FormLabel>
						<InputGroup>
							<InputRightElement
								pointerEvents='none'
								children={<TbCurrencyReal color='gray.300' />}
							/>
							<Input isDisabled={isLoading}  {...register('executedPrice')} />
						</InputGroup>
					</FormControl>
				</HStack>
			</Stack>
		</form>
	}

	function Footer() {
		return <HStack>
			<Button isLoading={isLoading} form='executionModal' type='submit' colorScheme='green'>Salvar</Button>
			<Button isLoading={isLoading} onClick={disclosure.onClose} colorScheme='red'>Cancelar</Button>
		</HStack>
	}

	function onSubmit(data: any): any {
		setIsLoading(true)
		http.post('/executions', {
			stockId: stock.value,
			walletId: walletId,
			profitPercentage: data.profitPercentage,
			executedQuantity: data.executedQuantity,
			executedPrice: data.executedPrice,
			executedAt: executedAt
		})
			.then(() => {
				disclosure.onClose();
				reset();
				setExecutedAt(new Date());
				setStock(null as any);
			})
			.catch(e => console.error('Error on create execution', e))
			.finally(() => setIsLoading(false));
	}
}