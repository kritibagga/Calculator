import "./Screen.css";
import { Textfit } from "react-textfit";

const Screen = ({ value, result }) => {
	return (
		<Textfit
			className='screen'
			mode='single'
			max={70}>
			{String(result).length < 12 ? (
				<span className='final-result'>{result}</span>
			) : (
				""
			)}
			{value}
		</Textfit>
	);
};

export default Screen;
