import styled from 'styled-components';
import { Comment } from './components';
import { Icon } from '../../../../Components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { addCommentAsync } from '../../../../actions';
import { checkAccess } from '../../../../utils';
import { PROP_TYPE, ROLE } from '../../../../constants';
import PropTypes from 'prop-types';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const roleId = useSelector(selectUserRole);
	const dispatch = useDispatch();

	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content));
		setNewComment('');
	};

	const isGuest = checkAccess([ROLE.GUEST], roleId);

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Оставьте комментарий...."
						onChange={({ target }) => setNewComment(target.value)}
					/>
					<Icon
						id="fa-paper-plane-o"
						size="25px"
						onClick={() => onNewCommentAdd(postId, newComment)}
						title="Отправить комментарий"
					/>
				</div>
			)}
			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						id={id}
						postId={postId}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	display: flex;
	flex-direction: column;
	width: 600px;
	margin: 0 auto;
	& .new-comment {
		display: flex;
		gap: 20px;
		width: 100%;
		textarea {
			width: 550px;
			height: 175px;
			resize: none;
			outline: none;
			border: 1px solid #000;
			font-size: 18px;
			border-radius: 20px;
			padding: 15px;
		}
	}
`;

Comments.propTypes = {
	postId: PropTypes.string,
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
};
