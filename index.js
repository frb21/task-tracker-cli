import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';

const tasksFile = 'data.json';

// return list of tasks
const loadTasks = () => {
  try{
    const tasks = fs.readFileSync(tasksFile, 'utf-8');
    const parsedTasks = JSON.parse(tasks);

    if(Array.isArray(parsedTasks)){
      return parsedTasks;
    }
    else{
      return [];
    }
 }

  catch(err){
    return [];
  }
};

// save tasks
const saveTasks = (tasks) => {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
};


// add new task
const addTask = async () => {
  try{
    const tasks = loadTasks();
    const prompts = await inquirer.prompt([
     {
         type: 'input',
         name: 'description',
         message: 'Enter a new Task:'
        
     },

     {
         type: 'input',
         name: 'date',
         message: 'Enter Date:'
     },

    {
         type: 'input',
         name: 'due',
         message: 'Set Due:'
    }

]);
    
    tasks.push({
        description: prompts.description,
        date: prompts.date,
        due: prompts.due
    });

    saveTasks(tasks);
    console.log(chalk.green('Task added successfully!'));
}
  
  catch(err){
    console.log(chalk.red('An error occurred'));
  }

};


// delete task
const deleteTask = async () => {
const tasks = loadTasks();
 try{
    if(tasks.length === 0){
        console.log(chalk.yellow('No current tasks'));
        return;
    }
    const taskNum = await inquirer.prompt(
        {
            type: 'number',
            name: 'taskNumber',
            message: 'Pick Task Number'
        });

     tasks.splice(taskNum.taskNumber, 1);
     saveTasks(tasks);
 }
 catch(err){
    console.log(chalk.red('An error has occured while removing a task.'));
 }
};

const mainMenu = async () => {
  try{
    const menu = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View Tasks', 'Add Task', 'Update Task', 'Delete a Task']
        });
        
        if(menu.action === 'View Tasks'){
            displayTasks();
        }

        else if(menu.action === 'Add Task'){
            await addTask();
        }

        else if(menu.action === 'Update Task'){
            await updateTask();
        }

        else{
           await deleteTask();
        }

    mainMenu();
  }

  catch(err){
    return;    
  }
};

// update a task
const updateTask = async () => {
  try{
    const tasks = loadTasks();
    const taskNum = await inquirer.prompt({
        type: 'number',
        name: 'taskNumber',
        message: `Enter a task number: (1 - ${tasks.length})`
    });

    if(taskNum.taskNumber !== 0){
        const modify = await inquirer.prompt([
            {
                type: 'input',
                name: 'description',
                message: 'Set New Description:'
            },

            {
                type: 'input',
                name: 'date',
                message: 'Set New Date:'
            },

            {
                type: 'input',
                name: 'due',
                message: 'Set New Due Date:'
            }
        ]);

        tasks[taskNum.taskNumber - 1].description = modify.description !== null ? modify.description : description;
        tasks[taskNum.taskNumber - 1].date = modify.date !== null ? modify.date : date;
        tasks[taskNum.taskNumber - 1].due = modify.due !== null ? modify.due : due;

        saveTasks(tasks);
        console.log(chalk.green('Successfully updated the task!'));
    }
  }
  
  catch(err){
    console.log(chalk.red('An error occurred while updating the task.'));
  }
};


// display tasks list
const displayTasks = () => {
  try{
    const tasks = loadTasks();
    if(tasks.length === 0){
        console.log(chalk.yellow('No tasks found.'));
    }

    tasks.forEach((task, index) => {
        console.log(chalk.cyan.bold(`\n${index + 1}. ${task.description} ${task.due}`));
    });

  }

  catch(err){
    console.log('An error occurred.');
  }
};

mainMenu();





















