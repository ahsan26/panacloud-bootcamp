import TodoActions from "../Actions/todo";
import { getUniqueId } from "../../Utils";


export default (state = [], action) => {
    switch (action.type) {
        case TodoActions.SAVE_TODO:
            state = [
                ...state,
                {
                    id: getUniqueId(),
                    txt: action.txt
                }
            ];
            return state;
        case TodoActions.DELETE_TODO:
            const desiredTodos = state.filter(item => item.id !== action.id);
            console.log(desiredTodos,action.id)
            state =[... desiredTodos];
            return state;
        default:
            return state;
    }
};