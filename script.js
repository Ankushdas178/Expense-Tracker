//1
const balance = document.getElementById(
    "balance"
  );
  const money_plus = document.getElementById(
    "money-plus"
  );
  const money_minus = document.getElementById(
    "money-minus"
  );
  const list = document.getElementById("list");
  const form = document.getElementById("form");
  const text = document.getElementById("text");
  const amount = document.getElementById("amount");
  // const dummyTransactions = [
  //   { id: 1, text: "Flower", amount: -20 },
  //   { id: 2, text: "Salary", amount: 300 },
  //   { id: 3, text: "Book", amount: -10 },
  //   { id: 4, text: "Camera", amount: 150 },
  // ];
  
  // let transactions = dummyTransactions;
  
  //last 
  const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
  
  let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
  
  //5
  //Add Transaction
  function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
      alert('please add text and amount')
    }else{
      const transaction = {
        id:generateID(),
        text:text.value,
        amount:+amount.value
      }
  
      transactions.push(transaction);
  
      addTransactionDOM(transaction);
      updateValues();
      updateLocalStorage();
      text.value='';
      amount.value='';
    }
  }
  
  
  //5.5
  //Generate Random ID
  function generateID(){
    return Math.floor(Math.random()*1000000000);
  }
  
  //2
  
  //Add Trasactions to DOM list
  function addTransactionDOM(transaction) {
    //GET sign
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
  
    //Add Class Based on Value
    item.classList.add(
      transaction.amount < 0 ? "minus" : "plus"
    );
  
    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
      transaction.amount
    )}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
      `;
    list.appendChild(item);
  }

  

  
  //4
  
  //Update the balance income and expence
  function updateValues() {
    // Get the selected currency from the dropdown menu
    const selectedCurrency = document.getElementById('currencySelector').value;
  
    // Map the amounts to the selected currency symbol
    const currencySymbol = getCurrencySymbol(selectedCurrency);
    const amounts = transactions.map((transaction) => transaction.amount);
  
    // Calculate total, income, and expense in the selected currency
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter((item) => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
  
    // Update the HTML elements with the new currency symbol
    balance.innerText = `${currencySymbol}${total}`;
    money_plus.innerText = `${currencySymbol}${income}`;
    money_minus.innerText = `${currencySymbol}${expense}`;
  }
  
  // Function to get the currency symbol based on user selection
  function getCurrencySymbol(currency) {
    // Add cases for different currencies as needed
    switch (currency) {
      case 'USD':
          return '$';
        case 'EUR':
          return '€';
        case 'GBP':
          return '£';
        case 'JPY':
          return '¥';
        case 'AUD':
          return 'A$';
        case 'CAD':
          return 'CA$';
        case 'CHF':
          return 'CHF';
        case 'CNY':
          return '¥';
        case 'SEK':
          return 'kr';
        case 'NZD':
          return 'NZ$';
        case 'INR':
          return '₹';
      // Add more cases as needed
      default:
        return '$'; // Default to dollar if the currency is not recognized
    }
  }
  
  
  
  
  //6 
  
  //Remove Transaction by ID
  function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
  }
  //last
  //update Local Storage Transaction
  function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
  }
  
  //3
  
  //Init App
  function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
  }
  
  Init();
  
  form.addEventListener('submit',addTransaction);
