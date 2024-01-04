const yargs = require('yargs');
const builder = require('./builder');
const { add, remove, listAll, read } = require('./notes_app.helper');

// yargs.command helps us add commands to the command line which can be used by the user
// node index.js --help will show you all commands available.
yargs.command({
    command: ['add', 'new', 'a'],
    description: 'Add a new note',
    showInHelp: true,
    builder: builder,
    // The handler will only be called if validation passes
    handler: function(argv) {
        add(argv.title, argv.body);
    }
});

yargs.command({
    command:['remove', 'rm'],
    description: 'Remove note using title',
    showInHelp: true,
    builder: {title: builder.title},
    handler: function(argv) {
       remove(argv.title);
    }
});

yargs.command({
    command: ['list', 'ls'],
    description: 'List all Notes',
    showInHelp: true,
    builder:{},
    handler: function(){
        listAll();
    }
});

yargs.command({
    command: 'cat',
    description: 'Read a note',
    showInHelp: true,
    builder:{title: builder.title},
    handler: function(argv){
        read(argv.title);
    }
})

yargs.parse(); 