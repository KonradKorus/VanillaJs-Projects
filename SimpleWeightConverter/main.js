let scales = document.getElementById('scaleSelector');
let inputValue = document.getElementById('inputBar');

inputValue.addEventListener('keyup', changeValues);
scales.addEventListener('click', selectScale);


function changeValues(){ 
    let value = inputValue.value;
    
    if(value < 0 ){
        document.getElementById('errorMessage').style.display = 'flex';
    }else{

        document.getElementById('errorMessage').style.display = 'none';
        let grams;
        let currentScale = document.getElementsByClassName('selectedScale')[0]
                            .innerHTML.split('(',2)[1].split(')',1)[0];
        
        //changing all input scale to gram 
        switch(currentScale){
            case 'kg':
                grams=value * 1000;
            break;
            case 'g':
                grams=value;
            break;
            case 'lbs':
                grams=value * 453.59237;
            break;
            case 'oz':
                grams=value * 28.3495231;
            break;
            default :
                console.log('wrong input');
            break;
        }
    
        //scaling from grams to other scales

        let outputDivs = document.querySelectorAll('#results div');

        outputDivs.forEach(div => {
            switch(div.id){
                case 'kg':
                    div.children[1].innerText = grams/1000 +' kg';
                break;
                case 'g':
                    div.children[1].innerText = grams +' g';
                break;
                case 'lbs':
                    div.children[1].innerText = grams * 0.00220462262 +' lbs';
                break;
                case 'oz':
                    div.children[1].innerText = grams * 0.0352739619 +' oz';
                break;
                default:
                    console.log('Wrong');
                break;
            
            }
        });

    }
}

function selectScale(e){
    let scalesItems = document.querySelectorAll('.scales');

    if(e.target.classList.contains('scales')){
        
        //removing old divs 
        let lastDiv = document.querySelectorAll('#results div');

        lastDiv.forEach(div => {
            div.remove();
        });

        //changing selected scale button class and creating divs
        scalesItems.forEach(item =>{
            if(item != e.target){
                let div = document.createElement('div');
                let h4 = document.createElement('h4');
                let p = document.createElement('p');
                let shortName = item.innerHTML.split('(',2)[1].split(')',1)

                h4.innerText = item.innerHTML+': ';
                p.innerText = '0 ' + shortName ;

                div.appendChild(h4);
                div.appendChild(p);

                div.id = shortName;

                document.getElementById('results').appendChild(div);
            }

            if( item.classList.contains('selectedScale')){
               item.classList.remove('selectedScale');
            } 
        });

        e.target.classList.add('selectedScale');
        
        //changing site components based on choice:
        let name=e.target.innerText;
        let shortName = e.target.innerHTML.split('(',2)[1].split(')',1);

        //  searchBar
        let input = document.getElementById('inputBar');
        input.placeholder = 'Enter ' + name + '...';

        document.getElementById('shortName').innerText = shortName;
        
        if(inputValue.value != ''){
            changeValues();
        }
    }

}