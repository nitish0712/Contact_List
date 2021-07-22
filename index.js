const { name } = require('ejs');
const express = require('express');
const path = require('path');
const port = 8000;

const db=require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


// // middleware 1
// app.use(function(req, res, next){
//     console.log("middleware 1 called");
//     next();
// });

// // middlewar 2
// app.use(function(req, res, next){
//     console.log("middleware 2 called");
//     next();
// });


var contactList = [
    {
        name: "Nitish" ,
        phone: "1111111111"
    },
    {
        name: "Kavish" ,
        phone: "1111111100"
    },
    {
        name: "Vanya" ,
        phone: "1111110000"
    }
]


app.get('/',function(req,res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }

        return res.render('home',{
            title: "Contacts List",
            contacts_List: contacts
        });
    });
    
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "Let us play with ejs"
    });
});

app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    //contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('error in creating a contact'); return;}

        console.log('**********', newContact);
        return res.redirect('back');
    });

    // return res.redirect('/');
    //return res.redirect('back'); 
});

// for deleting the contact
app.get('/delete-contact/', function(req,res){
    // console.log(req.params); '/delete-contact/params'
    // let phone=req.params.phone;  OR
    // console.log(req.query);
    //let phone=req.query.phone;
    let id =req.query.id;

    // find the contact in database using id and delete it
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });

    // let contactIndex=contactList.findIndex(contact => contact.phone==phone);
    
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }

    // return res.redirect('back');
        
});


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }

    console.log('Yup! My Expree Server is running on port:', port);
});