import styled from 'styled-components';
import { Button } from '../../../../Components';
import PropTypes from 'prop-types';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)} width="10rem">
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)} width="150px">
				Предыдущая
			</Button>
			<div className="current-page">Страница: {page}</div>
			<Button
				disabled={page === lastPage}
				onClick={() => setPage(page + 1)}
				width="10rem"
			>
				Следующая
			</Button>
			<Button
				disabled={page === lastPage}
				onClick={() => setPage(lastPage)}
				width="10rem"
			>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	margin-bottom: 0;
	gap: 20px;
	justify-content: center;
	align-items: center;
	position: static;
	bottom: 0;
	Button {
		height: 40px;
	}
	.current-page {
		width: 150px;
		height: 40px;
		background-color: #afd9f9;
		text-decoration: none;
		border-radius: 5rem;
		border: none;
		box-shadow: 0 5px 10px #000;
		font-size: 18px;
		color: #000;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
};
