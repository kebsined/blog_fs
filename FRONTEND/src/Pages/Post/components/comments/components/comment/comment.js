import styled from 'styled-components';
import { Icon } from '../../../../../../Components';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, openModal, removeCommentAsync } from '../../../../../../actions';
import { checkAccess } from '../../../../../../utils';
import { ROLE } from '../../../../../../constants';
import { selectUserRole } from '../../../../../../selectors';
import PropTypes from 'prop-types';

const CommentContainer = ({ className, id, author, content, publishedAt, postId }) => {
	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);
	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const accessToDelete = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], roleId);

	return (
		<div className={className}>
			<div className="comment-block">
				<div className="comment">
					<Icon
						id="fa-user-circle-o"
						size="20px"
						title="Пользователь"
						inactive="true"
					>
						{author}
					</Icon>

					<Icon id="fa-calendar-o" size="20px" title="Дата публикации">
						{publishedAt}
					</Icon>
				</div>
				<div className="text">{content}</div>
			</div>
			{accessToDelete && (
				<div className="trash">
					<Icon
						id="fa-trash-o"
						size="30px"
						title="Удалить комментарий"
						onClick={() => onCommentRemove(id)}
					/>
				</div>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	margin-top: 18px;
	display: flex;
	gap: 15px;
	justify-content: space-between;

	.comment-block {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		border: 1px solid #000;
		border-radius: 10px;
		padding: 5px 10px;
		width: 91.5%;
		overflow: hidden;
		overflow-wrap: break-word;
		text-align: justify;
	}
	.comment {
		display: flex;
		justify-content: space-between;
		margin-bottom: 5px;
	}
`;

Comment.propTypes = {
	id: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	postId: PropTypes.string.isRequired,
};
