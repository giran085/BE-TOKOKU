const db = require('./../database/mysql')

const onBayarClick = (req,res) => {
    const data = req.body

    if(data.dataTransaction && data.dataTransactionDetail){
        db.query('insert into transaction set ?' , data.dataTransaction,(err,result) => {
            if(err) throw err
            const dataTransDetailArr = data.dataTransactionDetail.map((val) => {
                return [ val.product_name, val.product_price,val.qty, result.insertId ]
            })

            db.query('INSERT INTO transaction_detail (product_name, product_price, qty,transaction_id) VALUES ?', 
            [dataTransDetailArr], (err,result) => {
                if(err) throw err
                db.query('delete from cart where id_users = ?',data.dataTransaction.users_id,(err,result) => {
                    if(err) throw err
                    res.json({
                        error : false,
                        message : "Checkout Berhasil"
                    })
                })
            })

        })
    }

    // insert ke transaction
    // insert ke transaction detail
    // hapus data di cart
   
}

module.exports = {
    onBayarClick
}
