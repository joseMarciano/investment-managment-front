import { Button, FormControl, FormLabel, HStack, Input, Stack, useDisclosure } from '@chakra-ui/react';
import { DefaultModal } from '../../commons/modal/DefaultModal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useApplicationContext } from '../../commons/application/context/ApplicationContext';
import { useWalletContext } from '../context/WalletContext';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';


export function WalletModal() {
	const { register, handleSubmit, reset, setValue } = useForm();

	const { http } = useApplicationContext();
	const { searchWallets } = useWalletContext();
	const { state } = useLocation();
	const { walletId } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const title = useMemo(() => {
		let title;
		if (walletId) title = 'Editando';
		else title = 'Adicionando';
		return `${title} carteira`;
	}, [])

	const navigate = useNavigate();
	const disclosure = useDisclosure({
		defaultIsOpen: !!state?.modalIsOpen,
		onClose: () => {
			navigate(-1)
			searchWallets && searchWallets();
		}
	});


	useEffect(() => {
		if (state?.wallet) {
			const wallet = state?.wallet;
			setValue('name', wallet.name)
			setValue('description', wallet.description)
			setValue('color', wallet.color)
		}

	}, [])

	return <DefaultModal
		title={title}
		disclosure={disclosure}
		Body={<Body />}
		Footer={<Footer />}

	/>

	function Body() {
		return <form id='walletModal' onSubmit={handleSubmit(onSubmit)}>
			<Stack >
				<FormControl isRequired>
					<FormLabel>Nome</FormLabel>
					<Input isDisabled={isLoading} {...register('name')} />
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Descrição</FormLabel>
					<Input isDisabled={isLoading} {...register('description')} />
				</FormControl>

				<FormControl isRequired>
					<FormLabel>Cor</FormLabel>
					<Input isDisabled={isLoading} type='color' {...register('color')} />
				</FormControl>
			</Stack>
		</form >
	}

	function Footer() {
		return <HStack>
			<Button isLoading={isLoading} form='walletModal' type='submit' colorScheme='green'>{'Salvar'}</Button>
			<Button isLoading={isLoading} onClick={disclosure.onClose} colorScheme='red'>Cancelar</Button>
		</HStack>
	}

	function onSubmit(data: any): any {
		debugger
		setIsLoading(true)
		let promise;

		if (walletId) promise = update(data);
		else promise = save(data);

		promise.then(resetModal)
			.catch(e => console.error('Error on create wallet', e))
			.finally(() => setIsLoading(false));

		function resetModal() {
			disclosure.onClose();
			reset();
		}
	}

	function save(data: any) {
		return http.post('/wallets', {
			name: data.name,
			description: data.description,
			color: data.color
		})
	}

	function update(data: any) {
		return http.put(`/wallets/${walletId}`, {
			id: walletId,
			name: data.name,
			description: data.description,
			color: data.color
		})
	}
}