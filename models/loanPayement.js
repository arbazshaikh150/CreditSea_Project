import { model, Schema } from "mongoose";

const paymentSchema = new Schema({
    username : {
        type : 'String',
        lowercase : true,
        trim : true,
        required : true
    },
    loan_id : {
        type : 'String' ,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },

    // Adding the features that on getting the update from the 
    // Payment website then we have to store it into our database
    user_id : {
        type : 'String' , 
    },

    total_amount_received : {
        type : Number
    }

} , {
    // By default hote rhe
    timestamps : true
});

const Payment = model("Payment" , paymentSchema);

export default Payment;