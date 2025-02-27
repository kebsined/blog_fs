import { useEffect, useMemo, useState } from 'react';

import { PostCard, Pagination, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce } from './utils';
import styled from 'styled-components';
import { request } from '../../utils/request';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');

	useEffect(() => {
		request(
			`/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { posts, lastPage } }) => {
			setPosts(posts);
			setLastPage(lastPage);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<Search onChange={onSearch} searchPhrase={searchPhrase} />
			{posts.length > 0 ? (
				<div className="post-list">
					{posts.map(({ id, title, imageUrl, publishedAt, comments }) => (
						<PostCard
							id={id}
							key={id}
							title={title}
							publishedAt={publishedAt}
							commentsCount={comments.length}
							imageUrl={imageUrl}
						/>
					))}
				</div>
			) : (
				<div className="no-posts-found">Статьи не найдены</div>
			)}
			{lastPage > 1 && posts.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};
export const Main = styled(MainContainer)`
	display: flex;
	flex: 1 0 100%;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	Input {
	}
	.post-list {
		padding: 0 0 50px 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 25px;
		place-items: center;
		margin-top: 10px;
	}
	.no-posts-found {
		text-align: center;
		font-size: 25px;
		margin-top: 50px;
	}
`;
