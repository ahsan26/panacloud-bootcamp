import React from "react";
import { connect } from "react-redux";
import TodoActions from "../Store/Middlewares/todo";
import TodoForm from "./todoForm";
import EachTodo from "./eachTodo";

class TodoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            txt: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.newTodo = this.newTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value.trim()
        })
    }
    componentDidMount() {
        this.setState({
            todos: this.props.todos
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            todos: nextProps.todos
        });
    }
    newTodo(e) {
        e.preventDefault();
        const { txt } = this.state;
        if (txt) {
            this.props.addTodo(txt);
            this.setState({
                txt: ''
            });
        }
    }
    deleteTodo(id) {
        this.props.removeTodo(id);
    }
    render() {
        return (
            <div>
                <TodoForm
                    txt={this.state.txt}
                    handleChange={this.handleChange}
                    newTodo={this.newTodo}
                />
                <ul>
                    {
                        this.state.todos.map(todo =>
                            <EachTodo
                                key={todo.id}
                                id={todo.id}
                                deleteTodo={this.deleteTodo}
                                txt={todo.txt}
                            />)
                    }
                </ul>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    todos: state.todo
});
export default connect(mapStateToProps, { addTodo: TodoActions.addTodo, removeTodo: TodoActions.removeTodo })(TodoContainer);
