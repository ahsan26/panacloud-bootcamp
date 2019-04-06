const fs = require("fs");
const chalk = require("chalk");

const loadData = () => {
    try {
        let data;
        data = fs.readFileSync('./data.txt');
        data = JSON.parse(data);
        return data;
    }
    catch (e) {
        return [];
    }
}

const addTodo = (title, description) => {
    const data = loadData();
    const statusOfDuplicate = chkDuplicate(title, data);
    if (statusOfDuplicate) {
        console.log(chalk.bgRed.white('Title is already registered!'));
    } else {
        const newtodo = { title, description };
        const tmpData = [...data, newtodo];
        updateTodos(tmpData);
        console.log(chalk.green('Todo is Saved!'));
    }
}

const updateTodos = data => {
    const jsonData = JSON.stringify(data);
    fs.writeFileSync('./data.txt', jsonData);
}

const chkDuplicate = (title, data) => {
    const foundTodo = data.find(todo => todo.title.toLowerCase() === title.toLowerCase());
    return !!foundTodo;
}

const deleteTodo = (title) => {
    const data = loadData();
    const filteredTodos = data.filter(todo => todo.title.toLowerCase() !== title.toLowerCase());
    if (data.length !== filteredTodos.length) {
        updateTodos(filteredTodos);
        console.log(chalk.green('Your Requested Todo is Deleted!'))
    } else {
        console.log(chalk.red('Your Given Title is Not Found!'))
    }
}

const showTodos = () => {
    const data = loadData();
    if (!data.length) console.log(chalk.red('No Todos Yet!'));
    console.log(chalk.bgRed.white('Todos: \n'));
    data.forEach((todo, i) => {
        console.log(chalk.cyan(`    ${i + 1}. ${todo.title}`))
    })
};

const showSpecificTodo = title => {
    const data = loadData();
    const targetedtodo = data.find(todo => todo.title.toLowerCase() === title.toLowerCase())
    if (!targetedtodo) {
        console.log(chalk.bgRed.white('Your Requested Todo Title is Invalid!'));
        return;
    }
    else {
        console.log(chalk.green(`Title: ${targetedtodo.title}\nDescription: ${targetedtodo.description}`))
    }
}

module.exports = {
    loadData,
    showTodos,
    deleteTodo,
    addTodo,
    showSpecificTodo
}