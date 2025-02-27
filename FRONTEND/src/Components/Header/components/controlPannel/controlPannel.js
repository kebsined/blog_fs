import { Icon, Button } from '../../../../Components';
import { Link, useNavigate } from 'react-router-dom';
import { ROLE } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { selectUserLogin, selectUserRole } from '../../../../selectors';
import { logout } from '../../../../actions';
import { checkAccess } from '../../../../utils';

const RigthAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 20px;
	.logout {
		height: 2rem;
		display: flex;
		align-items: center;
		gap: 20px;
		font-size: 30px;
		font-weight: bold;
	}
	div > i {
		&:hover {
			cursor: pointer;
		}
	}
`;

const ControlPannelContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<RigthAligned>
				{roleId === ROLE.GUEST ? (
					<Link to="Login">
						<Button width="8rem">Войти</Button>
					</Link>
				) : (
					<>
						<div className="logout">
							<div>{login}</div>
							<Icon
								onClick={onLogout}
								id="fa-sign-out"
								size="35px"
								textShadow="0 2px 5px #000000ce"
							/>
						</div>
					</>
				)}
			</RigthAligned>
			<RigthAligned>
				<Icon
					onClick={() => navigate(-1)}
					id="fa-angle-double-left"
					size="45px"
					textshadow="0 4px 5px #000000ce"
				/>

				{isAdmin && (
					<>
						<Link to="/post">
							<Icon
								id="fa-file-text"
								size="35px"
								textshadow="0 4px 5px #000000ce"
							/>
						</Link>
						<Link to="/users">
							<Icon
								id="fa-users"
								size="35px"
								textShadow="0 4px 5px #000000ce"
							/>
						</Link>
					</>
				)}
			</RigthAligned>
			<div></div>
		</div>
	);
};

export const ControlPannel = styled(ControlPannelContainer)``;
