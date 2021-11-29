const fs = require('fs');
const chalk = require('chalk');
const crypto = require("crypto");

// Util function to get the notes.
const loadNotes = () =>
{
    try
    {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        const data = JSON.parse(dataJSON);
        
        return data;
    }
    catch(err)
    {
        return [];
    }
}

// Util function to save the notes.
const saveNotes = (notes) =>
{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

// Function to add a new note.
const addNote = (title, body) =>
{
    const notes = loadNotes();

    const duplicateNote = notes.find( (note) => note.title === title );

    if(duplicateNote === undefined)
    {
        notes.push(
            {
                ID: `#${crypto.randomBytes(5).toString('hex')}`,
                title: title,
                body: body
            }
        );

        saveNotes(notes);
        console.log(chalk.green.inverse('New note has been added!'));
    }
    else
    {
        console.log(chalk.yellow.inverse('Note title has already been taken!'));
    }
}

// Function to remove a note.
const removeNote = (ID) =>
{
    const notes = loadNotes();

    const returnedNote = notes.filter( (note) => note.ID !== ID );
    
    if(notes.length > returnedNote.length)
    {
        console.log(chalk.green.inverse(`The note with ${ID} ID has been successfully removed!`));
    }
    else
    {
        console.log(chalk.yellow.inverse(`There is no note with this ID!`));
    }

    saveNotes(returnedNote);
}

// Function to list all notes.
const listNotes = () =>
{
    const allNotes = loadNotes();

    console.log( chalk.bgCyan("                                            ") );
    console.log( chalk.bold.underline("Your Notes:") , "\n");
    allNotes.forEach( (note) => console.log( (`Note Title:`), chalk.italic(`${note.title}`)) );
    console.log( chalk.bgCyan("                                            ") );
}

// Function to read a particular note.
const readNote = (ID) =>
{
    const notes = loadNotes();

    const desiredNote = notes.find( (note) => note.ID === ID );

    if(desiredNote === undefined)
    {
        console.log(chalk.yellow.inverse(`There is no note with this ID!`));
    }
    else
    {
        console.log( chalk.bgCyan("                                            ") );
        console.log( chalk.bold(desiredNote.title) );
        console.log(desiredNote.body);
        console.log( chalk.bgCyan("                                            ") );
    }
}

// Function to edit a particular note.
const editNote = (ID, title, body) =>
{
    const notes = loadNotes();

    const desiredNote = notes.find( (note) => note.ID === ID );
    const desiredNoteIndex = notes.indexOf(desiredNote);

    if(desiredNote === undefined)
    {
        console.log(chalk.yellow.inverse(`There is no note with this ID!`));
    }
    else
    {
        if(title === undefined && body === undefined)
        {
            console.log(chalk.red.inverse(`Please provide a new note title or new note body!`));
            return;
        }
        else
        {
            if(title === undefined)
            {
                desiredNote.body = body;
            }
            else if(body === undefined)
            {
                desiredNote.title = title;
            }
            else
            {
                desiredNote.title = title;
                desiredNote.body = body;
            }

            notes[desiredNoteIndex] = desiredNote;
            saveNotes(notes);
            console.log(chalk.green.inverse(`The note has been successfully updated!`));
        }
    }
}

module.exports = 
{
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
    editNote: editNote
}