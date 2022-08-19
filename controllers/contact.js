const Contact = require("../model/contact");

exports.createContact = async (req, res, next) => {
  try {
    const first_name=req.body.first_name;
    const last_name=req.body.last_name;
    const email=req.body.email;
    const mobile_number=req.body.mobile_number;
    if(mobile_number.length ==10){

      const contact= await new Contact({
        first_name:first_name,
        last_name:last_name,
        email:email,
        mobile_number:mobile_number
      }).save();
      res.json({
        message:" Your Contact",
        contact:contact
      });
    }
    else {
      throw new Error("Mobile number is incorrect.");
    }
    
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

exports.getContact = async (req, res, next) => {
  try {
    const users = await Contact.find();
    res.json({
      message:"Fetched all contacts.",
      contact:users
    });
    
  } catch (error) {
    res.json({
      message:error
    })
  }
};

exports.updateContact = async (req, res, next) => {
  try {
  const Contact_id = req.query.Contact_id;
  const new_email= req.body.email;
  const new_mobile_number= req.body.mobile_number;
  
  if(new_mobile_number.length ==10){

    const updatedContact=await Contact.findByIdAndUpdate(Contact_id,{
      email:new_email,
      mobile_number:new_mobile_number
    });
    if(updatedContact== null){
      throw new Error("Invalid contact.")
    }
    const updatedUser= await Contact.findById(Contact_id);
      res.json(
          { message: "Contact is  updated!",
           result: updatedUser 
        });
  }
  else {
    throw new Error("Mobile number is incorrect.");
  }
  
  } catch (error) {
    res.json({
        message:error.message
    })
  }
  
};

exports.deleteContact = async (req, res, next) => {
  try {
    const Contact_id = req.query.Contact_id;
  
       const deletedContact= await Contact.findByIdAndDelete(Contact_id);
          res.json({
            message: "Contact is deleted",
          })
    
  } catch (error) {
    res.json({
      message:error.message
    })
  }
    
};


