import React, { Component } from "react";
import "./Home.css";
import AddMoney from "../AddMoney/AddMoney";
import NavBar from "../NavBar/NavBar";

export default class Home extends Component {
  constructor(props) {
    super(props);
    let storedTransactions = JSON.parse(localStorage.getItem("transactions"));
    let storedRecurringTransactions = JSON.parse(
      localStorage.getItem("recurringTransactions")
    );
    this.state = {
      expenses: storedTransactions || [],
      monthlyBalance: 0,
      recurring: storedRecurringTransactions || [],
    };
  }

  // it will get all the objects, map through their months and add the ones that are the same as the month and year on the users computer
  // it will then add all of the expenses ammounts of this new array to a total and display it.
  getThisMonths = () => {
    let date = new Date();
    // it displays january being 0, february being 1 etc, so have to add 1
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let arr = [];

    this.state.expenses.map((expense) => {
      if (expense.month === month && expense.year === year) {
        arr.push(expense);
      } else {
        arr.slice(arr.indexOf(expense));
      }
    });

    let total = 0.0;

    arr.map((expense) => {
      total = total + parseFloat(expense.ammount);
    });

    return total;
  };

  // it will map thought the expenses state and add all the ammounts of each object to a total and display it.

  balance() {
    let total = parseFloat(this.props.balance);
    this.state.expenses.map((expense) => {
      total = total + parseFloat(expense.ammount);
    });
    return total;
  }

  // it will recieve the info of a transaction that the user wants to add
  // it will store this new transaction to local storage and update the state to whats saved on local storage.
  // if nothing is saved to local storage it will create it saving an array with a object to it and then setting
  // the expenses state to whats saved on local storage.
  addTransaction = (
    ids,
    titles,
    descriptions,
    ammounts,
    years,
    months,
    days
  ) => {
    let storedTransactions = JSON.parse(localStorage.getItem("transactions"));
    if (storedTransactions) {
      console.log(storedTransactions);
      storedTransactions.push({
        id: ids,
        description: descriptions,
        title: titles,
        ammount: ammounts,
        year: years,
        month: months,
        day: days,
      });
      localStorage.setItem("transactions", JSON.stringify(storedTransactions));
      this.setState({
        expenses: JSON.parse(localStorage.getItem("transactions")),
      });
    } else if (!storedTransactions) {
      localStorage.setItem(
        "transactions",
        JSON.stringify([
          {
            id: ids,
            description: descriptions,
            title: titles,
            ammount: ammounts,
            year: years,
            month: months,
            day: days,
          },
        ])
      );
      this.setState({
        expenses: JSON.parse(localStorage.getItem("transactions")),
      });
    }
  };

  // have to re do this, so it does the same as addTransactions, also another function to when it gets to the supposed day of the transaction
  // it will add to the transactions, might have to do so it check if theres a transaction with same title, description, ammount
  // day, week, year... if there is it wont add, if there isnt it will add.
  addRecurringTransactions = (
    ids,
    titles,
    descriptions,
    ammounts,
    dayOfTransactions
  ) => {
    let storedRecurringTransactions = JSON.parse(
      localStorage.getItem("recurringTransactions")
    );
    if (storedRecurringTransactions) {
      console.log(storedRecurringTransactions);
      storedRecurringTransactions.push({
        id: ids,
        description: descriptions,
        title: titles,
        ammount: ammounts,
        dayOfTransaction: dayOfTransactions,
      });
      localStorage.setItem(
        "recurringTransactions",
        JSON.stringify(storedRecurringTransactions)
      );
      this.setState({
        recurring: JSON.parse(localStorage.getItem("recurringTransactions")),
      });
    } else if (!storedRecurringTransactions) {
      localStorage.setItem(
        "recurringTransactions",
        JSON.stringify([
          {
            id: ids,
            description: descriptions,
            title: titles,
            ammount: ammounts,
            dayOfTransaction: dayOfTransactions,
          },
        ])
      );
      this.setState({
        recurring: JSON.parse(localStorage.getItem("recurringTransactions")),
      });
    }
  };

  recurringTransactionsTransfer = (obj) => {
    let date = new Date();

    this.title = obj.title;
    this.description = obj.description;
    this.ammount = obj.ammount;
    this.id = Math.random() * 1000000;

    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();

    this.addTransaction(
      this.id,
      this.title,
      this.description,
      this.ammount,
      this.year,
      this.month,
      this.day
    );
  };

  deleteTransaction = (obj) => {
    let storedTransactions = JSON.parse(localStorage.getItem("transactions"));
    let index = storedTransactions;
    console.log(index);

    index.map((expense) => {
      if (obj.id !== expense.id) {
        return;
      } else if (obj.id === expense.id) {
        index.splice(index.indexOf(expense), 1);
      }
    });
    console.log(index);
    localStorage.setItem("transactions", JSON.stringify(index));
    this.setState({
      expenses: JSON.parse(localStorage.getItem("transactions")),
    });
  };
  deleteRecurringTransaction = (obj) => {
    let storedRecurringTransactions = JSON.parse(
      localStorage.getItem("recurringTransactions")
    );
    let index = storedRecurringTransactions;
    console.log(index);

    index.map((recurringTransaction) => {
      if (obj.id !== recurringTransaction.id) {
        return;
      } else if (obj.id === recurringTransaction.id) {
        index.splice(index.indexOf(recurringTransaction), 1);
      }
    });
    console.log(index);
    localStorage.setItem("recurringTransactions", JSON.stringify(index));
    this.setState({
      recurring: JSON.parse(localStorage.getItem("recurringTransactions")),
    });
  };

  incomeGrowth() {
    let date = new Date();
    // it displays january being 0, february being 1 etc, so have to add 1
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let arr = [];

    this.state.expenses.map((expense) => {
      if (
        expense.month === month &&
        expense.year === year &&
        expense.ammount > 0
      ) {
        arr.push(expense);
      } else {
        arr.slice(arr.indexOf(expense));
      }
    });

    let total = 0.0;

    arr.map((expense) => {
      total = total + parseFloat(expense.ammount);
    });

    return total;
  }
  incomeReduced() {
    let date = new Date();
    // it displays january being 0, february being 1 etc, so have to add 1
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let arr = [];

    this.state.expenses.map((expense) => {
      if (
        expense.month === month &&
        expense.year === year &&
        expense.ammount < 0
      ) {
        arr.push(expense);
      } else {
        arr.slice(arr.indexOf(expense));
      }
    });

    let total = 0.0;

    arr.map((expense) => {
      total = total + parseFloat(expense.ammount);
    });

    return total;
  }
  // it opens the tabs to add the transaction and the recurring payments
  openTab = () => {
    if (document.getElementById("addTransaction")) {
      document.getElementById("addTransaction").style.display = "flex";
    }
  };
  closeTab = () => {
    if (document.getElementById("addTransaction")) {
      document.getElementById("addTransaction").style.display = "none";
    } else {
      console.log("hello");
    }
  };

  render() {
    return (
      <main>
        <NavBar name={this.props.name} />
        <div className="main">
          <div className="balance-widget">
            <div className="balance">
              <h2>BALANCE</h2>
              <p className="total">${this.balance()}</p>
            </div>
            <div className="monthstats">
              <div className="thisDate">
                <h2>THIS MONTH</h2>
              </div>
              <div className="allcurrencies">
                <div className="income">
                  {
                    <p className="total">
                      {" "}
                      <span className="arrows">&#8594;</span>$
                      {this.getThisMonths()}
                    </p>
                  }
                </div>
                <div className="income">
                  <p>
                    <span className="arrows">&#8599;</span>$
                    {this.incomeGrowth()}
                  </p>
                </div>
                <div className="income lastchild">
                  <p>
                    <span className="arrows">&#8600;</span>$
                    {this.incomeReduced()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Add money or recurring widget */}
          <div className="addMoney" id="addTransaction">
            <AddMoney
              addTransaction={this.addTransaction}
              addRecurringTransactions={this.addRecurringTransactions}
              closeTab={this.closeTab}
            ></AddMoney>
          </div>

          {/* Transactions widget */}
          <div className="transactions">
            <h2>TRANSACTIONS</h2>
            <div className="list">
              {/* Will reverse the array so newest comes first, map through 
              the expenses state array and display each object on it  */}
              {this.state.expenses.reverse().map((expense) => {
                return (
                  <div key={expense.id} className="expenses">
                    <button
                      onClick={() => this.deleteTransaction(expense)}
                      className="delete button"
                    >
                      x
                    </button>
                    <div className="item">
                      <h3 className="transaction-title">{expense.title}</h3>
                      <p className="transaction-description">
                        "{expense.description}"
                      </p>
                      <p className="transaction-ammount">${expense.ammount}</p>
                      <p>
                        {expense.year}, {expense.month}, {expense.day}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recurring payments */}
          <div className="recurringTransactions">
            <h2>RECURRING TRANSACTIONS</h2>
            <div className="list">
              {/* Will map through the recurring state array and display each object on it  */}
              {this.state.recurring.reverse().map((payment) => {
                return (
                  <div key={payment.id} className="expenses">
                    <button
                      onClick={() => this.deleteRecurringTransaction(payment)}
                      className="deleteButton"
                    >
                      x
                    </button>
                    <button
                      onClick={() =>
                        this.recurringTransactionsTransfer(payment)
                      }
                      className="rightArrowButton"
                    >
                      &rarr;
                    </button>
                    <button
                      onClick={() =>
                        this.recurringTransactionsTransfer(payment)
                      }
                      className="upArrowButton"
                    >
                      &uarr;
                    </button>
                    <div className="item">
                      <h3 className="transaction-title">{payment.title}</h3>
                      <p className="transaction-description">
                        "{payment.description}"
                      </p>
                      <p className="transaction-ammount">${payment.ammount}</p>
                      <p className="dayTransaction">
                        Transaction on day: {payment.dayOfTransaction}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <button
          className="button-36"
          role="button"
          onClick={this.openTab}
          id="button-36"
        >
          +
        </button>
      </main>
    );
  }
}
