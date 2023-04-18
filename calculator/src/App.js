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

const zeroDivisionError = "Can't divide with 0";

const App = () => {
	let [calc, setCalc] = useState({
		sign: "",
		num: 0,
		res: 0,
	});

	const math = (a, b, sign) =>
		sign === "+" ? a + b : sign === "-" ? a - b : sign === "x" ? a * b : a / b;

	//numClickHandler Function
	const numClickHandler = (e) => {
		e.preventDefault();
		const value = e.target.innerHTML;

		if (removeSpaces(calc.num).length < 16) {
			setCalc({
				...calc,
				num:
					removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
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

		setCalc({
			...calc,
			sign: e.target.innerHTML,
			res: !calc.num
				? calc.res
				: !calc.res
				? calc.num
				: toLocaleString(
						math(
							Number(removeSpaces(calc.res)),
							Number(removeSpaces(calc.num)),
							calc.sign
						)
				  ),
			num: 0,
		});
	};

	//equalClickHandler Function
	const equalsClickHandler = () => {
		if (calc.sign && calc.num) {
			setCalc({
				...calc,
				res:
					calc.num === "0" && calc.sign === "/"
						? zeroDivisionError
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

	//finalValue which evaluates before equals to
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

	//Onclick Function
	const buttonClickHandler = (e, btn) => {
		btn === "C" || calc.res === zeroDivisionError
			? resetClickHandler()
			: btn === "+-"
			? invertClickHandler()
			: btn === "Del"
			? deleteClickHandler(e)
			: btn === "="
			? equalsClickHandler()
			: btn === "/" || btn === "x" || btn === "-" || btn === "+"
			? signClickHandler(e)
			: btn === "."
			? commaClickHandler(e)
			: numClickHandler(e);
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
								onClick={(e) => buttonClickHandler(e, btn)}
							/>
						);
					})}
				</ButtonBox>
			</Wrapper>
		</>
	);
};

export default App;
