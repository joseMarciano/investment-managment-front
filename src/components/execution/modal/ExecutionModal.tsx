import { Button, FormControl, FormLabel, HStack, Input, InputGroup, InputRightElement, Stack, useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { TbCurrencyReal } from 'react-icons/tb';
import { FaPercent } from 'react-icons/fa';
import { useEffect, useMemo, useState } from 'react';
import { DefaultModal } from '../../commons/modal/DefaultModal';
import { SelectStock } from '../../commons/select/stock/SelectStock';
import { Calendar } from '../../commons/calendar/Calendar';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams, useResolvedPath } from 'react-router-dom';
import { useExecutionContext } from '../context/ExecutionContext';
import { useExecutionSummaryContext } from '../context/ExecutionSummaryContext';
import { useApplicationContext } from '../../commons/application/context/ApplicationContext';


export function ExecutionModal() {
	const { register, handleSubmit, reset, setValue } = useForm();

	const { http } = useApplicationContext();
	const { searchExecutionSummary } = useExecutionSummaryContext();
	const { searchExecutions } = useExecutionContext();
	const { state } = useLocation();
	const { executionId, walletId } = useParams();
	const [stock, setStock] = useState<any>();
	const [executedAt, setExecutedAt] = useState<Date>(new Date());
	const [isLoading, setIsLoading] = useState(false);
	const title = useMemo(() => {
		let title;
		if (state?.isSelling && executionId) title = 'Vendendo';
		else if (executionId) title = 'Editando';
		else title = 'Adicionando';
		return `${title} execução`;
	}, [])

	const navigate = useNavigate();
	const disclosure = useDisclosure({
		defaultIsOpen: !!state?.modalIsOpen,
		onClose: () => {
			navigate(-1)
			searchExecutionSummary && searchExecutionSummary();
			searchExecutions && searchExecutions();
		}
	})


	useEffect(() => {
		if (state?.stock) setStock(state.stock)
		if (state?.execution) {
			const execution = state?.execution;
			setValue('profitPercentage', execution.profitPercentage)
			setValue('executedQuantity', execution.executedQuantity)
			setValue('executedPrice', execution.executedPrice)
			setExecutedAt(new Date(execution.executedAt))
		}

	}, [])

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
						<SelectStock setStock={setStock} stock={stock} isDisabled={isLoading || state?.stock} />
					</FormControl>

					{!state?.isSelling && <FormControl isRequired>
						<FormLabel>Parâmetro de lucro</FormLabel>
						<InputGroup>
							<InputRightElement
								pointerEvents='none'
								children={<FaPercent color='gray.300' />}
							/>
							<Input isDisabled={isLoading} type='number' {...register('profitPercentage')} />
						</InputGroup>
					</FormControl>
					}
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
			<Button isLoading={isLoading} form='executionModal' type='submit' colorScheme='green'>{state?.isSelling ? 'Vender' : 'Salvar'}</Button>
			<Button isLoading={isLoading} onClick={disclosure.onClose} colorScheme='red'>Cancelar</Button>
		</HStack>
	}

	function onSubmit(data: any): any {
		setIsLoading(true)
		let promise;

		if (executionId && state?.isSelling) promise = sell(data);
		else if (executionId) promise = update(data);
		else promise = save(data);

		promise.then(resetModal)
			.catch(e => console.error('Error on create execution', e))
			.finally(() => setIsLoading(false));

		function resetModal() {
			disclosure.onClose();
			reset();
			setExecutedAt(new Date());
			setStock(null as any);
		}
	}

	function save(data: any) {
		return http.post('/executions', {
			stockId: stock?.value,
			walletId: walletId,
			profitPercentage: data.profitPercentage,
			executedQuantity: data.executedQuantity,
			executedPrice: data.executedPrice,
			executedAt: executedAt
		})
	}

	function update(data: any) {
		return http.put(`/executions/${executionId}`, {
			id: executionId,
			stockId: stock?.value,
			walletId: walletId,
			profitPercentage: data.profitPercentage,
			executedQuantity: data.executedQuantity,
			executedPrice: data.executedPrice,
			executedAt: executedAt
		})
	}

	function sell(data: any) {
		return http.put(`/executions/sell/${executionId}`, {
			originId: executionId,
			executedQuantity: data.executedQuantity,
			executedPrice: data.executedPrice,
			executedAt: executedAt
		})
	}
}