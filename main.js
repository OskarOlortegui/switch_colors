const checkbox = document.getElementById('checkbox');
const control_forms = document.querySelectorAll('.form-control')

const input_controls = document.querySelectorAll('.control-input');

/*3 third */
const cta = document.querySelector(".cta")
let booleanControl = true; // true means convert to RGB action otherwise convert to HEx
let hexVal = document.getElementById('hexVal');
    /*3 - B */
    let current_hexVal = document.getElementById('current_hexVal')
    let board = document.querySelector('.board')
    let result = document.getElementById('result')
    let curr_R = document.getElementById('current_rValue')
    let curr_G = document.getElementById('current_gValue')
    let curr_B = document.getElementById('current_bValue')

/* 2 second */
const focusFunc = (i) => {
    i.parentNode.classList.add('focus')
}
const blurFunc = (i) => {
    if(i.value == "") i.parentNode.classList.remove('focus')
}

input_controls.forEach(i=>{
    //console.log(i)
    i.addEventListener('focus', () => focusFunc(i))
    i.addEventListener('blur', () => blurFunc(i))
})

/* 1 first */
checkbox.addEventListener('click',()=>{
    control_forms.forEach(i=>{
        i.classList.toggle('d-none');
    })
    booleanControl = !booleanControl;
    // 3 third - C result
    if(booleanControl){
        let sliceR = curr_R.textContent.slice(2);
        let sliceG = curr_G.textContent.slice(2);
        let sliceB = curr_B.textContent.slice(2);
        result.textContent =  `rgb(${sliceR},${sliceG},${sliceB})`;
    }else{
        result.textContent = `${current_hexVal.textContent}`;
    }
})

/* 3 third - A */
const checkHash = (val) => {
    //you can use "string.replace(a,b) method to remove the #"
    const hash = /#/;
    if(hash.test(val)) val = val.slice(1)
    return val
}

let message = document.querySelector('.message');

const setAlert = (msm) => {
    message.innerHTML = `<span>${msm}</span><span>x</span>`;
    message.classList.add('alert');

    message.addEventListener('click',()=>{
        message.innerHTML = null;
        message.classList.remove('alert');
    })
}

/* 3 third - B */
const convertToRGB = (y,len) => {
    let R; let G; let B; //is the same like let R = undefined, es lo mismo
    let eachChar = []

    for (let i of y) {
        eachChar.push(i)
    }
    eachChar.forEach((char,index)=>{
        switch (char) {
            case 'a': eachChar[index] = 10; break;
            case 'b': eachChar[index] = 11; break;
            case 'c': eachChar[index] = 12; break;
            case 'd': eachChar[index] = 13; break;
            case 'e': eachChar[index] = 14; break;
            case 'f': eachChar[index] = 15; break;
            default: eachChar[index] = parseInt(eachChar[index]);  break;
        }
    })
    //Hexadecimal to decimal
    if(len > 3){ //si existe el 4to digito 
        //[0,1,2,3,4,5]
        R = 16*eachChar[0] + eachChar[1];
        G = 16*eachChar[2] + eachChar[3];
        B = 16*eachChar[4] + eachChar[5];
        console.log(R, G, B);
    }
    else{
        //[0,1,2]
        R = 16*eachChar[0] + eachChar[0];
        G = 16*eachChar[1] + eachChar[1];
        B = 16*eachChar[2] + eachChar[2];
        console.log(R, G, B);
    }

    //Finally DOM
    hexVal.value = '';
    board.style.backgroundColor = `#${y}`;
    current_hexVal.textContent = `#${y}`;
    result.textContent = `rgb(${R},${G},${B})`;
    blurFunc(hexVal);
    //if we click the checkbox
    curr_R.textContent = `R-${R}`;
    curr_G.textContent = `G-${G}`;
    curr_B.textContent = `B-${B}`;
}

const handleToRGB = () => {
    let y = checkHash(hexVal.value.toLowerCase().trim());
    let len = y.length;

    let rgx6 = /[a-f\d]{6}/ig; // Check correct hex value, let hex = /[a-f0-9]{6}/ig;
    let rgx3 = /[a-f\d]{3}/ig;

    if(!y){ //(y === '') ya que !X es empty string 
        setAlert("the entry can't be empty");
    }
    else if((len === 3 && rgx3.test(y)) || (len === 6 && rgx6.test(y))){
        //console.log('success')
        convertToRGB(y,len)
    }
    else{
        hexVal.value = ''
        setAlert("Oops! something went wrong with the given value");
        blurFunc(hexVal)
    }
}

/* 4 four B */
const convertToHEX = (arrRGB) => {
    let myArr = []
    arrRGB.forEach(i =>{
        /* since the max decimal value is
        255 if we convert this into hex it will give us
        ff as result so we only need one Q and one R */
        let q = Math.floor(i/16); //queremos el digito entero
        let r = i%16;
        myArr.push(q,r)
    })
    myArr.forEach((y,index) =>{
        switch(y){
            case 10 : myArr[index] = 'A'; break;
            case 11 : myArr[index] = 'B'; break;
            case 12 : myArr[index] = 'C'; break;
            case 13 : myArr[index] = 'D'; break;
            case 14 : myArr[index] = 'E'; break;
            case 15 : myArr[index] = 'F'; break;
            default :   break;
        }
    });
    //Finally the DOM
    board.style.backgroundColor = `#${myArr.join('')}`;
    result.textContent = `#${myArr.join('')}`;
    current_hexVal.textContent = `#${myArr.join('')}`;
}


/* 4 four */
const handleToHex = () => {
    let arrRGB = []
    // to break forEach we need try and catch
    try {
        input_controls.forEach(i => {
            let rgx = /[a-z]/gi;
            if (i.id !== 'hexVal') {
                if(rgx.test(i.value)){
                    //console.log(i.value, argx.test(i.value))
                    throw "Only numbers allowed" // break
                }
                else if(!i.value || i.value>255 || i.value<0){
                    throw "Please Check the values"
                }
                else{
                    arrRGB.push(i.value)
                }
            }
        })
    } catch (e) {
        setAlert(e)
    }
    finally{
        input_controls.forEach(i=> {
            i.value = '';
            blurFunc(i)
        })
    }

    if(arrRGB.length === 3){
        //console.log('succed')
        convertToHEX(arrRGB)
        curr_R.textContent = `R-${arrRGB[0]}`;
        curr_G.textContent = `G-${arrRGB[1]}`;
        curr_B.textContent = `B-${arrRGB[2]}`;
    }
}


/* 3 third */
cta.addEventListener('click',(e)=>{
    e.preventDefault();
    if(booleanControl) handleToRGB()
    else handleToHex()
})