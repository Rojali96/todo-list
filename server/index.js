const express= require("express")
const mongoose= require("mongoose")

const app=express();

app.use(express.json());



const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017/todo-list';
const client = new MongoClient(uri);

// Connect to MongoDB
async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
}

// Example function to insert a new task
async function insertTask(task) {
  try {
    const database = client.db('todoapp');
    const tasksCollection = database.collection('tasks');
    const result = await tasksCollection.insertOne(task);
    console.log('New task inserted with ID:', result.insertedId);
  } catch (err) {
    console.error('Error inserting task:', err);
  }
}

// Example function to update a task
async function updateTask(taskId, update) {
  try {
    const database = client.db('todoapp');
    const tasksCollection = database.collection('tasks');
    const result = await tasksCollection.updateOne({ _id: taskId }, { $set: update });
    console.log('Task updated:', result.modifiedCount);
  } catch (err) {
    console.error('Error updating task:', err);
  }
}

// Example function to delete a task
async function deleteTask(taskId) {
  try {
    const database = client.db('todoapp');
    const tasksCollection = database.collection('tasks');
    const result = await tasksCollection.deleteOne({ _id: taskId });
    console.log('Task deleted:', result.deletedCount);
  } catch (err) {
    console.error('Error deleting task:', err);
  }
}

// Example function to get all tasks
async function getAllTasks() {
  try {
    const database = client.db('todoapp');
    const tasksCollection = database.collection('tasks');
    const tasks = await tasksCollection.find({}).toArray();
    console.log('All tasks:', tasks);
  } catch (err) {
    console.error('Error getting tasks:', err);
  }
}

// Usage example
async function main() {
  await connect();

  const newTask = {
    title: 'Example Task',
    description: 'This is an example task',
    dueDate: new Date('2024-03-01'),
    completed: false
  };

  await insertTask(newTask);

  // Assuming taskId is obtained from the inserted task
  const taskId = '...';

  await updateTask(taskId, { completed: true });

  await deleteTask(taskId);

  await getAllTasks();

  // Close MongoDB connection
  await client.close();
}

main();
app.listen(3000,function(){
    console.log("runint on port 3000");
});
