const express=require('express');

const contactController=require('../controllers/contact');

const router=express.Router();

router.post('/create',contactController.createContact);

router.get('/get',contactController.getContact);

router.post('/update',contactController.updateContact);

router.delete('/delete',contactController.deleteContact);

module.exports=router;