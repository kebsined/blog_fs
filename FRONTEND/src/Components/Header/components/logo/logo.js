import { Icon } from '../../../../Components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LargeText = styled.div`
	font-size: 40px;
	font-weight: bold;
	margin-top: 10px;
	text-shadow: 0 4px 5px #000000ce;
`;
const SmallText = styled.div`
	font-size: 20px;
	font-weight: bold;
	line-height: 1;
	text-shadow: 0 4px 5px #000000ce;
`;
const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<Icon
			id="fa-file-code-o"
			size="70px"
			margin="0 17px 0 0"
			textShadow="0 4px 5px #000000ce"
		/>
		<div>
			<LargeText>БЛОГ</LargeText>
			<SmallText>веб-разработчика</SmallText>
		</div>
	</Link>
);
export const Logo = styled(LogoContainer)`
	display: flex;
	color: #000;
	text-decoration: none;
`;
