const router = require('express').Router();
const messageService = require('../services/messageService');
// const { authConfig, checkJwt, checkAuth } = require('../middleware/jwtAuth.js');
const { authConfig, checkJwt, checkAuth } = require('../middleware/jwtAuth');


router.get('/', checkJwt, checkAuth([authConfig.update]), async (req, res) => {

    try{
        const result = await messageService.getAllMessages();
        res.json(result);

    }catch(e){
        console.log(e);
        e.status(500);
        res.send(e.message);
    }
});


router.get('/:subject', checkJwt, checkAuth([authConfig.delete]), async (req, res) => {
    console.log(req.params);
    let subject = req.params.subject;

    try{
        const result = await messageService.getMessageBySubject(subject);
        res.json(result);

    }catch(e){
        console.log(e);
        e.status(500);
        res.send(e.message);
    }
})


//GET MESSAGES BY DATE
router.get('/bydate', checkJwt, checkAuth([authConfig.update]), async (req, res) => {

    let date = req.body._date;

    // let date = new Date(Date.now()).toISOString().slice(0,10);
    // console.log(date);

    try{
        const result = await messageService.getMessageByDate(date);
        res.json(result);

    }catch(e){
        console.log(e);
        e.status(500);
        res.send(e.message);
    }
});


router.get('/student/:isStudent', checkJwt, checkAuth([authConfig.update]),  async (req, res) => {
    console.log(req.params.isStudent);
    let id = req.params.isStudent;

    try{
        const result = await messageService.getMessageByStudent(id);
        res.json(result);

    }catch(e){
        console.log(e);
        e.status(500);
        res.send(e.message);
    }
    
})


router.get('/check/readMessages', checkJwt, checkAuth([authConfig.update]), async (req, res) => {
    // console.log(req.body);

    try{
        const result = await messageService.getCheckedMessages();
        // console.log(result);
        res.json(result);

    }catch(e){
        console.log(e);
        e.status(500);
        res.send(e.message);
    }
});


router.get('/byid/:id', checkJwt, checkAuth([authConfig.update]), async (req, res) => {
    console.log(req.params);
    let id = req.params.id;

    try{
        const result = await messageService.getMessageById(id);
        res.json(result);

    }catch(e){
        console.log(e);
        e.status(500);
        res.send(e.message);
    }
    
})


router.post('/new', checkJwt,  async (req, res) => {

    let message = req.body;
    console.log(message);
    try{

        const result = await messageService.newMessage(message);
        res.json(result);
    }catch(e){
        console.log(e);
        e.status(500);
        res.send(e.message);
    }
});

router.post('/read', checkJwt, checkAuth([authConfig.update]), async (req, res) => {

    let checkMessage = req.body;
    console.log('res.body', checkMessage);
    try{

        const result = await messageService.messageRead(checkMessage);
        res.json(result);
    }catch(e){
        console.log(e);
        e.status(500);
        res.send(e.message);
    }
})


router.put('/update', checkJwt, checkAuth([authConfig.update]), async (req, res) => {

    let message = req.body;
    
    try{
        const result = await messageService.updateMessage(message);
        res.json(result);

    }catch(e){
        console.log(e);
        e.status(500);
        res.send(e.message);
    }

});


router.delete('/:id', checkJwt, checkAuth([authConfig.update]), async(req, res) => {

    let messageID = req.params.id;
    console.log(messageID);

    try{
        const result = await messageService.deleteMessage(messageID);
        res.json(result);
    }catch(e){
        console.log(e);
        e.status(500);
        res.send(e.message);
    }

})






module.exports = router;