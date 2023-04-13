import "./App.css";
import Wrapper from "./Components/Wrapper.js";
import Screen from "./Components/Screen";
import ButtonBox from "./Components/ButtonBox";
import Button from "./Components/Button";

const btnValues = [
	["C", "+-", "%", "/"],
	[7, 8, 9, "X"],
	[4, 5, 6, "-"],
	[1, 2, 3, "+"],
	[0, ".", "="],
];
function App() {
	return (
		<>
    <h1 className="heading">Calculator</h1>
			<Wrapper>
				<Screen value='0' />
				<ButtonBox>
					{btnValues.flat().map((btn, i) => {
						return (
							<Button
								key={i}
								className={btn === "=" ? "equals" : ""}
								value={btn}
								onClick={() => {
									console.log(`${btn} clicked!`);
								}}
							/>
						);
					})}
				</ButtonBox>
			</Wrapper>
		</>
	);
}

export default App;
