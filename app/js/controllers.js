appControllers.controller('listController', ['$scope', 'listService',
    function listController($scope, listService) {
        $scope.lists = [];

        $scope.createList = function(listName){
            listService.createList({'title': listName}).success(function(data){
                $scope.lists.push(data);
                $scope.newlist = '';
            }).error(function(data, status){
                console.log(status);
                console.log(data);
            });
        };

        $scope.updateList = function(listId, listName){
            listService.updateList(listId, {'_id': listId, 'title': listName}).success(function(data){
                console.log('done it');
            }).error(function(data, status){
                console.log(status);
                console.log(data); 
            });
        };

        $scope.deleteList = function(listId){
            console.log(listId);
            listService.deleteList(listId).success(function(data){
                _.each($scope.lists, function(list, i){
                    if (list._id == listId){
                        console.log(list);
                        $scope.lists.splice(i, 1);
                    }
                });
            }).error(function(data, status){
                console.log(status);
                console.log(data); 
            });
        }

        $scope.updateItem = function(listId, item, itemName){
            listService.updateItem(listId, item._id, {'itemName': itemName}).success(function(data){
                console.log('done it');
            }).error(function(data, status){
                console.log(status);
                console.log(data); 
            });
        };

        $scope.gotItem = function(listId, itemId){
            listService.gotItem(listId, itemId).success(function(data){
                console.log(data);
                _.each($scope.lists, function(list, i){
                    if (list._id == listId){
                        _.each(list.items, function(item, j){
                            if (item._id == itemId){
                                item.got = !item.got;
                            }
                        });
                    }
                });
            }).error(function(data, status){
                console.log(status);
                console.log(data); 
            });
        };

        $scope.deleteItem = function(listId, item){
            if (confirm('Are you sure you want to delete this item?')){
                listService.deleteItem(listId, item._id).success(function(data){
                    _.each($scope.lists, function(list, i){
                        if (list._id == listId){
                            _.each($scope.lists[i].items, function(olditem, j){
                                if (olditem._id == item._id){
                                    $scope.lists[i].items.splice(j, 1);
                                }
                            });
                        }
                    });
                });
            }
        }

        $scope.addItem = function(listId){
            for(var i=0; i<$scope.lists.length; i++){
                if ($scope.lists[i]._id == listId){
                    var list = $scope.lists[i];
                    var item = { 'itemName': list.itemtext, 'qty': 1};

                    listService.addItem(listId, item).success(function(data){
                        list.itemtext = '';
                        console.log(data);
                        item._id = data;
                        console.log(item);
                        list.items.push(item);
                    }).error(function(data, status){
                        console.log(status);
                        console.log(data);
                    });
                }
            }
        };

        $scope.changeQty = function(listId, itemId, qty){
            console.log(listId + ' : ' + itemId + ' : ' + qty);

            var updatedItem = { '_id': itemId, 'qty': qty };
            var sure = true;

            if (qty == 0){
                sure = confirm('This will remove this item! Are you sure?!?');
            }

            if (sure){
                listService.updateQty(listId, updatedItem).success(function(data){
                    console.log('saved!');
                }).error(function(data, status){
                    console.log(status);
                    console.log(data);
                });
            }

            if (sure && qty == 0){
                _.each($scope.lists, function(val, i){
                    if (val._id == listId){
                        _.each($scope.lists[i].items, function(item, j){
                            if (item._id == itemId){
                                $scope.lists[i].items.splice(j, 1);
                            }
                        });
                    }
                });
            }

        };

        listService.findAllLists().success(function(data) {
            $scope.lists = data;
            console.log(data);
        }).error(function(data, status) {
            console.log(status);
            console.log(data);
        });
    }
]);

