class Model {
  constructor() {
      this.records = [];
  }
  addRecord(amount1, price1) { ////debugger;
      let record = {
          id: this.records.length > 0 ? this.records[this.records.length - 1].id + 1 : 1,
          amount: Number(amount1),
          price: Number(price1),
          sum: Number(amount1) * Number(price1)
      }
      this.records.push(record);
      this.onRecordsChanged(this.records);
  }
  deleteRecord(id) {
      this.onRecordsChanged(this.records.filter((value) => value.id != id+1));
  }
  // метод для связки и возможности
  bindRecordsChanged(callback) {
      this.onRecordsChanged = callback;

  }
}
class View {
  constructor(iter) {
      this.container = document.getElementsByClassName('container')[iter];
      this.plus = this.container.getElementsByClassName('plus')[0];
      this.minus = this.container.getElementsByClassName('minus')[0];
      this.addBtn = this.container.getElementsByClassName('add')[0];
      this.inputAmount = this.container.getElementsByClassName('counter-units')[0];
      this.inputPrice = this.container.getElementsByClassName('unit-price')[0];
      this.divTable = this.container.getElementsByClassName('container-content')[0];
      this.divList = this.container.getElementsByClassName('container-content')[0].getElementsByClassName('container-content-items');
      this.amount = 0;
      this.price = 0;
      this.plus.addEventListener('click', () => {
          this.amount = this.changingCount('plus', this.inputAmount);
      });
      this.minus.addEventListener('click', () => {
          this.price = this.changingCount('minus', this.inputAmount);

      });
      this.inputPrice.addEventListener('input', () => {
          this.price = this.inputDisableCheck(this.inputPrice.value);
      });
      this.inputAmount.addEventListener('input', () => {
          this.amount = this.inputDisableCheck(this.inputAmount.value);
      });
  }
  changingCount(sign, element) {
      if (sign == 'plus')
          element.value++;
      else if (element.value > 0)
          element.value--;
      return Number(element.value);
  }
  clearInputs() {
      this.inputAmount.value = "";
      this.inputPrice.value = "";
      this.addBtn.setAttribute("disabled", true);
  }
  inputDisableCheck(val) {
      if (val <= 0) {
          val = 0;
          this.addBtn.setAttribute("disabled", true);
      }
      else {
          this.addBtn.removeAttribute('disabled');
      }
      return Number(val);
  }

  eventAddRecord(handler) {
      this.addBtn.addEventListener('click', event => {
          event.preventDefault();
          this.price = this.inputPrice.value;
          this.amount = this.inputAmount.value;
          this.clearInputs();
          this.clearTable();
          if (this.amount > 0 && this.price > 0) {
              handler(this.amount, this.price);
          }
      })
  }
  eventRemoveRecord(handler) {
      this.divTable.addEventListener('click', event => {
          event.preventDefault();
          if (event.target.className === 'del') {
              let id = parseInt(event.target.parentElement.id);
              this.divList[id].remove();
              handler(id);
          }

      })
  }
  checkClearTable() {
      this.divList1 = this.container.getElementsByClassName('container-content-items');
      if ((this.divList.length === 0) && (this.container.getElementsByClassName('no-recording').length === 0)) {
          for (let i=0;i<this.divList.length;i++)
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
  clearTable(){

      this.divTable = this.container.getElementsByClassName('container-content')[0];

      for (let i=0;i<this.divTable.length;i++)
      {
          if (this.divTable[i].className==='container-content-items')
              this.divTable[i].remove();
      };

      let divList1 = this.container.getElementsByClassName('container-content-items');
      for (let i=0;i<divList1.length;i++)
          divList1[i].remove();
  }

  displayRecords(records) {
      this.clearTable();
      let id = 0;
      if (records.length>0){
          if (this.container.getElementsByClassName('no-recording').length > 0){
              this.container.getElementsByClassName('no-recording')[0].remove();
          }
          console.log(records);
          for (var it=0;it<records.length;it++){
              let recr = document.createElement('div');
              recr.classList.add('container-content-items');
              recr.id = it+1;
              let recordAmount = document.createElement('div');
              recordAmount.classList.add('item', 'count');
              recordAmount.insertAdjacentHTML('afterbegin', `<span>${records[it].amount}</span>`);
              let recordPrice = document.createElement('div');
              recordPrice.classList.add('item', 'price', 'currency');
              recordPrice.insertAdjacentHTML('afterbegin', `<span>${records[it].price}</span>`)
              let recordSum = document.createElement('div');
              recordSum.classList.add('item', 'sum', 'currency');
              recordSum.insertAdjacentHTML('afterbegin', `<span>${records[it].amount* records[it].price}</span>`);
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
              //debugger;
              this.divTable.appendChild(recr);
          }
  };

  }
}
class Controller {
  constructor(model, view) {
      this.model = model;
      this.view = view;
      this.view.eventRemoveRecord(this.handleDeleteRecord);
      this.onRecordsChanged(this.model.records);
      this.model.bindRecordsChanged(this.onRecordsChanged)

      this.view.eventAddRecord(this.handleAddRecord.bind(this))
  }

  onRecordsChanged = (records) => {
      this.view.displayRecords(this.model.records)
  }
  handleAddRecord = (amount1, price1) => {
      ////debugger;
      this.model.addRecord(amount1, price1);
  }
  handleDeleteRecord = (id) => {
      this.model.deleteRecord(id)
  }

  getFormInfo() {
      return {
          plus: this.plus,
          minus: this.minus,
          inputAmount: this.inputAmount,
          inputPrice: this.inputPrice,
          divTable: this.divTable,
          addBtn: this.addBtn,
          fstate: this.model.records,
      }
  }
}
const form1 = new Controller(new Model(), new View(0))
const form2 = new Controller(new Model(), new View(1))

