
appServices.factory('listService', function($http) {
    return {
        findAllLists: function() {
            return $http.get(options.api.base_url + '/lists');
        },

        addItem: function(listId, item){
            return $http.post(options.api.base_url + '/lists/' + listId + '/items', item);
        },

        updateQty: function(listId, item){
            return $http.post(options.api.base_url + '/lists/' + listId + '/items/' + item._id +'/updateqty', item);
        },

        createList: function(list){
            return $http.post(options.api.base_url + '/lists', list);
        },

        deleteList: function(listId){
            return $http.post(options.api.base_url + '/lists/' + listId + '/delete');
        },

        updateList: function(listId, list){
            return $http.post(options.api.base_url + '/lists/' + listId, list);
        },

        updateItem: function(listId, itemId, item){
            return $http.post(options.api.base_url + '/lists/' + listId + '/items/' + itemId + '/update', item);
        },

        deleteItem: function(listId, itemId){
            return $http.post(options.api.base_url + '/lists/' + listId + '/items/' + itemId + '/delete');
        },

        gotItem: function(listId, itemId){
            return $http.post(options.api.base_url + '/lists/' + listId + '/items/' + itemId + '/got');
        }

        // findByTag: function(tag) {
        //     return $http.get(options.api.base_url + '/tag/' + tag);
        // },

        // read: function(id) {
        //     return $http.get(options.api.base_url + '/post/' + id);
        // },
        
        // findAll: function() {
        //     return $http.get(options.api.base_url + '/post/all');
        // },

        // changePublishState: function(id, newPublishState) {
        //     return $http.put(options.api.base_url + '/post', {'post': {_id: id, is_published: newPublishState}});
        // },

        // delete: function(id) {
        //     return $http.delete(options.api.base_url + '/post/' + id);
        // },

        // create: function(post) {
        //     return $http.post(options.api.base_url + '/post', {'post': post});
        // },

        // update: function(post) {
        //     return $http.put(options.api.base_url + '/post', {'post': post});
        // },

        // like: function(id) {
        //     return $http.post(options.api.base_url  + '/post/like', {'id': id});
        // },

        // unlike: function(id) {
        //     return $http.post(options.api.base_url  + '/post/unlike', {'id': id}); 
        // }
    };
});
