import readline from "node:readline/promises";
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout})
    
    async function pedirDato(rl, mensaje, opcionesValidas, obligatorio) 
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

    async function verDetalleTarea(listaDeTareas,indice)
    {
        let encontrada=false;
         for(let i=0;i<listaDeTareas.length;i++)
            {
                if(listaDeTareas[i]==indice-1)
                {
                    encontrada=true;
                console.log("Esta es la tarea que elegiste: \n");
                console.log(`Titulo: ${listaDeTareas[i].titulo} \n`);
                console.log(`Descripcion: ${listaDeTareas[i].descripcion} \n`);
                console.log(`Estado: ${listaDeTareas[i].estado} \n`);
                console.log(`Fecha de creacion: ${listaDeTareas[i].fechaCreacion} \n`);
                console.log(`Ultima edicion: ${listaDeTareas[i].ultimaEdicion} \n`);
                console.log(`Fecha de vencimiento: ${listaDeTareas[i].fechaVencimiento} \n`);
                console.log(`Dificultad: ${listaDeTareas[i].dificultad} \n`);
                }
            }
            if(encontrada)
            {
                console.log("Si deseas editarla presione E o 0 para volver. \n");
                let opcion=await rl.question(">");
                while(opcion!=0 && opcion!="E")
                {
                opcion=await rl.question("Ingrese una opcion valida \n");
                }
                if(opcion===0){
                return; 
                }
                console.log(`Estas editando la tarea: ${listaDeTareas[i].titulo}  \n`);
                console.log("-Si deseas mantener los valores de un atributo, simplemente dejalo en blanco \n");
                console.log("-Si deseas dejar en blanco un atributo, escribe un espacio. \n");
                const nuevaDescripcion= await pedirDato(rl, "1. Descripción:\n", null, false);
                const nuevoEstado=await pedirDato(rl, "2. Estado ([P]endiente/[E]n curso/[T]erminada/[C]ancelada):\n", ["P", "E", "T", "C"]);
                const nuevaDificultad = await pedirDato(rl, "3. Dificultad ([1]/[2]/[3]):\n", ["1", "2", "3"]);
                const vencimiento=await rl.question("4. Vencimiento:\n");
                listaDeTareas[indice-1].descripcion=nuevaDescripcion;
                listaDeTareas[indice-1].estado=nuevoEstado;
                listaDeTareas[indice-1].dificultad=nuevaDificultad
                listaDeTareas[indice-1].fechaVencimiento=vencimiento;
                console.log("¡Datos guardados!\n");
                console.log("Presiona cualquier tecla para continuar ...\n");
            }
    }
    async function imprimirtarea(listaDeTareas,condicion,buscar) 
    {
        const tareasFiltradas = [];

        for (let i=0; i<listaDeTareas.length; i++) 
        {
            if(buscar) 
            {
              if(listaDeTareas[i].titulo.toLowerCase().includes(buscar.toLowerCase())) 
                {
                 tareasFiltradas.push(listaDeTareas[i]);
                }
            } 
            else 
            {
              if(listaDeTareas[i].estado===condicion || condicion===undefined) 
                {
                    tareasFiltradas.push(listaDeTareas[i]);
                }
            }
        }
        if(tareasFiltradas.length===0) 
        {
         console.log("No hay tareas relacionadas a la busqueda\n");
            return;
        }
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
          console.log(`${i+ 1} ${tareasFiltradas[i].tarea.titulo} \n`);
        }

        console.log("¿Deseas ver los detalles de alguna? \n");
        console.log("Introduce el numero de la tarea o 0 para volver \n");
        const indice = Number(await rl.question(">"));

        if (indice===0 || isNaN(indice) || indice>listaDeTareas.length) 
        {
         return;
        }
        verDetalleTarea(listaDeTareas, indice);
    }
    async function verTareas(listaDeTareas)
    {
        console.log("¿Que tareas deseas ver?:\n");
        console.log("[1] Todas \n");
        console.log("[2] Pendientes \n");
        console.log("[3] En curso \n");
        console.log("[4] Terminadas \n");
        console.log("[0] Volver \n");
        const opcion=Number(await rl.question(">"));
        if (opcion === 0) return;

        switch(opcion)
        {
            case 1:
            imprimirtarea(listaDeTareas);
                break;
            case 2:
                imprimirtarea(listaDeTareas,"P");
                break;
            case 3:
                imprimirtarea(listaDeTareas,"E");
                break;
            case 4:
                imprimirtarea(listaDeTareas,"T");
                break;
                
            default:
                console.log("Ingrese una opcion valida \n");
                break;
        }
    }
    
    async function agregarTarea() 
    {
        console.log("Estas creando una nueva tarea.\n");
        const titulous=await pedirDato(rl, "1. Título:\n", null, true);
        const descripcionus= await pedirDato(rl, "2. Descripción:\n", null, false);
        const estadous=await pedirDato(rl, "3. Estado ([P]endiente/[E]n curso/[T]erminada/[C]ancelada):\n", ["P", "E", "T", "C"]);
        const vencimiento = await rl.question("Ingrese fecha de vencimiento (AAAA-MM-DD) o presione Enter para omitir:\n");
        const dificultadus = await pedirDato(rl, "4. Dificultad ([1]/[2]/[3]):\n", ["1", "2", "3"]);
        const nuevaTarea = {
            titulo: titulous,
            descripcion:descripcionus,
            estado: estadous ||"pendiente",
            fechaCreacion: new Date(),
            ultimaEdicion:new Date(),
            fechaVencimiento: vencimiento.trim() ? new Date(vencimientoInput) : null,
            dificultad: Number(dificultadus) || 1
        };
        console.log("¡Datos guardados!.\n");
        let tecla=await rl.question("Presione cualquier tecla para continuar... \n");

        return nuevaTarea;
    }
    async function buscarTareas(listaDeTareas)
    {
        console.log("Ingrese el titulo de la tarea a buscar \n ");
        let titulo= await rl.question(">");
        imprimirtarea(listaDeTareas,null,titulo);

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
                verTareas(listaDeTareas);
                break;
            case 2:
                buscarTareas(listaDeTareas);
                break;
            case 3:
                nuevaTarea=agregarTarea();
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

