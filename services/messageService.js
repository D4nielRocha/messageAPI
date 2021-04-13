const messageValidator = require('../validator/messageValidator');
const messageRepository = require('../repositories/messageRepository');
const validator = require('validator');

let getAllMessages = async () => {

    const messages = await messageRepository.getMessages();
    return messages;
}


let getMessageBySubject = async (subject) => {

    let message;

    if(!validator.isEmpty(subject)){

        message = await messageRepository.getMessageBySubject(subject);
    
    } else {
        console.log(`Invalid Subject`);
    }

    return message;  

}

let getMessageByDate = async (date) => {

    let message;

    if(validator.isDate(date)){

        message = await messageRepository.getMessageByDate(date);
    
    } else {
        console.log(`Invalid Date`);
    }

    return message;  
};


let getMessageById = async (id) => {

    let message;

    if(validator.isNumeric(id + '', {no_symbols: true, allow_negatives: false})){

        message = await messageRepository.getMessageById(id);
    } else {
        console.log(`Invalid ID - Message Services`);
    }

    return message;
    
}


let getMessageByStudent = async (id) => {

    let message;

    if(validator.isBoolean(id + '')){

        message = await messageRepository.getMessageByStudent(id);

    } else {
        console.log(`Invalid ID - Message Services`);
    }

    return message;
    
}

let getCheckedMessages = async () => {

    const messages = await messageRepository.getCheckedMessages();
    return messages;

}



let newMessage = async (message) => {

    let newMessage;
    console.log(`this is the new message`, message);

    let validatedMessage = messageValidator.validateMessage(message);

    console.log(`this is te validated message`, validatedMessage);

    if(validatedMessage != null){

        newMessage = await messageRepository.createNewMessage(validatedMessage);
    } else {
        console.log(`Message coudln't be validated!!`)
    }

    return newMessage;
}


let messageRead = async (read) => {

    let readMessage = await messageRepository.messageRead(read);
    return readMessage;

}



let updateMessage = async (message) => {

    let updatedMessage;

    let validatedMessage = messageValidator.validateMessage(message);

    if(validatedMessage != null){

        updatedMessage = await messageRepository.updateMessage(validatedMessage);

    } else {
        console.log(`Message coudln't be validated!!`)
    }

    return updatedMessage;
}



let deleteMessage = async (id) => {

    let deleteMessage;

    if(validator.isNumeric(id + '', {no_symbols: true, allow_negatives: false})){

        deleteMessage = await messageRepository.deleteMessage(id);
    }else {
        console.log(`This is not a valid ID`);
    }

    return deleteMessage;
} 




module.exports = {
    getAllMessages, newMessage, updateMessage, deleteMessage, getMessageBySubject, getMessageByDate, getMessageById, getMessageByStudent, messageRead, getCheckedMessages
}