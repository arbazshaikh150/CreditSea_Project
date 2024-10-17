import Loan from "../models/loanApplication.js";
import User from "../models/userModel.js";


const loanApplied = async (req , res , next) => {
    const {username , amount , Tenure , employement_status , reason , employement_address} = req.body;

    // Stored in the middleware , request body
    const {id} = req.user;
    // Amount Borrowed will increase when loan is approved

    if(!username || !amount || !Tenure || !employement_status || !reason || !employement_address){
        return res.status(400).json({
            success : false ,
            message : 'Provide all the information'
        })
    }

    try{


        const loan = await Loan.create({
            username ,
            amount , 
            Tenure , 
            employement_status , 
            reason , 
            employement_address,
            status : 'Applied' , 
            // Adding this at admin side
            // loan_user : id,
            // amount_paid : 0,
        });

        const user = await User.findById({id});

        if(!loan || !user){
            return res.status(400).json({
                success : false ,
                message : 'Error occured in creation of the loan/user'
            })
        }
        // Ham jab admin ke side se isse approved karenge tab
        // Ham isse update kar denge
        /*
        // // Increasing the balance of the user
        // user.total_balance += amount;
        // let totalLoan = user.total_loan;
        // // Id of the current loan
        // totalLoan.push(loan._id);
        // user.total_loan = totalLoan;
        */
        await user.save();
        await loan.save();
        return res.status(200).json({
            success : true ,
            message : 'Loan Created Successfully'
        })

    }
    catch(e){
        return res.status(400).json({
            success : false ,
            message : 'Some Error Occured',
            data : e.message
        })
    }
}

const loanPayed = async (req , res , next) => {
    const {username , loan_id , amount  } = req.body;
    const {id} = req.user;
    if(!id || !username || !amount || !loan_id){
        return res.status(400).json({
            success : false,
            message : 'Provide all the entries',
        })
    }

    // Updating all the entries
    try{
        const loan = await Loan.findById({loan_id});
        const user = await User.findById({id});

        if(!loan || !user){
            return res.status(400).json({
                success : false,
                message : 'User / Loan not fetched Properly',
            })
        }

        // Updating the loans
        if(loan.status === 'Paid'){
            return res.status(400).json({
                success : false,
                message : 'All dues are already Paid'
            })
        }

        const paid = loan.amount_paid;
        paid = paid - amount;
        // Means hamne sab pay kar diya hai
        if(paid === 0){
            loan.status = 'Paid'
            const newList = user.total_loan.filter((e) => e != loan_id);
            user.total_loan = newList;
        }
        loan.amount_paid = paid;

        user.total_amount_paid += paid;
        user.total_balance -= paid;

        await user.save();
        await loan.save();

        return res.status(200).json({
            success : true,
            message : 'Loan Payment Successful',
        })
    }
    catch(e){
        return res.status(400).json({
            success : false,
            message : 'Error Occured',
            data : e.message
        })
    }

}

export {loanApplied , loanPayed}