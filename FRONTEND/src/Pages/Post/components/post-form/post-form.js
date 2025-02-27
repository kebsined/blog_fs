import { useLayoutEffect, useRef, useState } from 'react';
import { Input, Icon } from '../../../../Components';
import { SpecialPannel } from '../special-pannel/special-pannel';
import styled from 'styled-components';
import { sanitizeContent } from './utils';
import { useDispatch } from 'react-redux';
import { savePostAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';
import { PROP_TYPE } from '../../../../constants';

const PostFormContainer = ({
	className,
	post: { id, title, content, publishedAt, imageUrl },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [imageUrl, title]);

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(id, {
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};
	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				onChange={(e) => setImageUrlValue(e.target.value)}
				placeholder="Ссылка на зображение..."
			/>
			<Input
				value={titleValue}
				placeholder="Название статьи..."
				onChange={(e) => setTitleValue(e.target.value)}
			/>
			<SpecialPannel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={
					<Icon
						id="fa-floppy-o"
						size="25px"
						onClick={onSave}
						title="Редактировать статью"
					/>
				}
			/>
			<div
				ref={contentRef}
				contentEditable="true"
				suppressContentEditableWarning="true"
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	margin: 50px 50px 25px 50px;
	text-align: justify;

	.post-text {
		white-space: pre-line;
		min-height: 100px;
		border: 1px solid #000;
		padding: 15px;
		border-radius: 1rem;
	}
	img {
		float: left;
		margin: 0 20px 10px 0;
		border-radius: 2rem;
		box-shadow: 0 0 30px 5px #000;
	}
	Input {
		margin-bottom: 10px;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
