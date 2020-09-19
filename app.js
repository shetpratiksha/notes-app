//FILE SYSTEM
// const fs = require('fs')
// // fs.writeFileSync('notes.txt','this is first nodejs code on writeFileSync.!!! ')
// fs.appendFileSync('notes.txt','Use of appendfileSync in node js ')

//IMPORT FILES
const notes = require('./notes')

//validator npm modules
const validator = require('validator')
const chalk  = require('chalk')
// console.log(notes());
// console.log(validator.isEmail('abc@pqr'))
// console.log(chalk.red.bold.inverse('Error!!'))

//Command line Arguments
// const command = process.argv[2]

// if(command === 'add'){
//     console.log('Adding notes')
// }
// else if(command === 'remove'){
//     console.log('Removing notes')
// }

//Yargs 
const yargs = require('yargs')
yargs.version('1.1.0')
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type:'string'
        },
        body:{
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        // console.log('Title: '+argv.title)
        // console.log('Body: '+argv.body)
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler: function(argv){
      //  console.log('Removing a note');
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List a note',
    builder:{
        title:{
            describe:'Read Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler: function(){
        console.log('Listing note data')
        notes.listNote()
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler(argv){
      //  console.log('Reading note data '+argv.title)
        notes.readNote(argv.title)
    }
})

yargs.parse();
//console.log(yargs.argv)