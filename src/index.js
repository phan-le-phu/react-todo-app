import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";

class TodoInput extends React.Component {
    render() {
        return (
            <div style={{position: "relative"}}>
                <input 
                    style={{width: "192px", marginBottom: "5px"}}
                    type="text" 
                    value={this.props.value} 
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    onChange={this.props.onChange}>
                </input>
                {   
                    this.props.displayBtn &&
                        <button 
                            style={{position: "absolute", right: "1px"}}
                            type="submit"
                            onMouseDown={e => e.preventDefault()} 
                            onClick={this.props.onClick}>Add</button>
                }
            </div>
        );
    }
}

class ActionButtons extends React.Component {
    render () {
        return (
            <div>
                <button onClick={this.props.onViewAllClick} type="buton">Added</button>
                <button onClick={this.props.onViewOnlyUnderdoneClick} type="buton">Underdone</button>
                <button onClick={this.props.onViewOnlyDoneClick} type="buton">Done</button>
            </div>
        ); 
    }
}

class Todo extends React.Component {


    render() {
        const idTodo = this.props.id;
        let className = "todo";
        className += this.props.isDone ? " done" : "";
        
        return (
            <button className={className} onClick={() => this.props.onClick(idTodo)}>{this.props.content}</button>
        );
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [
                {
                    id: 0,
                    content: "todo 1",
                    isDone: false,
                },
                {
                    "id": 1,
                    content: "todo 2",
                    isDone: true,
                }

            ],

            todoInputValue: "",

            isViewAll: true,
            isViewOnlyDone: null,

            isDisplayAddBtn: false,
        };
        
        this.onToDoInputChange = this.onToDoInputChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleViewAllClick = this.handleViewAllClick.bind(this);
        this.handleViewOnlyDoneClick = this.handleViewOnlyDoneClick.bind(this);
        this.handleViewOnlyUnderdoneClick = this.hanleViewOnlyUnderdoneClick.bind(this);
        this.handleTodoClick = this.handleTodoClick.bind(this);
        this.handleTodoInputFocus = this.handleTodoInputFocus.bind(this);
        this.handleTodoInputBlur = this.handleTodoInputBlur.bind(this);
    }

    onToDoInputChange(e) {
        this.setState({todoInputValue: e.target.value});
    }

    handleViewAllClick() {
       this.setState({
            isViewAll: true,
            isViewOnlyDone: null,
       }) 
    }

    handleViewOnlyDoneClick() {
        this.setState({
            isViewAll: false,
            isViewOnlyDone: true,
        })
    }

    hanleViewOnlyUnderdoneClick() {
        
        this.setState({
            isViewAll: false,
            isViewOnlyDone: false,
        })
    }

    handleTodoClick(idTodo) {

        const todoList = this.state.todoList;
        const todo = todoList[idTodo];
        
        todo.isDone = !todo.isDone;
        
        this.setState({
            todoList: todoList,
        })
    }

    handleAddClick(e) {
        const todoList = this.state.todoList;

        todoList.push({
            id: todoList.length,
            content: this.state.todoInputValue,
            isDone: false,
        });

        this.setState({
            todoList: todoList,
            todoInputValue: "",
            isDisplayAddBtn: true,
        });
    }
    
    handleTodoInputFocus() {
        this.setState({
            isDisplayAddBtn: true,
        })
    }
    
    handleTodoInputBlur() {
        this.setState({
            isDisplayAddBtn: false,
        })
    }

    render() {
        const todoList = [];
        
        this.state.todoList.forEach(todo => {
            if (this.state.isViewAll || this.state.isViewOnlyDone === todo.isDone) {
              todoList.push(<Todo 
                    key={todo.id} 
                    id={todo.id}
                    isDone={todo.isDone}
                    content={todo.content}
                    onClick={this.handleTodoClick}
                  />);  
            } 
        })
        return (
            <div className="app">
                <h3>Todos</h3>
                {todoList}
                <TodoInput
                    value={this.state.todoInputValue}
                    onChange={this.onToDoInputChange}
                    onClick={this.handleAddClick}
                    onFocus={this.handleTodoInputFocus}
                    onBlur={this.handleTodoInputBlur}
                    displayBtn={this.state.isDisplayAddBtn}
                />
                <ActionButtons
                    onViewAllClick={this.handleViewAllClick}
                    onViewOnlyDoneClick={this.handleViewOnlyDoneClick}
                    onViewOnlyUnderdoneClick={this.handleViewOnlyUnderdoneClick}
                />
            </div>
        );
    }
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<App/>)