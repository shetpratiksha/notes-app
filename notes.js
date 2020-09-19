const fs = require('fs')
const chalk  = require('chalk')
const getNotes = function(){
    return 'Here are notes';
}

const addNote = function(title, body){
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })

    if(duplicateNotes.length === 0){
        notes.push({
            'title': title,
            'body': body
        })
    
        saveNotes(notes)
        console.log('New note is added..!!')
    }
    else{
        console.log('Note already taken..!!')
    }
   
}

const removeNote = function(title){
    const notes = loadNotes()
    const rmvNote = notes.filter(function(note){
        return note.title !== title
    })

    if(notes.length > rmvNote.length){
        console.log(chalk.green.bold.inverse('note removed'))
        saveNotes(rmvNote)
    }
    else{
        console.log(chalk.red.bold.inverse('No note found'))
    }
}

const listNote = () =>{
    console.log(chalk.green.bold.inverse('Your notes'))
    const notes = loadNotes()

    notes.forEach(element => {
        console.log(element.title);
    });
}

const readNote = (title) =>{
    const notes = loadNotes();
    const findNote = notes.find((note) => note.title === title)
    //console.log(findNote);

    debugger;
    if(findNote){
        console.log('Title: '+chalk.yellow.inverse(findNote.title) + ' Body: '+findNote.body)
    }
    else{
        console.log(chalk.red.inverse('No note found..!!'))
    }

}

const saveNotes = function(notes){
    const data = JSON.stringify(notes)
    fs.writeFileSync('notes.json', data)
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    }
    catch(e){
        return []
    }
}
module.exports =  {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNote:listNote,
    readNote:readNote
}