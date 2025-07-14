'use client'
import { Beneficiario } from "@/interfaces/Ibeneficiario";
import { useEffect, useState } from "react";

interface Props {
  beneficiarios:Beneficiario[],
  setBeneficiarios:(b:Beneficiario[])=>void
  beneficiarioEditar:Beneficiario|null
  indiceEditar:number|null
  limpiarEdicion:() =>void
}

const initialState:Beneficiario = {
  nombre:"",
  edad:"",
  genero:"",
  observaciones:"",
  fIngreso:""
}

const FormularioBeneficiario = (props:Props) => {
  const [beneficiario,setBeneficiario] = useState(initialState)


  //estado de los erroes
  const [eNombre, setENombre] = useState("")
  const [eEdad, setEEdad] = useState("")
  const [eGenero, setEGenero] = useState("")
  const [eObservacion, setEObservacion] = useState("")

  useEffect(()=>{
    if(props.beneficiarioEditar !== null){
      setBeneficiario(props.beneficiarioEditar)
    }
  },[props.beneficiarioEditar])


  const handleBeneficiario = (name: string, value: string | number) =>{
    setBeneficiario({
    ...beneficiario,
    [name]: value});
      //validaciones timepo real
      //largo del nombbre
    if (name === "nombre") {
      if (value.toString().length < 3) {
        setENombre("El nombre debe ser mayor a 3 caracteres")
      } else { setENombre("") }

      }

      //edad mayor 18
      if(name==="edad"){
        if(Number(value) < 18){
          setEEdad("La edad debe ser mayor a 18 años")}
          else{
            setEEdad("")
          }
        }

      //limitar observacion a no mas de 200 caracteres
      if(name==="observaciones"){
      if (value.toString().length > 200) {
        setEObservacion("Exede el limite de 200 caracteres")
      }

      }
      
      //no poder seleccionar "seleccionar un genero"
      if(name==="genero"){
        if(value===""|| value === "Seleccionar un Genero"){
          setEGenero("Debe seleccionar un Genero valido")
        }else{
          setEGenero("")
        }
      }
  
    }
  //registrar
  const handleRegistrar = ()=> {
    //validaciones antes de guardarlo en el local storage
  if (beneficiario.nombre.length < 3) {
      setENombre("El nombre debe tener almenos 3 caracteres")
      return
    }

  if(Number(beneficiario.edad) <18|| beneficiario.edad === ""){
    setEEdad("La edad debe ser mayor a 18 años")
    return
  }

  if(beneficiario.observaciones.length>200){
    setEObservacion("Exede el maximo de 200 caracteres")
    return
  }

  if(beneficiario.genero === ""||
    beneficiario.genero ==="Seleccionar Genero"
  ){setEGenero("Debe seleccionar ser un genero Valido")
    return
  }

  //creacion de lista para poder guardar
  let nuevaLista
  if(props.indiceEditar !== null){
    nuevaLista = props.beneficiarios.map((b,i)=> 
      i === props.indiceEditar ? beneficiario : b)}
      else{
        nuevaLista = [...props.beneficiarios,beneficiario]
      }
  props.setBeneficiarios(nuevaLista)
  window.localStorage.setItem("beneficiarios",JSON.stringify(nuevaLista))

  setBeneficiario(initialState)
  props.limpiarEdicion()
  setENombre("")
  setEEdad("")
  setEGenero("")
  setEObservacion("")

  }


    
  

  
  return (
    <div>
      <form onSubmit={(e) => {e.preventDefault(); handleRegistrar();}}>
        <label>Nombre</label><br />
        <input type="text"
        name="nombre"
        value={beneficiario.nombre}
        placeholder="Ingresar nombre"
        onChange={(e) => handleBeneficiario(e.currentTarget.name, e.currentTarget.value)}  
        /> <br />
        <span style={{color:"red"}}>{eNombre}</span><br />

        <label>Edad</label><br />
        <input type="number"
        name="edad"
        value={beneficiario.edad}
        placeholder="Ingresar edad" 
        onChange={(e) => handleBeneficiario(e.currentTarget.name, Number(e.currentTarget.value))}
        /> <br />
        <span style={{color:"red"}}>{eEdad}</span><br />


        <label>Genero</label><br />
        <select
        name="genero"
        value={beneficiario.genero}
        onChange={(e) => handleBeneficiario(e.currentTarget.name, e.currentTarget.value)}
        >
          <option value="">Seleccionar Genero</option>

          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
          <option value="Otro">Otro</option>
        </select>     
        <br />
        <span style={{color:"red"}}>{eGenero}</span><br />

        <label>ingresar observaciones</label><br />
        <textarea name="observaciones" 
        value={beneficiario.observaciones}
        onChange={(e) => handleBeneficiario(e.currentTarget.name, e.currentTarget.value)}>
        </textarea>
        <br />
        <span style={{color:"red"}}>{eObservacion}</span><br />


        <label>Ingresar fecha de ingreso</label><br />
        <input type="date" 
        name="fIngreso"
        value={beneficiario.fIngreso}
        onChange={(e) => handleBeneficiario(e.currentTarget.name, e.currentTarget.value)}
        /> <br /><br />

        <button type="submit">Registrar</button>
      </form>
      
      {props.indiceEditar !== null && (
      <div style={{ color: "orange", marginTop: 12 }}>
        Estás editando: {beneficiario.nombre}
      </div>
      )}
    </div>
  
  );

};

export default FormularioBeneficiario;
