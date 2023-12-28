import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, checkedTodo, deleteTodo , editTodo} from "./todoSlice";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
const App = () => {
	const [selectedId, setSelectedId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
	const dispatch = useDispatch();
	const state = useSelector((state) => state.todo.list);

	const handeSubmit = (e) => {
		e.preventDefault();
		const inputValue = e.target[0].value;
		const obj = {
			id: Date.now(),
			title: inputValue,
			checked: false,
		};
		dispatch(addTodo(obj));
	};

	const editTodoFunc = (id) => {
		setSelectedId(id);
	};

  const saveTodo = (id, title) => {
    dispatch(editTodo({id , title}))
    setSelectedId(null);
  }

	console.log(state);

	return (
		<Paper
			onSubmit={(e) => handeSubmit(e)}
			component={"form"}
			sx={{
				width: "600px",
				height: "500px",
				border: "2px solid gray",
				margin: "100px auto",
				padding: "40px",
			}}
		>
			<Stack direction={"row"}>
				<input
					style={{ width: "100%", padding: "10px" }}
					type="text"
					placeholder="Enter some text..."
				/>
				<button style={{ padding: "0 20px", marginLeft: "5px" }} type="submit">
					Add
				</button>
			</Stack>

			<Box>
				{state &&
					state.map((item) => (
						<Stack
							className="checket"
							key={item.id}
							direction={"row"}
							border={"1px solid gray"}
							mt={1}
							style={{
								padding: "5px 10px",
								filter: item.checked === true ? "grayscale(1)" : "",
							}}
						>
							<input
								onClick={() => dispatch(checkedTodo(item.id))}
								type="checkBox"
								style={{ transform: "scale(1.7)", marginRight: "10px" }}
							/>

							{selectedId === item.id ? (
								<input
									style={{ width: "85%", padding: "5px" }}
									defaultValue={item.title}
                  onChange={(e) => setNewTitle(e.target.value)}
								/>
							) : (
								<Typography
									variant="h6"
									width={"85%"}
									style={{
										textDecoration:
											item.checked === true ? "line-through" : "none",
									}}
								>
									{item.title}
								</Typography>
							)}

							{selectedId === item.id ? (
								<button onClick={() => saveTodo(item.id , newTitle)} type="button" style={{background:'green', color:'white' , padding:'5px'}}>Save</button>
							) : (
								<DriveFileRenameOutlineIcon
									onClick={() => editTodoFunc(item.id)}
									className="edit"
									style={{ marginRight: "15px" }}
								/>
							)}
							<DeleteSharpIcon
								className="delete"
								onClick={() => dispatch(deleteTodo(item.id))}
							/>
						</Stack>
					))}
			</Box>
		</Paper>
	);
};

export default App;
