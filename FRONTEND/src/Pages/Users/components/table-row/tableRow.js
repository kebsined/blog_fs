import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => (
	<div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
	display: grid;
	grid-template-columns: 200px 250px 200px;
	font-size: 18px;
	font-weight: 400;
	margin-left: 10px;
	padding-left: 5px;
`;

TableRow.propTypes = {
	children: PropTypes.node.isRequired,
};
