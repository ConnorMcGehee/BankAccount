class BankAccount {
    constructor(accountNumber, owner) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.transactions = [];
    }

    balance() {
        let sum = 0;
        for (let trns of this.transactions) {
            sum += trns.amount;
        }
        return sum;
    }

    deposit(amt) {
        let trns = new Transaction(this.owner, amt);
        if (amt > 0) {
            this.transactions.push(trns);
            console.log(this.owner + " New balance: ", this.balance());
        }
        else {
            console.log("Deposit amount must be greater than $0.")
        }
    }

    charge(payee, amount) {
        let trns = new Transaction(payee, 0 - amount)
        this.transactions.push(trns);
        if (this.balance() < 0) {
            this.transactions.pop();
            console.log("Cannot complete transaction. Balance too low.")
            return;
        }
        console.log(this.owner + " New balance: ", this.balance());
        payee.deposit(amount);
    }
}

class Transaction {
    constructor(payee, amount) {
        this.amount = amount;
        this.payee = payee;
        this.date = Date.now();
    }
}

class SavingsAccount extends BankAccount {
    constructor(accountNumber, owner, interestRate){
        super(accountNumber, owner);
        this.interestRate = interestRate; // In percentage
      }

      accrueInterest() {
        this.deposit(this.balance() * (this.interestRate / 100));
      }
}

//Tests

let myAccount = new BankAccount(123, "Connor");
let jayAccount = new BankAccount(234, "Jay");
let noeAccount = new BankAccount(345, "Noe");

myAccount.deposit(100);
jayAccount.deposit(500);
noeAccount.deposit(1000);

jayAccount.deposit(-2);

myAccount.charge(noeAccount, 50);

jaySavings = new SavingsAccount(234, "Jay", 15);
jaySavings.deposit(500);
jaySavings.accrueInterest();