const yargs = require('yargs');
const fs = require('fs');
const builder = require('./builder');

// yargs.command helps us add commands to the command line which can be used by the user
// node index.js --help will show you all commands available.
yargs.command({
    command: ['add', 'new', 'a'],
    description: 'Add a new note',
    showInHelp: true,
    builder: builder,
    // The handler will only be called if validation passes
    handler: function(argv) {
        let notesDoc;
        // read the file, if not found create one!
        try {
            const notesBuffer = fs.readFileSync('notes.json');
            notesDoc = JSON.parse(notesBuffer);
        } catch (err) {
            if(err.code == 'ENOENT')
                notesDoc = { 'notes': [] };
        };

        notesDoc.notes.push({ title: argv.title, body: argv.body });
        fs.writeFileSync('notes.json', JSON.stringify(notesDoc, null, 2));
        console.log("Note added successfully");
    }
});

yargs.command({
    command:['remove', 'rm'],
    description: 'Remove note using title',
    showInHelp: true,
    builder: {title: builder.title},
    handler: function(argv) {
        let notesDoc;
        // read the file, if not found create one!
        try {
            const notesBuffer = fs.readFileSync('notes.json');
            notesDoc = JSON.parse(notesBuffer);
            notesDoc.notes = notesDoc.notes.filter((note)=>note.title!=argv.title);
            fs.writeFileSync('notes.json', JSON.stringify(notesDoc, null, 2));
            console.log("Note removed successfully");
        } catch (err) {
            console.log("Note not found to delete");
        };
    }
});

yargs.command({
    command: ['list', 'ls'],
    description: 'List all Notes',
    showInHelp: true,
    builder:{},
    handler: function(){
        try {
            const notesBuffer = fs.readFileSync('notes.json');
            notesDoc = JSON.parse(notesBuffer);
            if(notesDoc.notes.length)
                notesDoc.notes.forEach((note)=>{
                    console.log("Title: ", note.title);
                    console.log("Body: ", note.body);
                });
            else
                console.log('No notes exist yet!');
        }catch(err) {
            console.log('No notes created yet');
        }
    }
});

yargs.command({
    command: 'cat',
    description: 'Read a note',
    showInHelp: true,
    builder:{title: builder.title},
    handler: function(argv){
        try {
            const notesBuffer = fs.readFileSync('notes.json');
            notesDoc = JSON.parse(notesBuffer);
            if(notesDoc.notes.length){
                let note = notesDoc.notes.find((note)=>note.title==argv.title);
                console.log(note.body);
            }
            else
                console.log('No notes found with the title you searched!');
        }catch(err) {
            console.log('No notes created yet');
        }
    }
})

yargs.parse(); 