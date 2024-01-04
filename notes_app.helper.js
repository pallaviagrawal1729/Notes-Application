const fs = require('fs');

const add = (title, body) => {
    const notesDoc = loadNotes();
    notesDoc.notes.push({ title, body });
    const isAdded = saveNotes(notesDoc);
    display(isAdded, 'saved');
}

const remove = (title) => {
    const notesDoc = loadNotes();
    const newNotesDoc = notesDoc.notes.filter((note) => note.title != title);
    if(newNotesDoc?.length < notesDoc?.length){
        const isRemoved = saveNotes(newNotesDoc);
        display(isRemoved, 'removed');
    }else{
        console.log("Note to delete not found");
    };
}

const listAll = () => {
    const notesDoc = loadNotes();
    if (!isNotesEmpty(notesDoc))
        notesDoc.notes.forEach((note) => {
            console.log("Title: ", note.title);
            console.log("Body: ", note.body);
        });
    else
        console.log('No notes exist yet!');
   
}

const read = (title) => {
    const notesDoc = loadNotes();
    if (!isNotesEmpty(notesDoc)) {
        let note = notesDoc.notes.find((note) => note.title == title);
        if (note)
            console.log(note.body);
        else
            console.log('No notes found with the title you searched!');
    } else
        console.log('No notes found with the title you searched!');
    
}

function loadNotes() {
    try {
        const notesBuffer = fs.readFileSync('notes.json');
        return JSON.parse(notesBuffer);
    } catch (err) {
        return { 'notes': [] };
    };
}

function saveNotes(notesDoc) {
    try {
        fs.writeFileSync('notes.json', JSON.stringify(notesDoc));
        return true;
    } catch (err) {
        return false;
    };
}

function display(boolVal, action){
    boolVal ? console.log(`Note ${action} successfully`) : console.log(`Note was not ${action}!`);
}

function isNotesEmpty(notesDoc) {
    return notesDoc.notes.length == 0;
}

module.exports = { add, remove, listAll, read };