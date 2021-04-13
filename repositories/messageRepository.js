const {sql, dbConnect} = require('../database/db');


//SQL CODES

const GET_MESSAGES = 'SELECT * FROM message for json path;';

const GET_MESSAGES_BY_SUBJECT = 'SELECT * FROM message WHERE subject = @subject for json path;';

const GET_MESSAGES_BY_STUDENT = 'SELECT * FROM message WHERE student = @isStudent for json path;';

const GET_MESSAGES_BY_DATE = 'SELECT * FROM message WHERE _date = @date for json path;';

const GET_MESSAGE_BY_ID = 'SELECT * FROM message WHERE _id = @id for json path;';

const CREATE_NEW_MESSAGE = 'INSERT INTO message (first_name,last_name,subject,country,email,_date,message,student) VALUES (@fname,@lname,@sub,@country,@email,@date,@message,@student); SELECT * FROM message WHERE _id = SCOPE_IDENTITY();';

const UPDATE_MESSAGE = 'UPDATE message SET first_name = @fname, last_name = @lname, subject = @sub, country = @country, email = @email, _date = @date, message = @message WHERE _id = @id; SELECT * FROM message WHERE _id = @id;';

const DELETE_MESSAGE = 'DELETE FROM message WHERE _id = @id; SELECT * FROM message for json path;';

const MESSAGE_READ = 'IF EXISTS(SELECT * FROM [read] WHERE messageID = @id) BEGIN UPDATE [read] SET messageID = @id, messageRead = @isRead, _date = @date, readBy = @by WHERE messageID = @id END ELSE BEGIN INSERT INTO [read] (messageID, messageRead, _date, readBy) VALUES (@id, @isRead, @date, @by) END;';

const GET_CHECKED_MESSAGES = 'SELECT * FROM [read] for json path;';

//GET ALL MESSAGES
let getMessages = async () => {

    let message;

    try{
        const pool = await dbConnect
        const result = await pool.request()
        .query(GET_MESSAGES)

        message = result.recordset[0];

    }catch(e){
        console.log(`Message Repository Failed to connect to DB ${e.message}`);
    }

    return message;
}


//GET MESSAGES BY SUBJECT


let getMessageBySubject = async (subject) => {

    let message;

    try{
        const pool = await dbConnect
        const result = await pool.request()
        .input('subject', sql.NVarChar, subject)
        .query(GET_MESSAGES_BY_SUBJECT)

        message = result.recordset[0];

    }catch(e){
        console.log(`Message Repository Failed to connect to DB ${e.message}`);
    }

    return message;

}


let getMessageByStudent = async (isStudent) => {

    let message;

    try{
        const pool = await dbConnect
        const result = await pool.request()
        .input('isStudent', sql.NVarChar, isStudent)
        .query(GET_MESSAGES_BY_STUDENT)

        message = result.recordset[0];

    }catch(e){
        console.log(`Message Repository Failed to connect to DB ${e.message}`);
    }

    return message;

}

//GET MESSAGE BY DATE
let getMessageByDate = async (date) => {

    let message;

    try{
        const pool = await dbConnect
        const result = await pool.request()
        .input('date', sql.NVarChar, date)
        .query(GET_MESSAGES_BY_DATE)

        message = result.recordset[0];

    }catch(e){
        console.log(`Message Repository Failed to connect to DB ${e.message}`);
    }

    return message;
};


let getMessageById = async (id) => {

    let message;

    try{
        const pool = await dbConnect
        const result = await pool.request()
        .input('id', sql.Int, id)
        .query(GET_MESSAGE_BY_ID);

        message = result.recordset[0][0];
    }catch(e){
        console.log(`Message Repository Failed to connect to DB ${e.message}`);
    }

    return message;

}

let getCheckedMessages = async () => {

    let message;

    try{
        const pool = await dbConnect
        const result = await pool.request()
        .query(GET_CHECKED_MESSAGES)

        // console.log(result.recordset);

        message = result.recordset[0];

    }catch(e){
        console.log(`Message Repository Failed to connect to DB ${e.message}`);
    }

    return message;

}


//CREATE MESSAGE
let createNewMessage = async(message) => {

    console.log(message);

    let newMessage;
    

    try{
        const pool = await dbConnect
        const result = await pool.request()
        // .input('id', sql.Int, message._id)
        .input('fname', sql.NVarChar, message.first_name)
        .input('lname', sql.NVarChar, message.last_name)
        .input('sub', sql.NVarChar, message.subject)
        .input('country', sql.NVarChar, message.country)
        .input('email', sql.NVarChar, message.email)
        .input('date', sql.Date, message._date)
        .input('message', sql.NVarChar , message.message)
        .input('student', sql.Bit, message.student)
        .query(CREATE_NEW_MESSAGE);

        newMessage = result.recordset[0];

    }catch(e){
        console.log(`Message Repository Failed to connect to DB ${e.message}`);
    }

    return newMessage;
}


let messageRead = async (read) => {
    console.log(read);

    let readMessage;
    

    try{
        const pool = await dbConnect
        const result = await pool.request()
        .input('id', sql.Int, read.messageID)
        .input('isRead', sql.Bit, read.messageRead)
        .input('date', sql.Date, read._date)
        .input('by', sql.NVarChar, read.readBy)
        .query(MESSAGE_READ);

        readMessage = result.rowsAffected[0];

    }catch(e){
        console.log(`Message Repository Failed to connect to DB ${e.message}`);
    }

    return readMessage;


}


//UPDATE MESSAGE
let updateMessage = async (message) => {

    console.log(`this is the message to be updated!`, message);

    let updatedMessage;

    try{
        const pool = await dbConnect
        const result = await pool.request()
        .input('id', sql.Int, message._id)
        .input('fname', sql.NVarChar, message.first_name)
        .input('lname', sql.NVarChar, message.last_name)
        .input('sub', sql.NVarChar, message.subject)
        .input('country', sql.NVarChar, message.country)
        .input('email', sql.NVarChar, message.email)
        .input('date', sql.Date, message._date)
        .input('message', sql.NVarChar , message.message)
        .query(UPDATE_MESSAGE);

        updatedMessage = result.recordset[0];

    }catch(e){
        console.log(`Message Repository Failed to connect to DB ${e.message}`);
    }
    return updatedMessage;
}



let deleteMessage = async (id) => {
    console.log(`repository id:`, id);
    let deletedMessage;

    try{
        const pool = await dbConnect
        const result = await pool.request()
        .input('id', sql.Int, id)
        .query(DELETE_MESSAGE);

        deletedMessage = result.recordset[0];

    }catch(e){
        console.log(`Message Repository Failed to connect to DB ${e.message}`);
    }
    return deletedMessage;


}



module.exports = {

    getMessages, createNewMessage, updateMessage, deleteMessage, getMessageBySubject, getMessageByDate, getMessageById, getMessageByStudent, messageRead, getCheckedMessages
}