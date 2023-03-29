let indirizzo = window.location.href.substring(0,45)+"php/";
var domande = [];
var risultati = [];

window.onload = function (){
    let promise = fetch(indirizzo + "domande.php");
    promise.then(
        async (response)=>{
            let ris = await response.json();
            domande = ris;
            console.log(ris);
            let div = document.getElementById("divDomande");

            for(let j in ris){
                let domanda = document.createElement("div");
                domanda.innerHTML = ris[j].testo;
                for(let i in ris[j].risposta){
                    let radio = document.createElement("div");
                    radio.innerHTML = `
                                <input type='radio' class='radio' value='${ris[j].risposta[i].id}' name='${ris[j].id}' />
                                    ${ris[j].risposta[i].desc}<br>
                                `;
                    domanda.appendChild(radio);
                }
                div.appendChild(domanda);
            }

            div.innerHTML+= `<br>
                                <input type='button' value='Controlla' name='btnControlla' id='btnControlla' onclick="controlla()"/>
                                <br>
                                `;
        }
    )
}

function controlla() {
    let radios = document.getElementsByClassName("radio");
    let ris = document.querySelectorAll("input:checked");


    if(ris.length == (radios.length)/3){
        let cont = 0;
        for(let risposta of ris){
            console.log(risposta);

            if(!domande[risposta.name].risposta[risposta.value].corretta ){
                risposta.style.accentColor = "red";
                cont++;
            }
            else
                risposta.style.accentColor = "green";

            risultati.push({
                nDomanda: risposta.name,
                nRisposta: risposta.value,
            });
        }
        if (cont==0)
            alert("Si, bravo");
        else
            alert("Hai sbaghliatp "+cont+" domnada colione");
    }
    else{
        alert("Sei un finosckio");
    }
    console.log(JSON.stringify(risultati));

    let a = document.createElement("a");
    a.download = "zebby.json";
    a.href = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(risultati));
    a.click();
}

