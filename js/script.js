{
    let id;
    let writingComplete = false;
    let dictationPoints = 0;
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

    const reduceNumber = () => {
        const remaining = Number(textContentGet(`countdown`)) - 1;
        setNumber(remaining, `countdown`);
        if (remaining === 0) {
            startAnimation(`countdown`);
            clearInterval(id);
        }
    }

    const handleClickButtonText = () => {
        if (writingComplete) return;

        const field = document.querySelector(`.textfield`);
        field.focus();
        const error = document.querySelector(`.red`);
        if (field.value.toLowerCase() !== rightText) {
            error.classList.remove(`hidden`);
            return;
        }

        writingComplete = true;
        clearInterval(id);
        startAnimation(`countdown`);
        error.classList.add(`hidden`);
        const remaining = Number(textContentGet(`countdown`));
        document.querySelector(`.win`).textContent = remaining > 0
            ? `Je bent binnen de tijd, Ga naar de volgende vaardigheidstest.`
            : `Je hebt juist overgenomen maar buiten de tijd, Ga naar de volgende vaardigheidstest.`;
        pointAdd(remaining);
    }

    const showResult = (number, point) => {
        const heading = document.querySelector(`.result-heading`);
        heading.classList.remove(`hidden`);
        document.querySelector(`.result`).innerHTML =
            `<p class="testpage__info result__text red">Je hebt ${point} punten, je bent ${resultText[number]}</p>
             <img src="../assets/professor${moodProfessor[number]}.png" alt="professor" width="200" height="225" class="testpage__info">`;
        heading.scrollIntoView();
    }

    const handleSubmitFormGeneral = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const points = wordsSpellingtest.reduce((total, word, index) => {
            const answer = form.querySelector(`.word${index}`).value.trim().toLowerCase();
            return total + (answer === word ? 10 : 0);
        }, 0);
        pointAdd(points - dictationPoints);
        dictationPoints = points;

        const total = Number(textContentGet(`point-counter`));
        showResult(total >= 70 ? 1 : 0, total);
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
        const field = document.querySelector(`.textfield`);
        if (field) {
            field.addEventListener(`focus`, () => {
                id = setInterval(reduceNumber, 1000);
            }, { once: true });
            document.querySelector(`.button-klik`).addEventListener(`click`, handleClickButtonText);
            document.querySelectorAll(`.normal`).forEach(node => node.addEventListener(`click`, handleClickNormal));
            document.querySelectorAll(`.fault`).forEach(node => node.addEventListener(`click`, handleClickFault));
            document.querySelector(`.form__general`).addEventListener(`submit`, handleSubmitFormGeneral);
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