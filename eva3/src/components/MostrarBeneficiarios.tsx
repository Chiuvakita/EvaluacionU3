'use client'

import { Beneficiario } from "@/interfaces/Ibeneficiario";
import { useEffect, useState } from "react";

interface Props{
    traerBeneficiario: (b: Beneficiario, index: number)=> void
}

const MostrarBeneficiarios = (props: Props)=>{
    const [beneficiarios, setBeneficiarios]=useState<Beneficiario[]>([])

    
    useEffect(()=>{
        const miStorage = window.localStorage
        let listadoStr = miStorage.getItem("beneficiarios")
        if(listadoStr != null){
            let listado = JSON.parse(listadoStr)
            setBeneficiarios(listado)
        }
    },[])

    //eliminar
    const eliminarBeneficiario = (index:number)=>{
        const nuevaLista= beneficiarios.filter((_,i)=>i !== index)
        setBeneficiarios(nuevaLista)
        const miStorage = window.localStorage
        miStorage.setItem("beneficiarios",JSON.stringify(nuevaLista))
    }

    //editar
    const editarBeneficiario = (index:number)=>{
        props.traerBeneficiario(beneficiarios[index],index)
    }

    return(
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Genero</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {beneficiarios.map((b,index)=>(
                    <tr key={index}>
                        <td>{b.nombre}</td>
                        <td>{b.edad}</td>
                        <td>{b.genero}</td>
                        <td>
                            <button onClick={()=> editarBeneficiario(index)}>Editar Beneficiario</button>
                            <button onClick={()=> eliminarBeneficiario(index)}>Eliminiar Beneficiario</button>
                        </td>
                    </tr>
                ))}
            </tbody>


        </table>
    )
}
export default MostrarBeneficiarios;