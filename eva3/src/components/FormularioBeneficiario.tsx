'use client'
import { Beneficiario } from "@/interfaces/Ibeneficiario";
import { useEffect, useState } from "react";

const initialState:Beneficiario = {
  nombre:"",
  edad:0,
  genero:"",
  observaciones:"",
  fIngreso:""
}

const FormularioBeneficiario = () => {

  const[beneficiario, setBeneficiario] = useState(initialState);
  const[beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);

  //estado de los erroes
  const [eNombre, setENombre] = useState("")
  const [eEdad, setEEdad] = useState("")
  const [eGenero, setEGenero] = useState("")
  const [eObservacion, setEObservacion] = useState("")


  const miStorage = window.localStorage

  const handleBeneficiario = (name: string, value: string | number) =>{
    setBeneficiario({
    ...beneficiario,
    [name]: value});

    
  useEffect (()=>{
    let listado = miStorage.getItem("beneficiarios")
    if (listado != null){
      let listados = JSON.parse(listado)
      setBeneficiarios(listados)
    }
  },[])

  //validaciones timepo real
  //largo del nombbre
  if (name === "nombre"){
    if(length < 3){
      setENombre("El nombre debe ser mayor a 3 caractetes")
    }else{setENombre("")}
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
    if(length > 200){
      setEObservacion("Exede el maximo de 200 caracteres")
    }else{
      setEObservacion("")
    }
  }
  
  //no poder seleccionar "seleccionar un genero"
  if(name==="genero"){
    if(value===""|| value === "Seleccionar un Genero"){
      setEGenero("Debe seleccionar un Genero valido")
    }else{
      setEGenero("")
    }
  }}
  
  
  //registrar
  const handleRegistrar = ()=> {
    //validaciones antes de guardarlo en el local storage
  if (beneficiario.nombre.length < 3) {
      setENombre("El nombre debe tener almenos 3 caracteres")
      return
    }

  if(beneficiario.edad <18){
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

  //si todo es valido se guarda en el localstoraage
  miStorage.setItem("beneficiarios",JSON.stringify([...beneficiarios,beneficiario]))
  setBeneficiarios([...beneficiarios, beneficiario])
  setBeneficiario(initialState)
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
        <span style={{color:"red"}}>{eNombre}</span>

        <label>Edad</label><br />
        <input type="number"
        name="edad"
        value={beneficiario.edad}
        placeholder="Ingresar nombre" 
        onChange={(e) => handleBeneficiario(e.currentTarget.name, e.currentTarget.value)}
        /> <br />
        <span style={{color:"red"}}>{eEdad}</span>


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
        <span style={{color:"red"}}>{eGenero}</span>

        <label>ingresar observaciones</label><br />
        <textarea name="observaciones" 
        value={beneficiario.observaciones}
        onChange={(e) => handleBeneficiario(e.currentTarget.name, e.currentTarget.value)}>
        </textarea>
        <br />
        <span style={{color:"red"}}>{eObservacion}</span>


        <label>Ingresar fecha de ingreso</label><br />
        <input type="date" 
        name="fIngreso"
        onChange={(e) => handleBeneficiario(e.currentTarget.name, e.currentTarget.value)}
        /> <br />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default FormularioBeneficiario;
