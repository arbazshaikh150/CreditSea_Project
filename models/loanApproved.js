// For the admin only

import { model, Schema } from "mongoose";

const loanPendingSchema = new Schema({
    loan_id : {
        type : 'String',
    },
    user_id : {
        type : 'String'
    },
    loan_status : {
        type : 'String',
        default : 'Pending'
    }
    
} , {
    timestamps : true,
});

const TotalLoansTaken = model("loanTaken" , loanPendingSchema);

export default TotalLoansTaken;