class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.answer = null;
        this.clear();

    }
    clear(){
            this.currentOperand = '0';
            this.previousOperand = '';
            this.operation = undefined;
            this.answer = null;

    }

    clearButtonChange(){
        allClearButton.innerText = 'C'

    }
  
    
    plusMinusEvent(){
        if(this.currentOperand =='0' || this.currentOperand.includes('-')) return
        this.currentOperand = ('-'+ this.currentOperand);


    }

    // alert('prev: '+this.previousOperand+' current: ' +this.currentOperand);
    appendNumber(number){
        if (this.answer != null) {
            if (number == ',') {
                this.currentOperand = '0,';
            } else {
                this.currentOperand = number;
            }
            this.answer = null;
            return;
        }
        if(this.currentOperand.includes('-')){
            if(number == ','){
                this.currentOperand = '0,';
            }
            else{
                this.currentOperand = number;
            }
            return;
        }
        if(this.currentOperand == '0' && number == ','){
            this.currentOperand = '0,'

        }
        if(this.currentOperand ==='0'){
            this.currentOperand =''
        }
       
        if(number === ',' && this.currentOperand.includes(',')) return
        
        this.currentOperand = this.currentOperand.toString() + number.toString();   
    }


    chooseOperation(operation){
        this.operation = operation;
        if(this.operation == '%'){
            this.previousOperand = this.currentOperand;
            return
        }
        if(this.previousOperand !== ''){
            this.compute();
            
        }
        

        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        console.log('prev: '+this.previousOperand+' current: ' +this.currentOperand);
   }
    
    numberFontSizeDalgasi(){
        this.currentOperandTextElement.style.fontSize = '47px'; 
        const test = document.getElementById("Test")
        let width = Infinity;
        let fontSize = 47;
        while (width > 210) {
            fontSize /= 1.05;
            test.innerText = this.currentOperandTextElement.innerText;
            this.currentOperandTextElement.style.fontSize = fontSize + "px";
            test.style.fontSize = fontSize + "px";
            width = (test.clientWidth) + 1;
        }
    }
    numberFontSizeDalgasiReset(){
        this.currentOperandTextElement.style.fontSize = '47px'; 

    }
    compute(){
        if(this.previousOperand != ''){
            this.previousOperand = this.previousOperand.replace(',', '.');
        this.currentOperand = this.currentOperand.replace(',', '.');
        }
        let computation;
        
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        console.log(typeof prev)
        console.log(typeof current)
        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '×':
                computation = prev * current;
                break   
            case '÷':
            computation = prev / current;
                break  
            case '–':
                computation = prev - current;   
                break;
            case '%':
                computation = current / 100;
                break;    
                
            default:
                return    
        }
        computation = computation.toString().replace('.', ',');
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ''
        this.answer = computation;
        console.log('prev: '+this.previousOperand+' current: ' +this.currentOperand);

    }

    updateDisplay(){
        if (this.currentOperand == '' && this.previousOperand != '') {
            this.currentOperandTextElement.innerText = this.previousOperand;
        } else {
            this.currentOperandTextElement.innerText = this.currentOperand;
            this.previousOperandTextElement.innerText = this.previousOperand;
        }
        this.numberFontSizeDalgasi();
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const percentButton = document.querySelector('[data-percent]');
const plusMinusButton = document.querySelector('[data-plus-minus]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');





// Calculator
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);



// numbers event
numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{ 

        calculator.clearButtonChange();
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();


    })
})
// operation event
operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{


        if(button.innerText =='%'){
            calculator.chooseOperation(button.innerText);
            calculator.compute();
            calculator.updateDisplay();
            
            return
        }

        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();

    })
})
// AC event
allClearButton.addEventListener('click', ()=>{
    allClearButton.innerText ='AC';
    calculator.clear();
    calculator.updateDisplay();
})

// equals event
equalsButton.addEventListener('click', ()=>{
    calculator.compute();
    calculator.updateDisplay();
})

// plus-minus event
plusMinusButton.addEventListener('click', ()=>{
    calculator.plusMinusEvent();
    calculator.updateDisplay();

})
