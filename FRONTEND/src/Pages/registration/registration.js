import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useState } from 'react';
import { Input, Button, H2, ErrorBlock } from '../../Components';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import { Navigate } from 'react-router-dom';

import styled from 'styled-components';
import { ROLE } from '../../constants';
import { useReset } from '../../hooks';
import { request } from '../../utils/request';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните поле логина')
		.matches(/\w+$/, 'Неверный логин! Допускаюься только цирфы и буквы. ')
		.min(3, 'Неверный логин! Минимум 3 символа.')
		.max(15, 'Неверный логин! Максимум 15 символов.'),
	password: yup
		.string()
		.required('Заполните поле пароля')
		.matches(/^[\w#%]+$/, 'Неверный пароль! Допускаются буквы, цифры, #, %')
		.min(8, 'Неверный пароль! Минимум 8 символов.')
		.max(15, 'Неверный пароль! Максимум 30 символов.'),
	passcheck: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password'), null], 'Введенные пароли не совпадают'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useReset(reset);

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};
	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Введите логин..."
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Введите пароль..."
					{...register('password', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Повторите пароль ..."
					{...register('passcheck', { onChange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <ErrorBlock>{errorMessage}</ErrorBlock>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 300px;
		align-items: center;
		Input {
			box-shadow: 0 5px 15px #000;
			outline: inherit;
			border: none;
			border-radius: 3rem;
		}
	}
`;
