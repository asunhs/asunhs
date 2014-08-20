var mongoose = require('mongoose');
var Digest = mongoose.model('Digest');
var _ = require('underscore');
var async = require('async');



module.exports.find = function (conditions, cb) {
    
    return Digest.find({ removedTimestamp : null }, function (err, digests) {
        if (!!err) {
            return cb(err, null);
        }
        
        return cb(null, digests);
    });
    
};


module.exports.findByIds = function (ids, cb) {
    return Digest.find({ '_id': { $in: ids }}, function(err, digests) {
        if (!!err) {
            return cb(err, null);
        }
        
        return cb(null, digests);
    });
};



module.exports.save = function (digests, callback) {
    
    var results = [];
    
    async.each(digests, function (digest, cb) {
        
        if (!digest._id) {
            // Do create
            digest.createdTimestamp = Date.now();
            
            return new Digest(digest).save(function (err, result) {
                results.push(result);
                cb();
            });
        } else {
            // Do update
            digest.modifiedTimestamp = Date.now();
            
            return Digest.update({ '_id' : digest._id }, digest, function (err, result) {
                results.push(result);
                cb();
            });
        }
        
    }, function (err) {
        callback(err, results);
    });
    
};


module.exports.remove = function (digests, callback) {
    
    var results = [];
    
    async.each(digests, function (digest, cb) {
        
        if (!!digest._id) {
            // Do remove
            digest.removedTimestamp = Date.now();
            
            return Digest.update({ '_id' : receipt._id }, digest, function (err, result) {
                results.push(digest);
                cb();
            });
        }
        
    }, function (err) {
        callback(err, results);
    });
    
};