import { connect } from "./mongo-connection.js";

const db = await connect();
const tasks = db.collection("tasks");

export async function getAllTasks() {
    try {
        const db = await connect();
        const tasks = db.collection("tasks");
        const allTasks = await tasks.find().toArray();
        return allTasks;
    } catch (err) {
        console.error("Error getting tasks:", err);
        throw err;
    }
}

export async function addTask(task) {
    try {
        const db = await connect();
        const tasks = db.collection("tasks");
        const result = await tasks.insertOne(task);
        return result;
    } catch (err) {
        console.error("Error adding task:", err);
        throw err;
    }   
}

export async function deleteTask(taskId) {
    try {
        const db = await connect();
        const tasks = db.collection("tasks");
        const result = await tasks.deleteOne({ _id: taskId });
        return result;
    } catch (err) {
        console.error("Error deleting task:", err);
        throw err;
    }
}