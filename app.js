const yargs = require('yargs')
const title = yargs.argv.title;
const description = yargs.argv.description;
const command = yargs.argv._[0];
const { addTodo, deleteTodo, showTodos, showSpecificTodo } = require('./todo');
const chalk = require('chalk');

if (command === 'add') {
    if (title && description)
        addTodo(title, description)
    else { console.log(chalk.red.bold('Please Provide Title and Description!')) }
} else if (command === 'delete') {
    if (title)
        deleteTodo(title)
    else { console.log(chalk.red.bold('Please Provide Title!')) }
} else if (command === 'list') {
    showTodos();
} else if (command === "todo") {
    if (title)
        showSpecificTodo(title);
    else { console.log(chalk.red.bold('Please Provide Title!')) }
}