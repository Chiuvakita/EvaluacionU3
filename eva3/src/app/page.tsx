'use client'
import { useEffect, useState } from "react";
import FormularioBeneficiario from "../components/FormularioBeneficiario";
import { Beneficiario } from "@/interfaces/Ibeneficiario";
import MostrarBeneficiarios from "@/components/MostrarBeneficiarios";



export default function Home() {
  const[beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([])
  const[beneficiarioEditar,setBeneficiarioEditar] = useState<Beneficiario | null>(null)
  const[indiceEditar,setIndiceEditar] = useState<number | null>(null)

  useEffect(()=> {
    const miStorage = window.localStorage
    let listado = miStorage.getItem("beneficiarios")
    if(listado) setBeneficiarios(JSON.parse(listado))
  },[])

  const traerBeneficiario=(b:Beneficiario, index:number)=>{
    setBeneficiarioEditar(b)
    setIndiceEditar(index)
  }
  const limpiarEdicion= ()=>{
    setBeneficiarioEditar(null)
    setIndiceEditar(null)
  }

  return (
  <div>
    <h1>Formulario Beneficiarios</h1>
    <FormularioBeneficiario
    beneficiarios={beneficiarios}
    setBeneficiarios={setBeneficiarios}
    beneficiarioEditar={beneficiarioEditar}
    indiceEditar={indiceEditar}
    limpiarEdicion={limpiarEdicion}
    />
    <MostrarBeneficiarios
    beneficiarios={beneficiarios}
    setBeneficiarios={setBeneficiarios}
    traerBeneficiario={traerBeneficiario}
    />
    <h1>Prueba de nueva rama</h1>
  </div>
  
  );
}

