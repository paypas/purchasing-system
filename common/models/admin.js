'use strict';

module.exports = function(Admin) {
    Admin.remoteMethod(
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
    Admin.getNameLike = function(name, callback){
        new Promise(function(resolve, reject){
            //filter
            var filter = {
                where:{
                    name:{
                        like: name
                    }
                }
            }

            //querying filter
            Admin.find(filter, function(err, result){
                if(err) reject(err)
                if(result === null){
                    err = new Error("nama tidak ditemukan")
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




    Admin.remoteMethod(
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
    Admin.searchById = function(id, callback){
        new Promise(function(resolve, reject){
            //querying filter
            Admin.findById(id, function(err, result){
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
};
