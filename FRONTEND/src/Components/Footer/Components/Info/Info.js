import styled from 'styled-components';

const InfoContainer = ({ className }) => {
	return (
		<div className={className}>
			<div>Блог веб-разработчика</div>
			<div>web@developer.by</div>
		</div>
	);
};

export const Info = styled(InfoContainer)`
	font-size: 25px;
	font-weight: bold;
`;
