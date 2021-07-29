
// Выпадающий список
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const optionsList = document.querySelectorAll(".option");
selected.addEventListener("click", function () {
  optionsContainer.classList.toggle("active");
});
optionsList.forEach(function (option) {
  option.addEventListener("click", function () {
    selected.innerHTML = option.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});

// Точки входа


let plus1 = document.getElementById('pl1');
let minus1 = document.getElementById('mn1');
let divTable = document.getElementsByClassName("container-content");
let addBtn = document.getElementById('buy');

let plus2 = document.getElementById('pl2');
let minus2 = document.getElementById('mn2');
let sellBtn = document.getElementById('sell');
////////////////////////////////////
let inputPrice1 = document.getElementById('add-input');
let inputPrice2 = document.getElementById('sell-input');
let inputCount1 = document.getElementById('count-to-buy');
let inputCount2 = document.getElementById('count-to-sell');
////////////////////////////////////
let itemPrice1 = 0;
let itemPrice2 = 0;
let itemSum = 0;
let inputCountToBuy = 0;
let inputCountToSell = 0;
////////////////////////////////////


function changingCount(sign, element) {
  if (sign =='plus') {
    element.value++;
  }
  else if (element.value > 0) {
    element.value--;
  }
  return element.value;
}
////////////////////////////////////
function addButtonControl(price, count, element) {
  if (price==0 || count==0) {
    element.setAttribute("disabled", true);
  }
  else{
    element.removeAttribute('disabled');
  }
}

////////////////////////////////////
plus1.addEventListener('click', () => {
  inputCountToBuy = +changingCount('plus', inputCount1);
  addButtonControl(inputPrice1.value, inputCount1.value, addBtn);
});

minus1.addEventListener('click', () => {
  inputCountToBuy = +changingCount('minus', inputCount1);
  addButtonControl(inputPrice1.value, inputCount1.value, addBtn);
})

plus2.addEventListener('click', () => {
  inputCountToSell = +changingCount('plus', inputCount2);
  addButtonControl(inputPrice2.value, inputCount2.value, sellBtn);
})

minus2.addEventListener('click', () => {
  inputCountToSell = +changingCount('minus', inputCount2);
  addButtonControl(inputPrice2.value, inputCount2.value, sellBtn);
})


////////////////////////////////////
inputPrice1.addEventListener('input', () => {
  itemPrice1 = +inputPrice1.value;
  addButtonControl(inputPrice1.value,inputCount1.value, addBtn);
})

////////////////////////////////////
inputCount1.addEventListener('input', () => {
  inputCountToBuy = +inputCount1.value;
  addButtonControl(inputPrice1.value,inputCount1.value, addBtn);
})
////////////////////////////////////
inputPrice2.addEventListener('input', () => {
  itemPrice2 = +inputPrice2.value;
  addButtonControl(inputPrice2.value,inputCount2.value, sellBtn);
})
////////////////////////////////////
inputCount2.addEventListener('input', () => {
  inputCountToSell = +inputCount2.value;
  addButtonControl(inputPrice2.value,inputCount2.value, sellBtn);
});

////////////////////////////////////
addBtn.addEventListener('click', function () {
  if ((inputCountToBuy > 0) && (itemPrice1 > 0)) {
    let newItemRow = document.createElement('div');
    newItemRow.classList.add('container-content-items-1');

    inputCountToBuy = +inputCount1.value;

    let newItemCount = document.createElement('div');
    newItemCount.classList.add('item', 'count');
    newItemCount.insertAdjacentHTML('afterbegin', `<span>${inputCountToBuy}</span>`);

    itemPrice1 = +inputPrice1.value;


    let newItemPrice = document.createElement('div');
    newItemPrice.classList.add('item', 'price', 'currency');
    newItemPrice.insertAdjacentHTML('afterbegin', `<span>${itemPrice1}</span>`)

    let newItemSum = document.createElement('div');
    newItemSum.classList.add('item', 'sum', 'currency');
    newItemSum.insertAdjacentHTML('afterbegin', `<span>${inputCountToBuy * itemPrice1}</span>`);

    let del = document.createElement('div');
    del.classList.add('btn-del');

    let delBtn = document.createElement('button');
    delBtn.classList.add('del');
    delBtn.insertAdjacentElement('afterbegin', del);
    /// добавление
    newItemRow.insertAdjacentElement('beforeend', newItemCount);
    newItemRow.insertAdjacentElement('beforeend', newItemPrice);
    newItemRow.insertAdjacentElement('beforeend', newItemSum);
    newItemRow.insertAdjacentElement('beforeend', delBtn);

    inputPrice1.value="";
    inputCount1.value="";
    addButtonControl(0,0, addBtn);


    let divDefault1 = document.getElementById('norec-1');
    delBtn.addEventListener('click', function () {
      newItemRow.remove();
      let div = document.createElement('div');
      div.className = "no-recording";
      div.id = "norec-1";
      div.innerHTML = "Нет записей";

      if (document.getElementsByClassName("container-content-items-1").length == 0)
        divTable[0].insertAdjacentElement('beforeend', div);
    });
    if (divDefault1) {
      divDefault1.remove();
    }
    divTable[0].appendChild(newItemRow);
    if (!newItemRow) {
      divTable[0].insertAdjacentElement('afterbegin', divDefault1);
    }
  }
})



////////////////////////////////////
sellBtn.addEventListener('click', function () {
  if ((inputCountToSell > 0) && (itemPrice2 > 0)) {
    let newItemRow = document.createElement('div');
    newItemRow.classList.add('container-content-items-2');

    inputCountToSell = +inputCount2.value;

    let newItemCount = document.createElement('div');
    newItemCount.classList.add('item', 'count');
    newItemCount.insertAdjacentHTML('afterbegin', `<span>${inputCountToSell}</span>`);

    itemPrice2 = +inputPrice2.value;



    let newItemPrice = document.createElement('div');
    newItemPrice.classList.add('item', 'price', 'currency');
    newItemPrice.insertAdjacentHTML('afterbegin', `<span>${itemPrice2}</span>`)

    let newItemSum = document.createElement('div');
    newItemSum.classList.add('item', 'sum', 'currency');
    newItemSum.insertAdjacentHTML('afterbegin', `<span>${inputCountToSell * itemPrice2}</span>`);

    let del = document.createElement('div');
    del.classList.add('btn-del');

    let delBtn = document.createElement('button');
    delBtn.classList.add('del');
    delBtn.insertAdjacentElement('afterbegin', del);

    newItemRow.insertAdjacentElement('beforeend', newItemCount);
    newItemRow.insertAdjacentElement('beforeend', newItemPrice);
    newItemRow.insertAdjacentElement('beforeend', newItemSum);
    newItemRow.insertAdjacentElement('beforeend', delBtn);
    inputPrice2.value="";
    inputCount2.value="";
    addButtonControl(0,0, sellBtn);

    let divDefault2 = document.getElementById('norec-2');
    delBtn.addEventListener('click', function () {
      newItemRow.remove();
      let div = document.createElement('div');
      div.className = "no-recording";
      div.id = "norec-2";
      div.innerHTML = "Нет записей";


      if (document.getElementsByClassName("container-content-items-2").length == 0)
        divTable[1].insertAdjacentElement('beforeend', div);
    });
    if (divDefault2) {
      divDefault2.remove();
    }
    divTable[1].appendChild(newItemRow);

    if (!newItemRow) {
      divTable[1].insertAdjacentElement('afterbegin', divDefault2);
    }
  }
})

