function Message(id,fname,lname,subject,country,email,date,message,student){
    this._id = id;
    this.first_name = fname;
    this.last_name = lname;
    this.subject = subject;
    this.country = country;
    this.email = email;
    this._date = date;
    this.message = message;
    this.student = student;
}


module.exports = Message;