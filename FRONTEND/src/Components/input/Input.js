import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	height: 40px;
	padding: 17px;
	font-size: 18px;
	border: 2px solid #000;
	border-radius: 2rem;
	width: ${({ width = '100%' }) => width};
	&::placeholder {
		font-style: italic;
	}
`;

Input.propTypes = {
	width: PropTypes.string,
};
