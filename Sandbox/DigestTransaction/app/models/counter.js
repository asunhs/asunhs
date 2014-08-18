var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    

var CounterSchema = new Schema({
    _id : String,
    seq : 0
});


mongoose.model('Counter', CounterSchema);