export default class {
    static SAVE_TODO = 'SAVE_TODO';
    static DELETE_TODO = 'DELETE_TODO';
    static saveTodo(txt) {
        return {
            type: this.SAVE_TODO,
            txt
        }
    }
    static deleteTodo(id) {
        return {
            type: this.DELETE_TODO,
            id
        }
    }
}