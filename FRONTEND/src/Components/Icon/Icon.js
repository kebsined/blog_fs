import PropTypes from 'prop-types';
import styled from 'styled-components';
const IconContainer = ({ className, id, textShadow, onClick, ...props }) => (
	<div className={className} onClick={onClick}>
		<i className={`fa ${id} `} aria-hidden="true" {...props}></i>
	</div>
);
export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	text-shadow: ${({ textShadow = '0 4px 5px #000000ce' }) => textShadow};
	color: #000;
	text-decoration: none;
	color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};
	&:active {
		transform: ${({ onClick }) => (onClick ? 'scale(0.9)' : 1)};
	}
	&:hover {
		cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
	}
`;

Icon.propTypes = {
	id: PropTypes.string,
	textShadow: PropTypes.string,
	onClick: PropTypes.func,
};
