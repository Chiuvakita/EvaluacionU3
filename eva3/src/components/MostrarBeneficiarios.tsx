'use client'

import { Beneficiario } from "@/interfaces/Ibeneficiario";
import { eliminarBeneficiariofire } from "@/app/firebase/FirebaseBeneficiarios";

interface Props{
    beneficiarios:Beneficiario[],
    setBeneficiarios:(b:Beneficiario[])=>void
    traerBeneficiario: (b: Beneficiario, index: number)=> void
}

const MostrarBeneficiarios = (props: Props)=>{
    //eliminar
    const eliminarBeneficiariof = async (index:number)=>{
        if(!window.confirm("seguro que deseas eliminar?")) return
        const item = props.beneficiarios[index];
        if(item.id){
            await eliminarBeneficiariofire(item.id);
        }
        const nuevaLista= props.beneficiarios.filter((_,i)=>i !== index)
        props.setBeneficiarios(nuevaLista)
        window.localStorage.setItem("beneficiarios", JSON.stringify(nuevaLista))
        alert("Beneficiario eliminado correctamente")
    }

    //editar
    const editarBeneficiario = (index:number)=>{
        if(props.traerBeneficiario){
        props.traerBeneficiario(props.beneficiarios[index],index)
    }
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
                {props.beneficiarios.map((b,index)=>(
                    <tr key={index}>
                        <td>{b.nombre}</td>
                        <td>{b.edad}</td>
                        <td>{b.genero}</td>
                        <td>
                            <button onClick={()=> editarBeneficiario(index)}>Editar Beneficiario</button>
                            <button onClick={()=> eliminarBeneficiariof(index)}>Eliminiar Beneficiario</button>
                        </td>
                    </tr>
                ))}
            </tbody>


        </table>
    )
}
export default MostrarBeneficiarios;