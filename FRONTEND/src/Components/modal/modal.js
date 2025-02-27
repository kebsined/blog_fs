import { Button } from '../button/Button';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
	selectModalIsOpen,
	selectModalText,
	selectOnCancel,
	selectOnConfirm,
} from '../../selectors';
const ModalContainer = ({ className }) => {
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectOnConfirm);
	const onCancel = useSelector(selectOnCancel);
	const isOpen = useSelector(selectModalIsOpen);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="window">
				<h3>{text}</h3>
				<div className="buttons">
					<Button width="5rem" onClick={onConfirm}>
						Да
					</Button>
					<Button width="5rem" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 20;

	.overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(75, 18, 250, 0.4);
	}

	.window {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 2px solid #000;
		width: 400px;
		text-align: center;
		padding-bottom: 20px;
		border-radius: 1rem;
		background-color: #eec6df;

		.buttons {
			display: flex;
			justify-content: space-around;
		}
	}
`;
