//import ReactDOM from "react-dom";
/* The delete icon shows only when the task is hovered.
When there is no tasks the list should "No tasks, add a task" */
import React from "react";

export class Todolist extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: [
				{ done: false, title: "Make The bed", id: Math.random() * 10 },
				{ done: false, title: "Wash my hands", id: Math.random() * 10 }
			],

			task: "",
			elminate: -1
		};

		this.addTask = this.addTask.bind(this);
		this.addTaskInTheLi = this.addTaskInTheLi.bind(this);
		this.eliminateTask = this.eliminateTask.bind(this);
	}

	addTask(event) {
		this.setState({ task: event.target.value });
	}

	eliminateTask(todo) {
		let addArray = [];
		for (let i = 0; i < this.state.todos.length; i++) {
			if (todo !== this.state.todos[i]) {
				addArray.splice(i, 1);
				addArray.push(this.state.todos[i]);
			}
		}

		this.setState({
			todos: addArray
		});
	}

	addTaskInTheLi(e) {
		console.log(e);
		if (e.key === "Enter") {
			let value = this.state.task;
			let aux = [];
			let newTodo = { done: false, title: value, id: Math.random() * 10 };
			aux.push(newTodo);

			let arrTodos = this.state.todos;

			if (this.state.task == "" || this.state.task == " ") {
				for (let i = 0; i < arrTodos.length; i++) {
					if (value !== arrTodos[i].title) {
						aux.splice(i, 0, arrTodos[i]);
					}
				}
				aux.pop();
			} else {
				for (let i = 0; i < arrTodos.length; i++) {
					if (value !== arrTodos[i].title) {
						aux.splice(i, 0, arrTodos[i]);
					}
				}
			}

			this.setState({
				todos: aux,
				task: ""
			});
		}
	}

	render() {
		return (
			<div>
				<h1>Todos</h1>
				<label>
					<input
						type="text"
						value={this.state.task}
						onChange={this.addTask}
						placeholder="Whats need to be done?"
						onKeyPress={e => {
							{
								this.addTaskInTheLi(e);
							}
						}}
					/>
				</label>

				<div>
					<ul>
						{this.state.todos.map((todo, index) => {
							let stateOfTask = this.state.elminate === index;
							return (
								<li
									key={index}
									onMouseEnter={() => {
										this.setState({ elminate: index });
									}}
									onMouseOut={() => {
										this.setState({ elminate: -1 });
									}}>
									{todo.title}
									<button
										onClick={() => this.eliminateTask(todo)}
										key={index}
										onMouseEnter={() => {
											this.setState({ elminate: index });
										}}
										style={{
											display: stateOfTask
												? "inherit"
												: "none"
										}}>
										X
									</button>
								</li>
							);
						})}
					</ul>
					<p className="left">{this.state.todos.length} item left</p>
				</div>
			</div>
		);
	}
}
