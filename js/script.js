{
    let id;
    let noNewTimer=0;
    const rightText = `de professor is geweldig. we hebben alles aan hem te danken. hij heeft ons gered van de wereld waar alles fout gaat en boeken minder belangrijk worden.`;
    const wordsSpellingtest = [`cappuccino`, `ge-e-maild`, `zee-egel`];
    const moodProfessor = [`sad`, `happy`];
    const resultText= [`niet toegelaten.`, `toegelaten!`];
    const textWriter = [`- Moet elke dag schrijven <br>
            -1 boek per maand <br>
            -Focust alleen op schrijven <br>
            -Altijd risico om niet-schrijver te worden`, `- Mogen geen boeken schrijven <br>
            -Maken leven van schrijvers gemakkelijk <br>
            -Doen al de nijverheid <br> -Wonen in appartementen `];
    const pictureWriter= [`writers`, `nonwriters`]

    const textContentGet = (nameElement) => document.querySelector(`.${nameElement}`).textContent;

    const startAnimation = (cssproperty) => document.querySelector(`.${cssproperty}`).classList.add(`fade`);

    const setNumber = (number, cssproperty) => document.querySelector(`.${cssproperty}`).textContent = number;

    // Alles voor de test
    const pointAdd = (amount) =>{
        let amountPoints = textContentGet(`point-counter`);
        amountPoints = Number(amountPoints) + amount;
        setNumber(amountPoints, `point-counter`);
    }

    const reduceNumber =()=>{
        let currentNumber = textContentGet(`countdown`);
        if(currentNumber>0){
            currentNumber--;
            setNumber(currentNumber, `countdown`);
            id++;
        } else{
            startAnimation(`countdown`);
            clearInterval(id);
        }
    }

    const handleClickButtonText = () => {
        let number = textContentGet(`countdown`);
        if ((document.querySelector(`.textfield`).value).toLowerCase() === rightText && number > 0) {
            startAnimation(`countdown`);
            document.querySelector(`.red`).classList.add(`hidden`);
            document.querySelector(`.win`).textContent = `Je bent binnen de tijd, Ga naar de volgende vaardigheidstest.`;
            pointAdd(parseInt(number))
        } else if ((document.querySelector(`.textfield`).value).toLowerCase() === rightText) {
            document.querySelector(`.red`).classList.add(`hidden`);
            document.querySelector(`.win`).textContent = `Je hebt juist overgenomen maar buiten de tijd, Ga naar de volgende vaardigheidstest.`;
        } else {
            document.querySelector(`.red`).classList.remove(`hidden`);
        }
    }

    const showResult = (number, point) =>{
        let $result = document.querySelector(`.result`)
        $result.innerHTML =`<p class="testpage__info result__text red">Je hebt ${point} punten, je bent ${resultText[number]}</p>     
                <img src="../assets/professor${moodProfessor[number]}.png" alt="professor" width="200" height="225" class="testpage__info">  `
    }

    const handleSubmitFormGeneral = (e)=>{
        e.preventDefault();
        let $submit = e.currentTarget;
        if(noNewTimer>0){
            for(let i = 0; i<3; i++){
               let inputUser=  $submit.querySelector(`.word${i}`).value;

               if(inputUser.trim().toLowerCase()=== wordsSpellingtest[i]){
                    pointAdd(10);
               }
            }
        let amountPoints = textContentGet(`point-counter`);
        if(amountPoints>=70){
            showResult(1, amountPoints);
        }else{
            showResult(0, amountPoints);
        }
        }
    }

    const handleFocusTextarea=()=>{
        noNewTimer++;
        if(noNewTimer===1){
        id = setInterval(reduceNumber, 1000);

        document.querySelector(`.button-klik`).addEventListener(`click`, handleClickButtonText);

        let normals = document.querySelectorAll(`.normal`);
        normals.forEach($node => $node.addEventListener(`click`, handleClickNormal));

        let faults = document.querySelectorAll(`.fault`);
        faults.forEach($node => $node.addEventListener(`click`, handleClickFault));
        
        document.querySelector(`.form__general`).addEventListener(`submit`, handleSubmitFormGeneral)
        }
    }

    const handleClickNormal= ()=>{
       let chanses= textContentGet(`click-count`);
       if(chanses>0){
           chanses--;
           setNumber(chanses, `click-count`);
       }
    }



    const handleClickFault = (e)=>{
        let chanses= textContentGet(`click-count`);
        if (chanses > 0) {
            chanses--;
            setNumber(chanses, `click-count`);
            pointAdd(3);
            e.currentTarget.classList.add(`right-answer`);
            e.currentTarget.removeEventListener(`click`, handleClickFault);
        }
    }



    //schrijvers pagina
    const removeButton = (element, nameClass) => {
        document.querySelector(`.${element}`).classList.remove(`${nameClass}`)
    }

    const addButton = (element, nameClass) => {
        document.querySelector(`.${element}`).classList.add(`${nameClass}`)
    }

    const handleClickNonwriter =()=>{
        let $buttonWriter = document.querySelector(`.writer`);
        $buttonWriter.addEventListener(`click`, handleClickWriter)

        removeButton(`writer`, `button`);
        addButton(`non-writer`, `button`);
        addButton(`writer__text`, `writer__buttons-not`);
        removeButton(`non-writer__text`, `writer__buttons-not`);

        document.querySelector(`.text__writers`).innerHTML=textWriter[1];
        document.querySelector(`.image__writers`).src = `../assets/${pictureWriter[1]}.png`;
    }

    const handleClickWriter=()=>{
        let $buttonNonwriter = document.querySelector(`.non-writer__text`);
        $buttonNonwriter.addEventListener(`click`, handleClickNonwriter);

        addButton(`writer`, `button`);
        removeButton(`non-writer`, `button`);
        removeButton(`writer__text`, `writer__buttons-not`);
        addButton(`non-writer__text`, `writer__buttons-not`);

        document.querySelector(`.text__writers`).innerHTML = textWriter[0];
        document.querySelector(`.image__writers`).src =`../assets/${pictureWriter[0]}.png`;
    }

    const init =()=>{
        //test
        let $textfield = document.querySelector(`.textfield`);
        if($textfield){
        document.querySelector(`.textfield`).addEventListener(`focus`, handleFocusTextarea);
        }

        let $formbutton = document.querySelector(`.form__general`);
        if($formbutton){
            $formbutton.addEventListener(`submit`, handleSubmitFormGeneral);
        }

        //schrijver
        let $buttonNonwriter = document.querySelector(`.non-writer__text`);
        if($buttonNonwriter){
            $buttonNonwriter.addEventListener(`click`, handleClickNonwriter);
        }
        
        let $buttonWriter = document.querySelector(`.writer`);
        if($buttonWriter){
            $buttonWriter.addEventListener(`click`, handleClickWriter);
        }
    }
    init();
}