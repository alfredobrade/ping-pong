
import fs from 'fs';

export function saveToFile(filename, data) {
    try {
        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
        console.log(`Data saved to ${filename}`);
    } catch (err) {
        console.error(`Error saving data to ${filename}:`, err);
        throw err;
    }
}

export function appendToFile(filename, data) {
    try {
        if (!fs.existsSync(filename)) {
            console.warn(`File ${filename} does not exist. Creating new file.`);
            fs.writeFileSync(filename, JSON.stringify(data, null, 2) + '\n');
            return;
        } else {
            fs.appendFileSync(filename, JSON.stringify(data, null, 2) + '\n');
            console.log(`Data appended to ${filename}`);
        }
    } catch (err) {
        console.error(`Error appending data to ${filename}:`, err);
        throw err;
    }
}


export function readFromFile(filename) {
    try {
        if (!fs.existsSync(filename)) {
            console.warn(`File ${filename} does not exist. Returning empty array.`);
            return [];
        }   
        const data = fs.readFileSync(filename, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading data from ${filename}:`, err);
        throw err;
    }
}

export function deleteFile(filename) {
    try {
        if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
            console.log(`File ${filename} deleted.`);
        } else {
            console.warn(`File ${filename} does not exist. Nothing to delete.`);
        }   
    } catch (err) {
        console.error(`Error deleting file ${filename}:`, err);
        throw err;
    }       
}

export default {
    saveToFile,
    appendToFile,
    readFromFile,
    deleteFile
};