'use strict';

module.exports = function(Transaction) {
    Transaction.remoteMethod(
        'getNameLike',
        {
            description:'get name like',
            accepts:[
                {
                    arg:'name', type:'string'
                }
            ],
            returns:{
                arg:'res', type:'object', root:true
            },
            http:{
                path:'/getNameLike', verb:'get'
            }
        }
    );
    Transaction.getNameLike = function(customer_name, callback){
        new Promise(function(resolve, reject){
            //filter
            var filter = {
                where:{
                    customer_name:{
                        like: customer_name
                    }
                }
            }

            //querying filter
            Transaction.find(filter, function(err, result){
                if(err) reject(err)
                if(result === null){
                    err = new Error("Transaksi tidak ditemukan")
                    err.statusCode = 404
                    reject(err)
                }
                resolve(result)
            })
        }).then(function(res){
            if (!res) callback (err)
            return callback (null, res)
        }).catch(function(err){
            callback(err);
        });
    }




    Transaction.remoteMethod(
        'searchById',
        {
            description:'search by id',
            accepts:[
                {
                    arg:'id', type:'string'
                }
            ],
            returns:{
                arg:'res', type:'object', root:true
            },
            http:{
                path:'/searchById', verb:'get'
            }
        }
    );
    Transaction.searchById = function(id, callback){
        new Promise(function(resolve, reject){
            //querying filter
            Transaction.findById(id, function(err, result){
                if(err) reject(err)
                if(result === null){
                    err = new Error("nama tidak ditemukan")
                    err.statusCode = 404
                    reject(err)
                }
                resolve(result)
            });
        }).then(function(res){
            if (!res) callback (err)
            return callback (null, res)
        }).catch(function(err){
            callback(err);
        });
    }




    Transaction.remoteMethod(
        'searchByCategory',
        {
            description:'search by category',
            accepts:[
                {
                    arg:'category', type:'string'
                }
            ],
            returns:{
                arg:'res', type:'object', root:true
            },
            http:{
                path:'/searchByCategory', verb:'get'
            }
        }
    );
    Transaction.searchByCategory = function(category, callback){
        new Promise(function(resolve, reject){
            var filter = {
                where:{
                    category:{
                        like: category
                    }
                }
            }

            //querying filter
            Transaction.find(filter, function(err, result){
                if(err) reject(err)
                if(result === null){
                    err = new Error("transaksi tidak ditemukan")
                    err.statusCode = 404
                    reject(err)
                }
                resolve(result)
            });
        }).then(function(res){
            if (!res) callback (err)
            return callback (null, res)
        }).catch(function(err){
            callback(err);
        });
    }
};
