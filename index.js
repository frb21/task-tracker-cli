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
const addTask = async (tasks) => {
  try{
    const tasks = loadTasks();
    const prompts = await inquirer.prompt([
     {
         name: 'description',
         message: 'Enter a new Task:'
        
     },

     {
         name: 'date',
         message: 'Enter Date:'
     },

    {
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
    return;
  }

};


// delete task
const deleteTask = () => {
const tasks = loadTasks();
 try{
    if(tasks.length === 0){
        console.log(chalk.yellow('No current tasks'));
        return;
    }
    const taskNum = inquirer.prompt([
        {
            'name': 'taskNumber',
            'message': 'Pick Task Number'
        }
    ]);




 }
 catch(err){

 }
};



// update task
// display tasks list
























