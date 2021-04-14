const validator = require('validator');
// const messageService = require('../services/messageService');
const Message = require('../models/Message');


let validateMessage = (message) => {

    let validatedmessage;
    console.log(message);
    
    let messageId = 0;

    let date = new Date(Date.now()).toISOString().slice(0,10);
    
    if(message.hasOwnProperty('_id')){
        messageId = message._id;
    }


    if(message){
        if( validator.isNumeric(messageId + '' ,{no_symbol: true, allow_negative: false}) &&    
            validator.isAscii(message.first_name + '') &&
            validator.isAscii(message.last_name + '') &&
            !validator.isEmpty(message.subject) &&
            !validator.isEmpty(message.country) &&
            validator.isEmail(message.email) && 
            validator.isDate(date) && 
            !validator.isEmpty(message.message)
        ){

            validatedmessage = new Message(
                messageId,
                validator.escape(message.first_name),
                validator.escape(message.last_name),
                message.subject,
                message.country,
                message.email,
                date,
                validator.escape(message.message),
                message.student
                )

        } 

    }else {
        console.log('Validator Failed! No valid object!');
    }
    console.log(`this is the validatedMessage`, validatedmessage);
    return validatedmessage;
}




module.exports = {
    validateMessage
}