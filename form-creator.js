class FormCreator {

    constructor(formContainer) {
        this.container = formContainer;
        this.state = [];
        this.amount = 0;
        this.price = 0;
        this.initialize();
        this.initEventListeners();
    }

    setCurrentAveragePrice(currentAveragePrice) {
        this.currentAveragePrice.value = currentAveragePrice;
    }
    initialize() {
        this.plus = this.container.getElementsByClassName('plus')[0];
        this.minus = this.container.getElementsByClassName('minus')[0];
        this.addBtn = this.container.getElementsByClassName('add')[0];
        this.inputAmount = this.container.getElementsByClassName('counter-units')[0];
        this.inputPrice = this.container.getElementsByClassName('unit-price')[0];
        this.divTable = this.container.getElementsByClassName('container-content')[0];
        this.divList = this.container.getElementsByClassName('container-content')[0].getElementsByClassName('container-content-items');
    }


    getState() {
        return this.state;
    }
    // set state(value) {
    //     this._state = value;
    // }
    // // Средняя цена позиции:
    // get averagePriceOfPos() {
    //     return this._averagePriceOfPos;
    // }






    initEventListeners() {
        this.plus.addEventListener('click', () => {
            this.amount = this.changingCount('plus', this.inputAmount);
        });
        this.minus.addEventListener('click', () => {
            this.amount = this.changingCount('minus', this.inputAmount);
        });
        this.inputPrice.addEventListener('input', () => {
            this.validateForm(this.inputPrice.value, this.inputAmount.value, this.addBtn);
            this.price = this.inputPrice.value;
        });
        this.inputAmount.addEventListener('input', () => {
            this.validateForm(this.inputPrice.value, this.inputAmount.value, this.addBtn);
            this.amount = this.inputAmount.value;
        });
        this.addBtn.addEventListener('click', event => {
            event.preventDefault();
            this.price = this.inputPrice.value;
            this.amount = this.inputAmount.value;
            this.clearInputs(this.inputAmount, this.inputPrice, this.addBtn);
            // this.clearTable();
            if (this.amount > 0 && this.price > 0) {
                debugger;
                this.modelAddRecord(this.amount, this.price);
                // this.displaystate();
            }
        });
        this.divTable.addEventListener('click', event => {
            event.preventDefault();
            if (event.target.className === 'del') {
                let id = parseInt(event.target.parentElement.id);
                this.modelDeleteRecord(id);
            }
        })
    }
    validateForm(val1, val2, element) {
        if ((val1 <= 0) || (val2 <= 0)) {
            val1 = 0;
            val2 = 0;
            element.setAttribute("disabled", true);
        }
        else {
            element.removeAttribute('disabled');
        }
        return Number(val1);
    }
    modelAddRecord(amount1, price1) {
        let _record = {
            //   id: this.state.length > 0 ? this.state[this.state.length - 1].id + 1 : 1,
            id: parseInt(Date.now()),
            amount: Number(amount1),
            price: Number(price1),
            sum: Number(amount1) * Number(price1)
        }
        this.state.push(_record);
        ///////  сюда callback для subscribers//////////////////////////////////////////////////////////////////////////
        ///////  пока синхронный вызов //////////////////////////////////////////////////////////////////////////
        this.addTableRow(_record.id, _record.amount, _record.price, _record.sum);
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
    }



    modelDeleteRecord(id) {
        this.state = this.state.filter((n) => { return n.id != parseInt(id) });
        ///////  сюда callback для subscribers//////////////////////////////////////////////////////////////////////////
        ///////  пока синхронный вызов //////////////////////////////////////////////////////////////////////////
        this.deleteTableRow(id);
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
    }

    addTableRow(id, amount, price, sum) {
        if ((this.state.length > 0) && (this.container.getElementsByClassName('no-recording').length > 0)) {
            this.container.getElementsByClassName('no-recording')[0].remove();
        };
        let recr = document.createElement('div');
        recr.classList.add('container-content-items');
        recr.id = id; //it + 1;
        let recordAmount = document.createElement('div');
        recordAmount.classList.add('item', 'count');
        recordAmount.insertAdjacentHTML('afterbegin', `<span>${amount}</span>`);
        let recordPrice = document.createElement('div');
        recordPrice.classList.add('item', 'price', 'currency');
        recordPrice.insertAdjacentHTML('afterbegin', `<span>${price}</span>`)
        let stateum = document.createElement('div');
        stateum.classList.add('item', 'sum', 'currency');
        stateum.insertAdjacentHTML('afterbegin', `<span>${sum}</span>`);
        let del = document.createElement('div');
        del.classList.add('btn-del');
        let delBtn = document.createElement('button');
        delBtn.classList.add('del');
        delBtn.insertAdjacentElement('afterbegin', del);
        recr.insertAdjacentElement('beforeend', recordAmount);
        recr.insertAdjacentElement('beforeend', recordPrice);
        recr.insertAdjacentElement('beforeend', stateum);
        recr.insertAdjacentElement('beforeend', delBtn);
        this.divTable.appendChild(recr);
        // this.clearInputs(this.inputAmount, this.inputPrice, this.addBtn);
    }
    deleteTableRow(id) {
        for (let i = 0; i < this.divList.length; i++) {
            if (this.divList[i].id == id) {
                this.divList[i].remove();
            }
        };
        if ((this.divList.length === 0) && (this.container.getElementsByClassName('no-recording').length === 0)) {
            let div = document.createElement('div');
            div.className = "no-recording";
            div.innerHTML = "Нет записей";
            this.divTable.insertAdjacentElement('beforeend', div);
        }
        // console.log("delete state");
        // console.log(this.state);
        // recr.remove();
    }

    ////  VIEW  ////////////////////////////////////
    changingCount(sign, element) {
        if (sign == 'plus')
            element.value++;
        else if (element.value > 0)
            element.value--;
        return Number(element.value);
    }
    clearInputs(inputAmount, inputPrice, addBtn) {
        inputAmount.value = "";
        inputPrice.value = "";
        addBtn.setAttribute("disabled", true);
    }



    //

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
    displaystate() {
        this.clearTable();
        let id = 0;
        if (this.state.length > 0) {
            if (this.container.getElementsByClassName('no-recording').length > 0) {
                this.container.getElementsByClassName('no-recording')[0].remove();
            }
            this.state.sort((a, b) => a.id - b.id);
            console.log(this.state);
            for (let it = 0; it < this.state.length; it++) {
                let recr = document.createElement('div');
                recr.classList.add('container-content-items');
                recr.id = parseInt(Date.now()); //it + 1;
                let recordAmount = document.createElement('div');
                recordAmount.classList.add('item', 'count');
                recordAmount.insertAdjacentHTML('afterbegin', `<span>${this.state[it].amount}</span>`);
                let recordPrice = document.createElement('div');
                recordPrice.classList.add('item', 'price', 'currency');
                recordPrice.insertAdjacentHTML('afterbegin', `<span>${this.state[it].price}</span>`)
                let stateum = document.createElement('div');
                stateum.classList.add('item', 'sum', 'currency');
                stateum.insertAdjacentHTML('afterbegin', `<span>${this.state[it].amount * this.state[it].price}</span>`);
                let del = document.createElement('div');
                del.classList.add('btn-del');
                let delBtn = document.createElement('button');
                delBtn.classList.add('del');
                delBtn.insertAdjacentElement('afterbegin', del);
                /// добавление
                recr.insertAdjacentElement('beforeend', recordAmount);
                recr.insertAdjacentElement('beforeend', recordPrice);
                recr.insertAdjacentElement('beforeend', stateum);
                recr.insertAdjacentElement('beforeend', delBtn);
                // delBtn.addEventListener('click', () => {
                //     let id = parseInt(recr.id);
                //     this.modelDeleteRecord(id);
                //     console.log("delete state");
                //     console.log(this.state);
                //     recr.remove();
                // });
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
            fstate: this.state,
        }
    }


}

