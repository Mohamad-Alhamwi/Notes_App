//const validator = require('validator');
const yargs = require('yargs');
const notes = require('./notes');

// Create 'Add' Command.
yargs.command(
    {
        command: 'Add',
        describe: 'Command Description: Adding a new note.',
        builder:
        {
            title: 
            {
                describe: "Note title",
                demandOption: true,
                type: 'string'
            },
            body:
            {
                describe: "Note body.",
                demandOption: true,
                type: 'string'
            }
        }, 
        handler(argv)
        {
            notes.addNote(argv.title, argv.body);
        }
    }
);

// Create 'Remove' Command.
yargs.command(
    {
        command: 'Remove',
        describe: 'Command Description: Removing a note by giving its ID.',
        builder:
        {
            ID: 
            {
                describe: "Note ID",
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv)
        {
            notes.removeNote(argv.ID);
        }
    }
);

// Create 'List' Command.
yargs.command(
    {
        command: 'List',
        describe: 'Command Description: Listing out all notes.',
        handler()
        {
            notes.listNotes();
        }
    }
);

// Create 'Read' Command.
yargs.command(
    {
        command: 'Read',
        describe: 'Command Description: Reading a note by giving its ID.',
        builder:
        {
            ID: 
            {
                describe: "Note ID",
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv)
        {
            notes.readNote(argv.ID);
        }
    }
);

// Create 'Edit' Command.
yargs.command(
    {
        command: 'Edit',
        describe: 'Command Description: Editing a note by giving its ID.',
        builder:
        {
            ID: 
            {
                describe: "Note ID",
                demandOption: true,
                type: 'string'
            },
            title: 
            {
                describe: "Note title",
                demandOption: false,
                type: 'string'
            },
            body:
            {
                describe: "Note body.",
                demandOption: false,
                type: 'string'
            }
        }, 
        handler: (argv) =>
        {
            notes.editNote(argv.ID, argv.title, argv.body);
        }
    }
);

yargs.parse();