const sequelize = require('./database/connection');
const database = require('./database/connection');

//Es un objeto sequelize = new Sequelize;
/*
sequelize.query("SELECT * FROM details").then( res => {
    console.log(res);
});
*/

const express = require('express');
const body_parser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

let datos = [];


const validateEmailDuplicate = async (req, res, next) => {
    //Como seleccionar los mails que se encuentran dentro de una base de datos????????????????????????
    //console.log(response);
    let email = req.body.email;
    debugger;
    let datos = await sequelize.query(`SELECT * FROM register WHERE email = '${email}'`, { type: sequelize.QueryTypes.SELECT } );
    console.log(datos);
    
   if (datos.length == 0) {
       next();
   } else {
       res.status(400).send({
        msg: 'Usuario se encuentra registrado'
    })
   }
   
}


app.get('/login', async (req, res) => {
    let response = await sequelize.query("SELECT * FROM user", { type: sequelize.QueryTypes.SELECT } );
    res.send(response);
});

app.get('/register', async (req, res) => { 
    let response = await sequelize.query(`SELECT * FROM register`, { type: sequelize.QueryTypes.SELECT } );
    console.log(response)
    res.send(response)    
});

app.post('/register', validateEmailDuplicate, async (req, res) => {    
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let adress = req.body.adress;
    let password = req.body.password;    
    let values = [name, email, phone, adress, password];
    let query = `INSERT INTO register (name_complete, email, phone, adress, password) VALUES (?, ?, ?, ?, ?)`
    let response = await sequelize.query(query, { replacements: values });
    res.send(response);
});



app.get('/productos', async (req, res) => {
    let response = await sequelize.query("SELECT * FROM product", { type: sequelize.QueryTypes.SELECT } );
    res.send(response);
});

app.get('/orders', async (req, res) => {
    let response = await sequelize.query("SELECT * FROM orders", { type: sequelize.QueryTypes.SELECT } );
    res.send(response);
});

app.post('/productos/order', async (req, res) => {
    let state = req.body.state;
    let time = req.body.time;
    let description = req.body.description;
    let price = req.body.price;
    let user = req.body.user;
    let adress = req.body.adress;
    let payment_method = req.body.payment_method;
    let menu_id = req.body.menu_id;
    let values = [state, time, description, price, user, adress, payment_method, menu_id];
    let query = `INSERT INTO orders (state, time, description, price, user, adress, payment_method, menu_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    let response = await sequelize.query(query, { replacements: values });
    res.send(response);
});


/*
app.post('/productos', async (req, res) => {
    let state = req.body.state;
    let time = req.body.time;
    let description = req.body.description;
    let price = req.body.price;
    let user = req.body.user;
    let adress = req.body.adress;
    let payment_method = req.body.payment_method;

    let query = `INSERT INTO orders (state, time, description, price, user, adress, payment_method) VALUES (?)`
    let response = await sequelize.query(query);
    res.send(response);
});
*/


app.put("/", async (req, res) => {
    let name = req.body.name;
    let id = req.body.id;
    let values = [name, id];
    let query = `UPDATE details SET name = ? WHERE id = ?`;
    let response = await sequelize.query(query, {
      type: sequelize.QueryTypes.UPDATE,
      replacements: values,
    });
    res.send(response);
  });

app.delete('/:id', async (req, res) => {
    
    let id = req.params.id;
    let values = [id];
    let query = `DELETE from details WHERE id = ?`
    let response = await sequelize.query(query, {        
        type: sequelize.QueryTypes.DELETE,
        replacements: values,
    });
    res.send(response);
});

/*
app.get('/', (req, res) => {
    sequelize.query("SELECT * FROM details").then( response => {
        res.send(response);
    });    
});
*/


app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
