
import readline from "node:readline/promises";
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout})
async function pedirdatos()
{
    let error=false;
    const operando = (await rl.question("\nIngrese la operación (suma, resta, multiplicacion, division) :) \n")).toLowerCase().trim();

    const entradastring=await rl.question("Ingrese todos los operandores seperados por , ejemplo: 10,5,2 \n");
    const numerostring=entradastring.split(",");
    for(let i=0;i<numerostring.length;i++)
    {
    numerostring[i]=Number(numerostring[i].trim());
    if (isNaN(numerostring[i])) // si no es numero.
    {
        console.log("Ingrese numeros, intente de nuevo! \n");
        rl.close();
        return;
    }
    }
    let resultado;
    switch(operando)
    {
    case "suma":
        resultado = 0;
        for(let i=0;i<numerostring.length;i++)
        {
        resultado=resultado+numerostring[i];
        }
        
        break;
    case "resta":
        resultado = numerostring[0];
        for(let i=1;i<numerostring.length;i++)
        {
        resultado=resultado-numerostring[i];
        }
        break;
    case "multiplicacion":
        resultado=1;
        for(let i=0;i<numerostring.length;i++)
        {
        resultado=resultado*numerostring[i];
        }
        break;
    case "division":
        resultado=numerostring[0];
        let errorDiv = false;
        for(let i=1;i<numerostring.length;i++)
        {
        if(numerostring[i]!=0)
        {
            resultado=resultado/numerostring[i];
        }
        else
        {
        console.log("No se puede dividir por 0!");
        errorDiv = true;
        if(errorDiv)
        {
            rl.close();
            return;
        }
        break;  
        }
        }
        break; 
         
    default:
        resultado="Ingrese una opcion valida, Intente de nuevo \n";
        error=true;
        break;
    }
    if(error)
    {
        console.log(resultado);
    }
    else{
        console.log(`El resultado es: ${resultado}`);
    }
    rl.close();
}

pedirdatos();

