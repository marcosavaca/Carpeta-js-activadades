
import readline from "node:readline/promises";
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout})
async function pedirdatos()
{
    const operando = await rl.question("\nIngrese la operación (suma, resta, multiplicacion, division) :) \n");

    const entradastring=await rl.question("Ingrese todos los operandores seperados por , ejemplo: 10,5,2 \n");
    const numerostring=entradastring.split(",");
    for(let i=0;i<numerostring.length;i++)
    {
    numerostring[i]=Number(numerostring[i].trim());
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
        for(let i=1;i<numerostring.length;i++)
        {
        if(numerostring[i]!=0)
        {
            resultado=resultado/numerostring[i];
        }
        else
        {
        console.log("No se puede dividir por 0!");
        break;  
        }
        }
        break; 
         
    default:
        resultado="Ingrese una opcion valida, Intente de nuevo \n";
        break;
    }
    console.log(`El resultado es: ${resultado}`);
    rl.close();
}

pedirdatos();

