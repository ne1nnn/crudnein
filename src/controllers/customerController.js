const controller = {};


controller.list = (req, res) => {
    
    req.getConnection((err,conn) => {
         conn.query('SELECT * FROM customer', (err, customers ) => {
            if(err) {
              res.json(err);
            } 
            
            res.render('customers', {
                data: customers
           });
         })
    });
  };

// Aqui estoy guardando la query 

controller.save = (req, res) => {
  const data = req.body;

  req.getConnection((req, conn) => {
    conn.query('INSERT INTO customer set ?', [data], (err, customer) => {
        res.redirect('/');
    })
  })
};     

// Editando

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err,conn) => {
    conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, customer) =>{
      res.render('customer_edit', {
        data: customer[0]
      })
    })
  })
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  req.getConnection((err,conn) => {
    conn.query('UPDATE customer set ? WHERE id = ?', [newCustomer, id], (err, rows) => {
      res.redirect('/');
    });
  });

};

// Aqui estoy eliminando

controller.delete = (req, res) => {
  const { id } = req.params;

 req.getConnection ((err,conn) => {
  conn.query('DELETE FROM customer WHERE id = ?',[id], (err, rows) => {
    res.redirect('/');
  })
 })
};


module.exports = controller;