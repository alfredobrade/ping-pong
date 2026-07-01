import { connect } from "./mongo-connection.js";
import { ObjectId } from "mongodb";

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
    var taskToInsert = {
        code: `T${new Date().toISOString()}`,
        task: task,
        createdAt: new Date(),
        completed: false,
        completedAt: null,
        status: "todo"
    };
    try {
        const db = await connect();
        const tasks = db.collection("tasks");
        const result = await tasks.insertOne(taskToInsert);
        return {...taskToInsert, _id: result.insertedId};
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

export async function updateTask(taskId, updatedFields) {
    try {
        const db = await connect();
        const tasks = db.collection("tasks");
        const result = await tasks.updateOne({ _id: taskId }, { $set: updatedFields });
        return result;
    } catch (err) {
        console.error("Error updating task:", err);
        throw err;
    }
}

export async function completeTask(taskId) {
    try {
        const db = await connect();
        const tasks = db.collection("tasks");
        const oid = new ObjectId(taskId);
        const result = await tasks.updateOne({ _id: oid }, { $set: { completed: true, completedAt: new Date() } });
        console.log("Task completed:", result);
        const taskCompleted = await tasks.findOne({ _id: oid });
        console.log("Task after completion:", taskCompleted);
        return taskCompleted;
    } catch (err) {
        console.error("Error completing task:", err);
        throw err;
    }
}