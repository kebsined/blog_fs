import { useNavigate } from 'react-router-dom';
import { H2, Icon } from '../../../../Components';
import { SpecialPannel } from '../special-pannel/special-pannel';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../../constants';

const PostContentContainer = ({
	className,
	post: { id, title, content, publishedAt, imageUrl },
}) => {
	const navigate = useNavigate();
	return (
		<div className={className}>
			<img src={imageUrl} alt="post img" />
			<H2>{title}</H2>
			<SpecialPannel
				id={id}
				publishedAt={publishedAt}
				editButton={
					<Icon
						id="fa-pencil-square-o"
						size="25px"
						onClick={() => navigate(`/post/${id}/edit`)}
						title="Редактировать статью"
					/>
				}
			/>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	margin: 50px 50px 25px 50px;
	text-align: justify;
	overflow-wrap: break-word;
	img {
		float: left;
		margin: 0 30px 20px 0;
		border-radius: 2rem;
		box-shadow: 0 0 30px 5px #000;
	}
	H2 {
		font-size: 35px;
		margin-bottom: 10px;
		text-decoration: underline;
	}
	.post-text {
		white-space: pre-line;
		font-size: 18px;
	}
`;

PostContent.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
