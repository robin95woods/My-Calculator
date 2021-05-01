//Dark mode 
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
 }

 //declared Variables 
var mainInput = document.getElementsByClassName("input")[0];
var formulaInput = document.getElementsByClassName("formula")[0];
var ac = document.getElementById("AC");
var ce = document.getElementById("CE");
var equals = document.getElementById("equals");
var main = "0"
var formula = "0"

var setMainInput = function(value){
    if (main === '0' && value != '.') {
        main = "";
    }
    setMain(main + value)
}

var canUpdateMain = function(value){
    if (value === '.' && main.indexOf('.') >= 0){
        return false;
    }
    if(main.length >= 7){
        return false;
    }
    return true;
}

var setFormulaInput = function(value){
    if (value === ' ÷ ' || value === ' + ' || value === ' - ' || value === ' × '){
        main = '0';
        mainInput.innerHTML = main;
    }
    if (formula === '0' && value != '.' && value != ' + ' && value != ' × ' && value != ' ÷ '){
        formula = "";
    }
    if (formula.length >= 30){
        formulaInput.innerHTML = "LIMIT REACHED"
        return;
    }
    setFormula(formula + value)
}

var resetMain = function(){
    setFormula(formula.slice(0, -main.length));

    if (formula === ''){
        setFormula('0')
    }
    setMain('0')
}

var setFormula = function(str){
    formula = str;
    formulaInput.innerHTML = formula;
}

var setMain = function(str){
    main = str;
    mainInput.innerHTML = main;
}

var calculateFormula = function(){
    var calculated = eval(formula.replace('÷', '/').replace('−', '-').replace('×', '*'));
    calculated = calculated.toString()
    setFormula(calculated)
    setMain(calculated)
}

ac.onclick = function(){
    resetMain();
    setFormula('0')
}

ce.onclick = function(){
    calculateFormula();
}
equals.onclick = function(){
    calculateFormula();
}

var symbolPress = function(symbol){
    if (formula[formula.length - 1] === ' '){
        return;
    }
    if (formula === ' + ' && formula === ' ÷ ' && formula === ' × '){
        return;
    }
    setFormulaInput(symbol);
}

var numPress = function(number){
    if (canUpdateMain(number)){
        setMainInput(number);
        setFormulaInput(number);
    }
}
setMain('0')
setFormula('0')