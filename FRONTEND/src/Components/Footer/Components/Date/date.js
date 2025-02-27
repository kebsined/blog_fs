import styled from 'styled-components';

const DateContainer = ({ className }) => {
	return (
		<div className={className}>
			{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
		</div>
	);
};

export const DateNow = styled(DateContainer)`
	margin-bottom: 10px;
	font-weight: bolder;
	font-size: 25px;
`;
