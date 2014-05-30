var mongoose = require('mongoose');
var mongodbURL = 'mongodb://localhost/grocerylist';
var mongodbOptions = { };
mongoose.set('debug', true);

mongoose.connect(mongodbURL, mongodbOptions, function (err, res) {
    if (err) { 
        console.log('Connection refused to ' + mongodbURL);
        console.log(err);
    } else {
        console.log('Connection successful to: ' + mongodbURL);
    }
});

var Schema = mongoose.Schema;

var List = new Schema({
    title: { type: String, required: true },
    items: [{
        itemName: { type: String, required: true },
        qty: { type: Number, default: 1},
        got: { type: Boolean, default: false },
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now }
    }]
});

var listModel = mongoose.model('List', List);

// Export Models
exports.listModel = listModel;