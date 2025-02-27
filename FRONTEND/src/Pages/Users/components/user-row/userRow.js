import { Icon } from '../../../../Components';
import { TableRow } from '../table-row/tableRow';
import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { PROP_TYPE } from '../../../../constants';
import { request } from '../../../../utils/request';

const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);

	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const isBtnDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<TableRow className="row">
				<div className="login">{login}</div>
				<div className="registered-at">{registeredAt}</div>
				<div className="role">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>

					<Icon
						id="fa-floppy-o"
						margin="0 0 0 10px"
						onClick={() => onRoleSave(id, selectedRoleId)}
						disabled={isBtnDisabled}
					/>
				</div>
			</TableRow>
			<Icon
				className="trash"
				id="fa-trash-o"
				margin="0 0 0 10px"
				onClick={onUserRemove}
			/>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
	margin: 10px 0;

	select {
		font-size: 16px;
		text-align: left;
		border: 2px solid #000;
		padding: 0 5px;
	}
	.row {
		border: 2px solid #000;
		padding: 10px 0;
		padding-left: 5px;
	}

	.role {
		display: flex;
	}
	.trash {
		font-size: 30px;
	}
`;

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserRemove: PropTypes.func.isRequired,
};
