import readline from "node:readline/promises";
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout})
    
    function control(listaDeTareas) 
    {
        if(listaDeTareas.length===0){
           console.log("Todavia no has creado tareas  \n");
            return true; 
        }

    }
    async function pedirDato( mensaje, opcionesValidas, obligatorio) 
    {
        while(true) 
        {
            let entrada = await rl.question(mensaje);
            if (opcionesValidas) 
            {
                entrada = entrada.toUpperCase();
                if (opcionesValidas.includes(entrada)) 
                {
                    return entrada;
                }
                console.log(`Opcion no valida. Ingresa: ${opcionesValidas.join(", ")}.\n`);
            } 
            else 
            {
             if (entrada.trim() !== "" || !obligatorio) 
                {
                  return entrada;
                }
                console.log("Este campo no puede estar vacío.\n");
            }
        }
    }
    async function pedirFecha(mensaje,editar) 
    {
    while (true) 
        {
        const entrada = await rl.question(mensaje);
        if (entrada==="")
        { 
            return ""; // puede ser vacia, porque por defecto colocamos fecha creacion.
        }
        if (entrada.trim() === "" && editar) //espacio entonces vaciamos al editar 
        { 
         return " "; 
        } 
        const regex = /^\d{4}-\d{2}-\d{2}$/;


        if (regex.test(entrada)) 
        {
            return entrada;
        }
        console.log("Formato no valido. Usa el formato AAAA-MM-DD o presione Enter para omitir.\n");
        }
    }
    function resolverEdicion(entrada, valorAnterior) 
    {
      // mantener
        if (entrada === "")
        { 
        return valorAnterior;
        }
        //vaciar:
        if (entrada.trim() === ""){
        return "";
        }          
        return entrada;// valor nuevo
    }
    function mostrarCampo(mensaje,valor) 
    {
        if(esvacio(valor))
        {
            console.log(`${mensaje}: Sin datos \n`);
            return;
        }
        else
        {
        console.log(`${mensaje}: ${valor} \n`);  
        }
    }
    function esvacio(valor)
    {
        if(valor===null || valor===undefined)
        {
         return true;
        }
        if (valor instanceof Date)  //un fecha no se deja vacia y por default se poone la fecha de creacion.
        {  
            return false
        }
        if(typeof valor === "string")
        {
            return valor.trim() === "";  // si es un string y espacio en blanco entonces es vacio.
        }
        // si no cumple que sea nulo o stirng y espacio en blanco entonces es falso.
        return false;
    }

    async function verDetalleTarea(listaDeTareas,indice)
    {
        if (!listaDeTareas[indice-1]) 
        {
            console.log("Tarea no encontrada.\n");
            return;
        }
        console.log("Esta es la tarea que elegiste: \n");
        console.log(`Titulo: ${listaDeTareas[indice-1].titulo} \n`);
        console.log(`Dificultad: ${listaDeTareas[indice-1].dificultad} \n`);
        mostrarCampo("Descripcion", listaDeTareas[indice-1].descripcion);
        console.log(`Estado: ${listaDeTareas[indice-1].estado} \n`);
        mostrarCampo("Fecha de creacion", listaDeTareas[indice-1].fechaCreacion);
        console.log(`Ultima edicion: ${listaDeTareas[indice-1].ultimaEdicion} \n`);
        mostrarCampo("Fecha de vencimiento", listaDeTareas[indice-1].fechaVencimiento);
        console.log("Si deseas editarla presione E o 0 para volver. \n");
        let opcion=await rl.question(">");
        while(opcion!=0 && opcion!="E" && opcion!="e")
        {
            opcion=await rl.question("Ingrese una opcion valida \n");
        }
        if(opcion===0)
        {
         return; 
        }
        console.log(`Estas editando la tarea: ${listaDeTareas[indice-1].titulo}  \n`);
        console.log("-Si deseas mantener los valores de un atributo, simplemente dejalo en blanco (no espacio) \n");
        console.log("-Si deseas dejar en blanco un atributo, escribe un espacio. \n");
        // A los atributos que pueden sar vacios se les agrega a opciones validas un espacio: " ".
        const nuevaDescripcion= await pedirDato( "1. Descripción:\n", null, false);
        const nuevoEstado=await pedirDato( "3. Estado ([P]endiente/[E]n curso/[T]erminada/[C]ancelada) o dejalo en blanco para mantener(no espacio) \n", ["P", "E", "T", "C",""], true);
        const nuevaDificultad = await pedirDato( "3. Dificultad ([1]/[2]/[3]) o dejalo en blanco para mantener(no espacio) \n", ["1", "2", "3",""],true);
        const vencimiento=await pedirFecha("Ingrese fecha de vencimiento (AAAA-MM-DD)\n", true);
        //vaciableS:
        listaDeTareas[indice-1].descripcion= resolverEdicion(nuevaDescripcion,listaDeTareas[indice-1].descripcion);
        listaDeTareas[indice-1].fechaVencimiento = resolverEdicion(vencimiento,listaDeTareas[indice-1].fechaVencimiento);     
        // no vaciables:
        if (nuevoEstado !== "")
        {     
         listaDeTareas[indice-1].estado= nuevoEstado;

        }
        if (nuevaDificultad !== "")
        { 
        listaDeTareas[indice-1].dificultad = Number(nuevaDificultad);
        }
        listaDeTareas[indice-1].ultimaEdicion=new Date();
        console.log("¡Datos guardados!\n");
        await rl.question("Presiona cualquier tecla para continuar ...\n");
            
    }



    async function imprimirtarea(listaDeTareas,condicion,buscar) 
    {
        const tareasFiltradas = [];

        for (let i=0; i<listaDeTareas.length; i++) 
        {
            if(buscar) //Si estamos buscando entonces en la variable buscar se tiene el titulo de la tarea a buscar.
            {
              if(listaDeTareas[i].titulo.toLowerCase().includes(buscar.toLowerCase())) 
                {
                    //añadimos a la tarea filtrada.
                 tareasFiltradas.push(listaDeTareas[i]);
                }
            } 
            else 
            {
                // Si no estamso buscando y estamos viendo todas las tareas ya sea todas(null),Pendiente,En curso, Finalizadas:
              if(listaDeTareas[i].estado===condicion || condicion===undefined) 
                {
                    //añadimso todas las tareas solo que cumpla la condicion o todas.
                    tareasFiltradas.push(listaDeTareas[i]);
                }
            }
        }
        if(tareasFiltradas.length===0) 
        {
         console.log("No hay tareas relacionadas a la busqueda\n");
            return;
        }
        //Si es buscar o imprimir todas las tareas o por condicion cambia el mensaje:
        if(buscar) 
        {
         console.log("Estas son las tareas relacionadas!: \n");
        } 
        else 
        {
         console.log("Estas son todas tus tareas!: \n");
        }

        for (let i=0;i<tareasFiltradas.length;i++) 
        {
            if(listaDeTareas[i] && tareasFiltradas[i].titulo)
            {
            console.log(`${[i+ 1]} ${tareasFiltradas[i].titulo} \n`);
            }
        }

        console.log("¿Deseas ver los detalles de alguna? \n");
        console.log("Introduce el numero de la tarea o 0 para volver \n");
        const entrada = (await rl.question("> ")).trim();
        const indice = Number(entrada);
        if (indice===0 || isNaN(indice) || indice>tareasFiltradas.length) 
        {
         return; //isNaN es true si no es numero auqnue parezca lo contrario. isNaN= Is not a number.
        }
    
        await verDetalleTarea(tareasFiltradas, indice);
    }


    async function verTareas(listaDeTareas)
    {
        if (control(listaDeTareas))
        {
         return;
        }
        console.log("¿Que tareas deseas ver?:\n");
        console.log("[1] Todas \n");
        console.log("[2] Pendientes \n");
        console.log("[3] En curso \n");
        console.log("[4] Terminadas \n");
        console.log("[0] Volver \n");
        let opcion=Number(await rl.question(">"));
        if (opcion === 0)
        { 
        return;
        }

        switch(opcion)
        {
            case 1:
                await imprimirtarea(listaDeTareas);
                break;
            case 2:
                await imprimirtarea(listaDeTareas,"P");
                break;
            case 3:
                await imprimirtarea(listaDeTareas,"E");
                break;
            case 4:
                await imprimirtarea(listaDeTareas,"T");
                break;
                
            default:
                console.log("Ingrese una opcion valida \n");
                break;
        }
    }
    
    async function agregarTarea() 
    {
        console.log("Estas creando una nueva tarea.\n");
        // Si tiene opciones validas y tambien es obligatorio entonces puede ser vacio.
        let titulous=await pedirDato( "1. Título:\n", null, true);
        let descripcionus= await pedirDato("2. Descripción:\n", null, false);
        //Los que no pueden ser vascios y tienen valores por defecto a opciones validas se les coloca "".
        let estadous=await pedirDato( "3. Estado ([P]endiente/[E]n curso/[T]erminada/[C]ancelada):\n", ["P", "E", "T", "C",""], true);
        let vencimiento = await pedirFecha("Ingrese fecha de vencimiento (AAAA-MM-DD) o presione Enter para omitir:\n");
        let dificultadus = await pedirDato( "4. Dificultad ([1]/[2]/[3]):\n", ["1", "2", "3",""],true);
        let fechaCreacionus = await pedirDato("¿Desea agregar fecha de creación? [S]í / [N]o:\n", ["S", "N"], true);
        let ultimaEdicionus = await pedirDato("¿Desea agregar última edición? [S]í / [N]o:\n", ["S", "N"], true);
         // Conclusión de fechas: Si eligió 'S', asigna Date(), de lo contrario null
          let ultimaEdicionFinal,fechaCreacionFinal;
        if(fechaCreacionus === "S")
        { 
          fechaCreacionFinal =new Date();

        } 
        else
        {
            fechaCreacionFinal=null;
        }
        if(ultimaEdicionus === "S")
        { 
          ultimaEdicionFinal =new Date()

        } 
        else
        {
            ultimaEdicionFinal=null;
        }
    
        let nuevaTarea = {
            titulo: titulous,
            descripcion:descripcionus,
            estado: estadous ||"P",
            fechaCreacion: fechaCreacionFinal,
            ultimaEdicion:ultimaEdicionFinal,
            fechaVencimiento: vencimiento,
            dificultad: Number(dificultadus) || 1
        };
        console.log("¡Datos guardados!.\n");
        await rl.question("Presione cualquier tecla para continuar... \n");

        return nuevaTarea;
    }


     
    async function buscarTareas(listaDeTareas)
    {
        if (control(listaDeTareas))
        {
         return;
        }
        let titulo= await rl.question("Ingrese el titulo de la tarea a buscar \n");
        // La condicion es null ya que no estamos imprimiendo todas las tareas o por condicion solo buscamos:
        await imprimirtarea(listaDeTareas,null,titulo);

    }
    async function menu()
    {        
        let salir=false;
        const listaDeTareas=[];
        while(!salir)    
        {
            console.log("¡Hola Olivia!\n");
            console.log("¿Que deseas hacer?:\n");
            console.log("[1] Ver mis Tareas\n");
            console.log("[2] Buscar una Tarea\n");
            console.log("[3] Agregar una Tarea\n");
            console.log("[0] Salir\n");
            let opcion=Number(await rl.question(">"));
            switch(opcion)
            {
            case 1:
                await verTareas(listaDeTareas);
                break;
            case 2:
                await buscarTareas(listaDeTareas);
                break;
            case 3:
                let nuevaTarea=await agregarTarea();
                
                listaDeTareas.push(nuevaTarea);
                break;
            case 0:
                salir=true;
                break; 
                
            default:
                console.log("Ingrese una opcion valida \n");
                break;
            }
            
        }
        rl.close();
    }

menu();

