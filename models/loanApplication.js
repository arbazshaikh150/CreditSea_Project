import { Schema } from "mongoose";

// Schema for the user
const loanSchema = new Schema({
    username : {
        type : 'String' , 
        lowercase : true,
        required : true
    },
    amount : {
        type : Number ,
        required : true
    },
    Tenure : {
        // Duration in which it should be paid
        type : 'String',
        required : true
    },
    employement_status : {
        type : Boolean ,
        required : true
    },
    reason : {
        type : 'String' ,
        lowercase : true,
        required : true
    },
    employement_address : {
        type : 'String' ,
        lowercase : true,
        required : true
    },

    status : {
        type : 'String',
        // This is for the user 
        // Handling for the admin separately
        default : 'Applied'
    },

    loan_user : {
        // Holds the user id of the loan
        type : 'String'
    },
    amount_paid : {
        type : Number
    }
} , {
    // By default hote rhe
    timestamps : true
});
// Model connection
const Loan = model("Loan" , loanSchema);
export default Loan;