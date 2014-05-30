var db = require('../config/mongo_database.js');

exports.getLists = function(req, res) {
	var query = db.listModel.find();

	query.select('-__v');
	query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}
  		console.log(results);
  		return res.json(200, results);
	});
};

exports.getList = function(req, res){
	var query = db.listModel.find(req.params.id);
	query.select('-__v)');

	query.exec(function(err, results){
		if (err){
			console.log(err);
			return res.send(400);
		}

		console.log(results);
		return res.json(200, results);
	});
}


exports.create = function(req, res) {
	var list = req.body;

	if (list == null || list.title == null) {
		return res.send(400);
	}

	var listEntry = new db.listModel();
	listEntry.title = list.title;

	listEntry.save(function(err){
		if (err) {
			console.log(err);
			return res.send(400);
		}

		return res.json(listEntry, 200);
	});
}

exports.update = function(req, res) {
	var list = req.body;

	if (list == null || list._id == null) {
		res.send(400);
	}

	var updateList = {};

	if (list.title != null && list.title != "") {
		updateList.title = list.title;
	} 

	updateList.updated = new Date();

	db.listModel.update({_id: list._id}, updateList, function(err, nbRows, raw) {
		if (err){
			console.log(err);
			return res.send(400);
		}

		return res.send(200);
	});
};

exports.delete = function(req, res) {
	var id = req.params.id;

	if (id == null || id == '') {
		res.send(400);
	} 

	var query = db.listModel.findOne({_id:id});

	query.exec(function(err, result) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		if (result != null) {
			result.remove();
			return res.send(200);
		}
		else {
			return res.send(400);
		}
		
	});
};


exports.addItem = function(req, res){
	var listId = req.params.id;
	var item = req.body;
	console.log(item);
	
	if (item == null || item.itemName == "" || item.qty <= 0)
		return res.send(400);

	db.listModel.update({_id: listId}, { $push : { "items" : item}}, function(err, numAffected, rawResponse){
				if (err){
					console.log(err);
					res.send(400);
				}

				console.log(numAffected + " row(s) affected");
				console.log(rawResponse);
				console.log(item);
				res.json(item._id);
	});
};

exports.deleteItem = function(req, res){
	var listId = req.params.id;
	var itemId = req.params.itemId;

	if (listId == null || listId == "" || itemId == null || itemId == ""){
		res.send(400);
	}

	db.listModel.update({ '_id': listId }, { $pull: { "items" : { _id : itemId }}},
		function(err, nbRows, raw){
			if (err){
				console.log(err);
				return res.send(400);
			}
			return res.send(200);
		});
	
};

exports.updateItem = function(req, res){
	var listId = req.params.id;
	var itemId = req.params.itemId;
	var item = req.body;
	console.log(listId);
	console.log(itemId);
	console.log(item);

	if (item == null || item.itemName == "" || listId == null
		|| listId == "" || itemId == "" || itemId == null)
		return res.send(400);

	db.listModel.update({_id: listId, "items._id": itemId}, {$set : {
		'items.$.itemName' : item.itemName,
		'items.$.updated' : new Date()
	}}, function(err, nbRows, raw) {
		if (err){
			console.log(err);
			return res.send(400);
		}

		return res.send(200);
	});
};

exports.changeQty = function(req, res){
	var listId = req.params.id;
	var item = req.body;
	console.log(listId);
	console.log(item);

	if (item == null || listId == null || listId == ""
		|| item._id == "" || item._id == null
		|| item.qty == null){
		console.log('failed sanity check');
		return res.send(400);
	}

	if (item.qty == 0){
		console.log('deleting item ' + item._id);
		db.listModel.update({ '_id': listId }, { $pull: { "items" : { _id : item._id }}},
			function(err, nbRows, raw){
				if (err){
					console.log(err);
					return res.send(400);
				}
				return res.send(200);
			});
	}
	else {
		db.listModel.update({_id: listId, 'items._id': item._id }, {$set : {
			'items.$.qty' : item.qty,
			'items.$.updated' : new Date()
		}}, function(err, nbRows, raw) {
			if (err || nbRows == 0){
				console.log(err);
				return res.send(400);
			}
			console.log('updated item');
			console.log(nbRows);
			console.log(raw);
			return res.send(200);
		});
	}
};