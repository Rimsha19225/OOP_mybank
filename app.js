#! /usr/bin/env node
import inquirer from "inquirer";
// Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful: $${this.balance} `);
        }
        else {
            console.log(`Insuficient balance.`);
        }
    }
    // Credit Money
    deposit(amount) {
        if (amount > 100) {
            //$1 fee charged if more than $100 is deposit
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaing balance: $${this.balance}`);
    }
    // Checked Balance
    checkBalance() {
        console.log(`Current Balnace: $${this.balance}`);
    }
}
//Coustomer Class
class Coustomer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firsName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firsName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create Bank Accounts
const accounts = [
    new BankAccount(19225, 1000),
    new BankAccount(19226, 2000),
    new BankAccount(19227, 3000)
];
// Create Coustomers
const coustomers = [
    new Coustomer("Adeel", "M.Arshad", "male", 22, 3333039913, accounts[0]),
    new Coustomer("Zaryab", "M.Arshad", "male", 20, 3333039912, accounts[1]),
    new Coustomer("Rimsha", "M.Arshad", "female", 24, 3131156294, accounts[2])
];
//Function to Interact with Bank Account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = coustomers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`WellCome, ${customer.firstName} ${customer.lastName}!\n `);
            const answer = await inquirer.prompt({
                name: "select",
                type: "list",
                message: "Select an Operation:",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            });
            switch (answer.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to Deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to Withdraw:"
                    });
                    customer.account.deposit(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(`Exiting bank program...\n`);
                    console.log(`Thank You for using our Bank Services, have a great day!`);
                    return;
            }
        }
        else {
            console.log(`Invalid Acoount Number. Please try again.`);
        }
    } while (true);
}
service();
