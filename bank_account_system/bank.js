class BankAccount {

    constructor(accountNo, accountHolder, balance) {
        this._accountNo = accountNo;
        this._accountHolder = accountHolder;
        this._balance = balance;
    }

    //function to deposit amount
    deposit(amount){
        this._balance += amount;
        console.log(`Rs.${amount} deposited successfully!!`);
    }

    //function to withdraw money
    withdraw(amount) {
        if (amount <= this._balance) {
            this._balance -= amount;
            console.log("Withdrawal successfull!!");
        } else {
            console.log("Insufficient Balance");
        }
    }

    displayBalance() {
        console.log(`Account Balance: ${this._balance}`);
    }
}

//inheriting SavingAccount from the BankAccount class
class SavingAccount extends BankAccount {

    constructor(accountNo, accountHolder, balancee) {
        super(accountNo, accountHolder, balancee);
    }

    addInterest() {
        //assuming 10% interest rate
        const interest = this._balance * 0.10;
        this._balance += interest;
        console.log(`Interest of 10% applied.`);
    }

    //overriding withdraw method
    withdraw(amount) {
        if (amount <= this._balance) {
            //let withdrawal limit be 1000 if exceeded panelty of 10 ruppees applied 
            if (amount > 1000) {
                this._balance -= (amount + 10);
                console.log("Withdrawal exceeds limit, penalty applied of 10 ruppees!!");
                console.log(`Rs.${amount+10} withdrawn from the account!!`);
            }
            else {
                this._balance -= amount;
                console.log(`Rs.${amount} Rs withdrawn from the account!!`);
            }
            
        } else {
            console.log("Insufficient balance");
        }
    }
}

//creating instance of the SavingAccount class
const a = new SavingAccount("9675", "Vanshika", 10000);

//using all the functions 
a.displayBalance();

a.deposit(500);
a.displayBalance();

a.withdraw(500);
a.displayBalance();

a.addInterest();
a.displayBalance();

a.withdraw(1500);
a.displayBalance();
