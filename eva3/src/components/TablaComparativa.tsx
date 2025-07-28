'use client'
import { borrarTodos, crearBeneficiario, leerBeneficiarios } from "@/app/firebase/FirebaseBeneficiarios";
import { Beneficiario } from "@/interfaces/Ibeneficiario";
import { Alef } from "next/font/google";
import { useEffect, useState } from "react";

interface Props{
    setBeneficiarios:(nuevaLista:Beneficiario[])=>void
}

const TablaComparativa=({setBeneficiarios}:Props)=>{
    const [listaFirebase, setListaFirebase] = useState<Beneficiario[]>([])
    const [carganod, setCargando] = useState(false)

    //llevar los datos hacia firebase
    const cargarFirebase = async ()=>{
        setCargando(true)
        try{
            const datos = await leerBeneficiarios()
            setListaFirebase(datos)
        }catch(e){setListaFirebase([])}
        setCargando(false)
    }

    useEffect(()=>{
        cargarFirebase()
    },[])

    //pasar del local a la bd de firebase
    const migrarLocalAFire = async()=>{
        if(!navigator.onLine) {
            alert("No hay conexion a internet")
            return}
        
        setCargando(true)
        //leer lcoal
        const datosLocal= localStorage.getItem("beneficiarios")
        const listaLocal: Beneficiario[] = datosLocal ? JSON.parse(datosLocal):[]
        for(const item of listaLocal){
            if(!item.id){
                const docRef = await crearBeneficiario(item)
                item.id = docRef.id
            }
        }
        await cargarFirebase()
        alert("Migracion a firebase realizada!!!")
        setCargando(false)
    }
    //borrar los beneficiarios de la bd
    const borrarTodosDatos = async ()=>{
        if(!window.confirm("Estas borrando todo, estas seguro?"))
            return
        await borrarTodos()
        setListaFirebase([])
        setBeneficiarios([])
        alert("Todo se ha elimiado con exito!")
    }

    //pasar lo de firebase al localstorage
    const traerFirebase = async ()=>{
        setCargando(true)
        const datos = await leerBeneficiarios()
            setListaFirebase(datos)
            localStorage.setItem("beneficiarios", JSON.stringify(datos))
            setBeneficiarios(datos)
            setCargando(false)
            alert("Actualizando lo de firebase al localstorage")
        
    }

    return(
        <div style={{
            borderRadius:8,
            backgroundColor: "#c5642cff"
        }}>
        
        <h3>Datos De Firebase</h3>
        <div>
            <button onClick={migrarLocalAFire} disabled={carganod}>Subir Local a Firebase</button>
            <button onClick={borrarTodosDatos} disabled={carganod} style={{backgroundColor:"red"}}>BORRAR TODO</button>
            <button onClick={traerFirebase} disabled={carganod}>Actualizar desde Firebase</button>
        </div>
        <div>
            <h4>Firebase</h4>
            <div style={{backgroundColor:"#201463ff", borderRadius:10}}>
                <pre>{JSON.stringify(listaFirebase,null,2)}</pre>
            </div>
        </div>
        </div>
    )
    
}

export default TablaComparativa