import TodoActions from "../Actions/todo";

export default class {
  
    static addTodo = (text) => dispatch => {
        dispatch(TodoActions.saveTodo(text));
    }

    static removeTodo = (id) => dispatch => {
        dispatch(TodoActions.deleteTodo(id));
    }

};