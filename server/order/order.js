var dbController = require('../dbController');
module.exports = {
    index: function(req, res) {
        var userView  = "../www/views/query/order/order";
        res.render(userView);
    },
    result: function(req, res) {
        var OrderCount = req.body.OrderCount;
        var OrderSex = req.body.OrderSex;
        var connectionQuery = "SELECT DISTINCT							"+
            "  orders.*                                                 "+
            "FROM                                                       "+
            "  orders                                                   "+
            "  INNER JOIN users                                         "+
            "  ON users.`ПІБ покупця` = orders.`ПІБ покупця, що замовив`"+
            "  INNER JOIN products                                      "+
            "  ON products.`назва товару` = orders.`замовлений товар`   "+
            "WHERE                                                      "+
            "  users.`стать покупця` = '" + OrderSex + "'" +
            "  AND products.`кількість проданих одиниць товару` > '" + OrderCount + "'";

        dbController.dbQuery(connectionQuery, function (data) {
            res.json(data);
            console.log(data);
        });
    },
    count: function(req, res) {
        var connectionQuery = "SELECT DISTINCT				"+
            "  `кількість проданих одиниць товару`          "+
            "FROM                                           "+
            "  products                                     "+
            "WHERE                                          "+
            "  `кількість проданих одиниць товару` <> '0'   "+
            "  AND `кількість проданих одиниць товару` <>   "+
            "'кількість проданих одиниць товару'            ";
        dbController.dbQuery(connectionQuery, function (data) {
            res.json(data);
        });
    },
    sex: function(req, res) {
        var connectionQuery = 'SELECT DISTINCT `стать покупця` FROM users';
        dbController.dbQuery(connectionQuery, function (data) {
            res.json(data);
        });
    }

};