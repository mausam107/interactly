const Contact = require("../model/contact");
const { fetchToCurl } = require("fetch-to-curl")

exports.createContact = async (req, res, next) => {
  try {
    const data_store = req.query.data_store;
    console.log(data_store)
    if (data_store === 'DATABASE') {
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const email = req.body.email;
      const mobile_number = req.body.mobile_number;
      const contact = await new Contact({
        first_name: first_name,
        last_name: last_name,
        email: email,
        mobile_number: mobile_number
      }).save();
      res.json({
        message: " Your Contact",
        contact: contact
      });
    } else if (data_store === 'CRM') {
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const email = req.body.email;
      const mobile_number = req.body.mobile_number;
      console.log(fetchToCurl({
        url: "https://domain.myfreshworks.com/crm/sales/api/contacts",
        headers: {
          Authorization: "Token token=XHK8c3v9xSL1tXH4hRY44g"
        },
        method: 'post',
        data: [JSON.stringify({ "contact": { "first_name": first_name, "last_name": last_name, "mobile_number": mobile_number, "email": email } })]
      }));
      res.json({ message: "Contact saved" })
    }

  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

exports.getContact = async (req, res, next) => {
  try {
    const data_store = req.query.data_store;
    if (data_store === 'DATABASE') {
      const contact_id = req.body.contact_id;
      const users = await Contact.find({ _id: contact_id });
      res.json({
        message: "Your details",
        contact: users
      });
    } else if (data_store === 'CRM') {
      const contact_id = req.body.contact_id;
      console.log(fetchToCurl({
        url: "https://domain.myfreshworks.com/crm/sales/api/contacts",
        headers: {
          Authorization: "Token token=XHK8c3v9xSL1tXH4hRY44g"
        },
        method: 'post',
        data: [JSON.stringify({ "contact": { "ID": contact_id } })]
      }));
      res.json({ message: "contact fetched" })
    }
  } catch (error) {
    res.json({
      message: error
    })
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const data_store = req.query.data_store;
    if (data_store === 'DATABASE') {
      const contact_id = req.body.contact_id;
      const new_email = req.body.email;
      const new_mobile_number = req.body.mobile_number;

      const updatedContact = await Contact.findByIdAndUpdate(contact_id, {
        email: new_email,
        mobile_number: new_mobile_number
      });
      if (updatedContact == null) {
        throw new Error("Invalid contact.")
      }
      const updatedUser = await Contact.findById(contact_id);
      res.json(
        {
          message: "Contact is  updated!",
          result: updatedUser
        });
    } else if (data_store === 'CRM') {
      const contact_id = req.body.Contact_id;
      const new_email = req.body.email;
      const new_mobile_number = req.body.mobile_number;
      console.log(fetchToCurl({
        url: "https://domain.myfreshworks.com/crm/sales/api/contacts",
        headers: {
          Authorization: "Token token=XHK8c3v9xSL1tXH4hRY44g"
        },
        method: 'post',
        data: [JSON.stringify({ "contact": { "ID": contact_id, "mobile_number": new_mobile_number, "email": new_email } })]
      }));
      res.json({ message: "contact updated" })
    }
  } catch (error) {
    res.json({
      message: error.message
    })
  }

};

exports.deleteContact = async (req, res, next) => {
  try {
    const data_store = req.query.data_store;
    if (data_store === 'DATABASE') {
      const contact_id = req.body.contact_id;

      const deletedContact = await Contact.findByIdAndDelete(contact_id);
      res.json({
        message: "Contact is deleted",
        Data: deletedContact
      })
    } else if (data_store === 'CRM') {
      const contact_id = req.body.contact_id;
      console.log(fetchToCurl({
        url: "https://domain.myfreshworks.com/crm/sales/api/contacts",
        headers: {
          Authorization: "Token token=XHK8c3v9xSL1tXH4hRY44g"
        },
        method: 'post',
        data: [JSON.stringify({ "contact": { "ID": contact_id } })]
      }));
      res.json({ message: "contact deleted" })
    }
  } catch (error) {
    res.json({
      message: error.message
    })
  }

};


