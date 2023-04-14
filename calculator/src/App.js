import "./App.css";
import React, { useState } from "react";
import Wrapper from "./Components/Wrapper.js";
import Screen from "./Components/Screen";
import ButtonBox from "./Components/ButtonBox";
import Button from "./Components/Button";

const btnValues = [
	["C", "+-", "/", "Del"],
	[7, 8, 9, "x"],
	[4, 5, 6, "-"],
	[1, 2, 3, "+"],
	[0, ".", "="],
];

const toLocaleString = (num) =>
	String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");
const App = () => {
	let [calc, setCalc] = useState({
		sign: "",
		num: 0,
		res: 0,
	});

	const math = (a, b, sign) =>
		sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b : a / b;
	//numClickHandler Function
	const numClickHandler = (e) => {
		e.preventDefault();
		const value = e.target.innerHTML;

		if (removeSpaces(calc.num).length < 16) {
			setCalc({
				...calc,
				num:
					calc.num === 0 && value === "0"
						? "0"
						: removeSpaces(calc.num) % 1 === 0
						? toLocaleString(Number(removeSpaces(calc.num + value)))
						: toLocaleString(calc.num + value),
				res: !calc.sign ? 0 : calc.res,
			});
		}
	};

	//commaClickHandler Function
	const commaClickHandler = (e) => {
		e.preventDefault();
		const value = e.target.innerHTML;
		setCalc({
			...calc,
			num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
		});
	};

	//signClickHandler Function
	const signClickHandler = (e) => {
		e.preventDefault();
		const value = e.target.innerHTML;

		setCalc({
			...calc,
			sign: value,
			res: !calc.res && calc.num ? calc.num : calc.res,
			num: 0,
		});
	};

	//equalClickHandler Function
	const equalsClickHandler = () => {
		if (calc.sign && calc.num) {
			setCalc({
				...calc,
				res:
					calc.num === 0 && calc.sign === "/"
						? "Can't divide with zero"
						: toLocaleString(
								math(
									Number(removeSpaces(calc.res)),
									Number(removeSpaces(calc.num)),
									calc.sign
								)
						  ),
				sign: "",
				num: 0,
			});
		}
	};

	//invertCickHandler Function
	const invertClickHandler = () => {
		setCalc({
			...calc,
			num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
			res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
			sign: "",
		});
	};

	//deleteClickHandler Function
	const deleteClickHandler = (e) => {
		e.preventDefault();
		const givenString = toLocaleString(calc.num);
		setCalc({
			...calc,

			num: givenString.substring(0, givenString.length - 1),
		});
	};

	//resetClickHandler Function
	const resetClickHandler = () => {
		setCalc({
			...calc,
			sign: "",
			num: 0,
			res: 0,
		});
	};

	const finalValue = () => {
		return calc.num && calc.res
			? "(" +
					toLocaleString(
						math(
							Number(removeSpaces(calc.res)),
							Number(removeSpaces(calc.num)),
							calc.sign
						)
					) +
					")"
			: "";
	};

	return (
		<>
			<h1 className='heading'>Calculator</h1>
			<Wrapper>
				<Screen
					value={`${calc.num ? calc.num : calc.res}`}
					result={`${finalValue()}`}
				/>
				<ButtonBox>
					{btnValues.flat().map((btn, i) => {
						return (
							<Button
								key={i}
								className={
									btn === "=" ? "equals" : btn === "Del" ? "delete" : ""
								}
								value={btn}
								onClick={
									btn === "C"
										? resetClickHandler
										: btn === "+-"
										? invertClickHandler
										: btn === "Del"
										? deleteClickHandler
										: btn === "="
										? equalsClickHandler
										: btn === "/" || btn === "x" || btn === "-" || btn === "+"
										? signClickHandler
										: btn === "."
										? commaClickHandler
										: numClickHandler
								}
							/>
						);
					})}
				</ButtonBox>
			</Wrapper>
		</>
	);
};

export default App;
