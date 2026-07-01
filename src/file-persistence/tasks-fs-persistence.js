import { appendToFile } from './fs-persistence.js';

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const filename = 'tasks.txt';
// Necesario en ESM para obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folder = path.join(__dirname, "tasks");
const file = path.join(folder, filename);

export const saveTask = (task) => saveToFile(file, task);
export const appendTask = (task) => {
    var newTask = `T${new Date().toISOString()},${task},todo`;
    console.log("Appending task:", newTask);
    appendToFile(file, newTask);
};
export const readTasks = () => readFromFile(file);
export const deleteTaskFile = () => deleteFile(file);

const task =  {
    id: new Date().toISOString(),
    task: "Task from fs-persistence",
    status: "todo"
}