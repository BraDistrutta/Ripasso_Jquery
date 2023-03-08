let indirizzo = window.location.href.substring(0,45)+"php/";

window.onload = function (){
    let promise = fetch(indirizzo + "domande.php");
    promise.then(
        async (response)=>{
            let ris = await response.json();
            console.log(ris);
            let div = document.getElementById("divDomande");

            for(let j in ris){
                let domanda = document.createElement("div");
                domanda.innerHTML = ris[j].testo;
                for(let i in ris[j].risposta){
                    let radio = document.createElement("div");
                    radio.innerHTML = `
                                <input type='radio' value='${ris[j].risposta[i].id}' name='${ris[j].id}' />
                                    ${ris[j].risposta[i].desc}<br>
                                `;
                    domanda.appendChild(radio);
                }
                div.appendChild(domanda);
            }

        }
    )
}

