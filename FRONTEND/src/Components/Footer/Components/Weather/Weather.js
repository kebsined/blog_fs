import styled from 'styled-components';
import PropTypes from 'prop-types';

const WeatherContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const WeatherInfo = styled(WeatherContainer)`
	font-size: 18px;
	font-style: italic;
`;

WeatherInfo.propTypes = {
	children: PropTypes.node.isRequired,
};
