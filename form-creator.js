class FormCreator {
  constructor(iter) {
      this.records = [];
      this.currentAveragePrice = 0;
      this.currentProfit = 0;
      this.currentAveragePrice = 0;
      this.container = document.getElementsByClassName('container')[iter];
      let plus = this.container.getElementsByClassName('plus')[0];
      let minus = this.container.getElementsByClassName('minus')[0];
      let addBtn = this.container.getElementsByClassName('add')[0];
      let inputAmount = this.container.getElementsByClassName('counter-units')[0];
      let inputPrice = this.container.getElementsByClassName('unit-price')[0];
      let divTable = this.container.getElementsByClassName('container-content')[0];
      let divList = this.container.getElementsByClassName('container-content')[0].getElementsByClassName('container-content-items');
      this.amount = 0;
      this.price = 0;

      plus.addEventListener('click', () => {
          this.amount = this.changingCount('plus', inputAmount);
      });

      minus.addEventListener('click', () => {
          this.amount = this.changingCount('minus', inputAmount);
      });

      inputPrice.addEventListener('input', () => {
          this.inputDisableCheck(inputPrice.value,inputAmount.value, addBtn);
          this.price=inputPrice.value;
      });
      inputAmount.addEventListener('input', () => {
          this.inputDisableCheck(inputPrice.value,inputAmount.value, addBtn);
           this.amount=inputAmount.value;
      });

      addBtn.addEventListener('click',  () =>{
          this.price = inputPrice.value;
          this.amount = inputAmount.value;
          this.clearInputs(inputAmount, inputPrice,addBtn);
          this.clearTable();
          if (this.amount > 0 && this.price > 0) {
              this.modelAddRecord(this.amount, this.price);
              this.displayRecords();
         }
      });

  }

  modelAddRecord(amount1, price1) {
      let _record = {
          id: this.records.length > 0 ? this.records[this.records.length - 1].id + 1 : 1,
          amount: Number(amount1),
          price: Number(price1),
          sum: Number(amount1) * Number(price1)
      }
      this.records.push(_record);
  }
  modelDeleteRecord(id) {
      this.records = this.records.filter((n) => {return n.id != parseInt(id)});
  }

  ////  VIEW  ////////////////////////////////////
  changingCount(sign, element) {
      if (sign == 'plus')
          element.value++;
      else if (element.value > 0)
          element.value--;
      return Number(element.value);
  }
  clearInputs(inputAmount, inputPrice,addBtn) {
      inputAmount.value = "";
      inputPrice.value = "";
      addBtn.setAttribute("disabled", true);
  }
  inputDisableCheck(val1,val2, element) {
      if ((val1 <= 0)|| (val2 <= 0)){
          val1 = 0;
          val2 = 0;
          element.setAttribute("disabled", true);
      }
      else {
          element.removeAttribute('disabled');
      }
      return Number(val1);
  }


  eventAddRecord() {
      this.addBtn.addEventListener('click', event => {
          event.preventDefault();
          this.price = this.inputPrice.value;
          this.amount = this.inputAmount.value;
          this.clearInputs(inputAmount, inputPrice,addBtn);
          this.clearTable();
          if (this.amount > 0 && this.price > 0) {
              this.modelAddRecord(this.amount, this.price);
              displayRecords();


          }
      })
  }
  eventRemoveRecord() {
      this.divTable.addEventListener('click', event => {
          event.preventDefault();
          if (event.target.className === 'del') {
              let id = parseInt(event.target.parentElement.id);
              this.modelDeleteRecord(id);
              this.divList[id].remove();

          }

      })
  }
  checkClearTable() {
      this.divList1 = this.container.getElementsByClassName('container-content-items');

      if ((this.divList.length === 0) && (this.container.getElementsByClassName('no-recording').length === 0)) {
          for (let i = 0; i < this.divList.length; i++)
              this.divList[i].remove();

          let div = document.createElement('div');
          div.className = "no-recording";
          div.innerHTML = "Нет записей";
          this.divTable.insertAdjacentElement('beforeend', div);
      }

  }

  getAmount() {
      return this.inputAmount.value;
  }
  setAmount(amount1) {
      this.inputAmount.value = amount1;
  }
  getPrice() {
      return this.inputPrice.value;
  }
  setPrice(price1) {
      this.inputPrice.value = price1;
  }
  clearTable() {

      this.divTable = this.container.getElementsByClassName('container-content')[0];

      for (let i = 0; i < this.divTable.length; i++) {
          if (this.divTable[i].className === 'container-content-items')
              this.divTable[i].remove();
      };

      let divList1 = this.container.getElementsByClassName('container-content-items');
      for (let i = 0; i < divList1.length; i++)
          divList1[i].remove();
  }
  displayRecords() {

      this.clearTable();
      let id = 0;
      if (this.records.length > 0) {

          if (this.container.getElementsByClassName('no-recording').length > 0) {
              this.container.getElementsByClassName('no-recording')[0].remove();
          }
          console.log(this.records);

          for (let it = 0; it < this.records.length; it++) {
              let recr = document.createElement('div');
              recr.classList.add('container-content-items');
              recr.id = it + 1;
              let recordAmount = document.createElement('div');
              recordAmount.classList.add('item', 'count');
              recordAmount.insertAdjacentHTML('afterbegin', `<span>${this.records[it].amount}</span>`);
              let recordPrice = document.createElement('div');
              recordPrice.classList.add('item', 'price', 'currency');
              recordPrice.insertAdjacentHTML('afterbegin', `<span>${this.records[it].price}</span>`)
              let recordSum = document.createElement('div');
              recordSum.classList.add('item', 'sum', 'currency');
              recordSum.insertAdjacentHTML('afterbegin', `<span>${this.records[it].amount * this.records[it].price}</span>`);
              let del = document.createElement('div');
              del.classList.add('btn-del');
              let delBtn = document.createElement('button');
              delBtn.classList.add('del');
              delBtn.insertAdjacentElement('afterbegin', del);
              /// добавление
              recr.insertAdjacentElement('beforeend', recordAmount);
              recr.insertAdjacentElement('beforeend', recordPrice);
              recr.insertAdjacentElement('beforeend', recordSum);
              recr.insertAdjacentElement('beforeend', delBtn);
              delBtn.addEventListener('click',  () => {
                  let id = parseInt(recr.id);
                  this.modelDeleteRecord(id);
                  recr.remove();
              });
              this.divTable.appendChild(recr);
          }
      };

  }


  getFormInfo() {
      return {
          plus: this.plus,
          minus: this.minus,
          inputAmount: this.inputAmount,
          inputPrice: this.inputPrice,
          divTable: this.divTable,
          addBtn: this.addBtn,
          fstate: this.records,
      }
  }
}

const form1 = new FormCreator(0);
const form2 = new FormCreator(1);