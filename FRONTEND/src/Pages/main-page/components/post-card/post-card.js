import styled from 'styled-components';
import { Icon } from '../../../../Components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishedAt,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="post-card-footer">
					<h3>{title}</h3>
					<div className="post-card-info">
						<div className="date">
							<Icon id="fa-calendar-o" size="25px" className="calendar" />
							<div>{publishedAt}</div>
						</div>
						<div className="comments-count">
							<Icon id="fa-comments-o" size="25px" className="comments" />
							<div>{commentsCount}</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	display: flex;
	border: 2px solid #000;
	width: 300px;
	height: 250px;
	border-radius: 1rem;
	box-shadow: 5px 10px 15px #000;
	&:active {
		transform: scale(0.95);
		box-shadow: 10px 20px 30px #000;
	}

	img {
		width: 100%;
		border-top-right-radius: 1rem;
		border-top-left-radius: 1rem;
	}

	h3 {
		margin: 0;
		overflow: hidden;
	}
	.post-card-footer {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 10px;
	}
	.post-card-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.date {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}
	.comments-count {
		display: flex;
		gap: 10px;
		align-items: center;
	}
	* {
		text-decoration: none;
		color: #000;
	}
`;

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
};
