// Exercise 3 - Expense Tracker
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// One expense in the array looks like this:
// { id: 1, desc: "Pizza", amount: 42.5, category: "food" }

// Step 1: add an expense on submit (unique id, no reload, validation messages, clear desc + amount, focus desc)

// Step 2: render() - rebuild the table rows from the array

// Step 3: delete (one listener on #rows - event delegation, by data-id)

// Step 4: total of the expenses that are shown

// Step 5: filter by category

// Step 6: sort by amount (toSorted - the original array keeps its order)

// Step 7: rows with an amount above 100 get the class "big"

let expenseForm = document.getElementById("expense-form");
let desc = document.getElementById("desc");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let formError = document.getElementById("form-error");
let rows = document.getElementById("rows");
let noRows = document.getElementById("no-rows");
let total = document.getElementById("total");
let sortBtn=document.getElementById("sort-btn")

let arrItem = [];
let id = 1;

expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (desc.value.trim() == "") {
        formError.textContent = "Please add a description";
        formError.hidden = false;
    }
    else if (Number(amount.value) <= 0) {
        formError.textContent = "The amount must be larger than 0";
        formError.hidden = false;
    }
    else {
        formError.hidden = true;

        let item = {
            id: id,
            amount: Number(amount.value),
            desc: desc.value,
            category: category.value
        };

        id = id + 1;
        arrItem.push(item);
        render();

        desc.value = "";
        amount.value = "";
        desc.focus();
    }
});

function render() {
    rows.textContent = "";
    let displayedArr;
    
    if (filter.value === "all") {
    displayedArr = arrItem;
    } 
    else {
    displayedArr = arrItem.filter(function(item) {
        return item.category === filter.value;
    });
    }
    if(sortBtn.textContent=="Sort by amount: on"){
        displayedArr=displayedArr.toSorted((a,b)=>b.amount-a.amount)
     }
    if (displayedArr.length == 0) {
        noRows.hidden = false;
    }

    else {
        noRows.hidden = true;

        displayedArr.forEach(function(item) {
            let tr = document.createElement("tr");

            let td1 = document.createElement("td");
            td1.textContent = item.desc;
            tr.appendChild(td1);

            let td2 = document.createElement("td");
            let span = document.createElement("span");
            span.classList.add("badge");
            span.textContent = item.category;
            td2.appendChild(span);
            tr.appendChild(td2);

            let td3 = document.createElement("td");
            td3.textContent = item.amount.toFixed(2);
            if(Number(td3.textContent>100))
            {
                tr.classList.add("big")
            }
            let td4 = document.createElement("td");
            let button = document.createElement("button");
            button.textContent = "x";
            button.classList.add("delete");
            button.dataset.id = item.id;
            td4.appendChild(button);

            tr.appendChild(td3);
            tr.appendChild(td4);

            rows.appendChild(tr);
        });
    }

    let sum = 0;

    displayedArr.forEach(function(item) {
        sum = sum + item.amount;
    });
    

    total.textContent = sum.toFixed(2);

   
    
   
}

rows.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete")) {
        arrItem = arrItem.filter(function(item) {
            return Number(event.target.dataset.id) != item.id;
        });

        render();
    }
});

filter.addEventListener("change",function()
{
    render();
})

sortBtn.addEventListener("click",function(event)
{
    
    if(event.target.textContent=="Sort by amount: on")
    {
        event.target.textContent="Sort by amount: off"
        
    }
    else{
        event.target.textContent="Sort by amount: on"
    }
    render();

})

