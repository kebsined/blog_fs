import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = ({ className, children, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	width: ${({ width = '100%' }) => width};
	height: 2rem;
	background-color: ${({ disabled }) => (disabled ? 'inherit' : '#aaa2b8')};
	text-decoration: none;
	border-radius: 5rem;
	border: none;
	box-shadow: 0 5px 10px #000;
	font-size: 18px;
	color: #000;
	font-weight: bold;
	&:active {
		transform: ${({ disabled }) => (disabled ? 'scale(1)' : 'scale(0.9)')};
	}
	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'poiner')};
	}
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
};
