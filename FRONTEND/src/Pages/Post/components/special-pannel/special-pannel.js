import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../Components';
import styled from 'styled-components';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import { selectUserRole } from '../../../../selectors';
import PropTypes from 'prop-types';

const SpecialPannelContainer = ({ id, className, publishedAt, editButton }) => {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(id)).then(() => {
						navigate('/');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};
	const isAdmin = checkAccess([ROLE.ADMIN], roleId);
	return (
		<div className={className}>
			<div className="date">
				<Icon id="fa-calendar-o" size="25px" className="calendar" />
				<div>{publishedAt}</div>
			</div>

			{isAdmin && (
				<div className="operations">
					{editButton}
					<Icon
						className="trash"
						id="fa-trash-o"
						size="25px"
						onClick={() => onPostRemove(id)}
						title="Удалить статью"
					/>
				</div>
			)}
		</div>
	);
};

export const SpecialPannel = styled(SpecialPannelContainer)`
	display: flex;
	justify-content: space-between;
	margin: 20px 0 20px;
	align-items: center;

	.date {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 25px;
		:active {
			transform: none;
		}
		opacity: ${({ publishedAt }) => (publishedAt ? 100 : 0)};
	}

	.operations {
		display: flex;
		gap: 30px;
		margin-right: ${({ publishedAt }) => (publishedAt ? '0' : '-45px')};
	}

	.trash {
		opacity: ${({ publishedAt }) => (publishedAt ? 100 : 0)};
	}
`;

SpecialPannel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
