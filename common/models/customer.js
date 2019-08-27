'use strict';

module.exports = function(Customer) {
    Customer.remoteMethod(
        'getNameLike',
        {
            description:'get name like',
            accepts:[
                {
                    arg:'firstname', type:'string'
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
    Customer.getNameLike = function(firstname, callback){
        new Promise(function(resolve, reject){
            //filter
            var filter = {
                where:{
                    firstname:{
                        like: firstname
                    }
                }
            }

            //querying filter
            Customer.find(filter, function(err, result){
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
};
