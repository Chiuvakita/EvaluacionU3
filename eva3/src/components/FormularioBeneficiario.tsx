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

  const handleBeneficiario = (name: string, value: string | number) =>{
    setBeneficiario({
    ...beneficiario,
    [name]: value});
    
  };
  
  return (
    <div>
      <form>
        <label>Nombre</label><br />
        <input type="text"
        placeholder="Ingresar nombre"
        onChange={(e) => handleBeneficiario(e.currentTarget.name, e.currentTarget.value)}  
        /> <br />
        <span></span>

        <label>Edad</label><br />
        <input type="number"
        placeholder="Ingresar nombre" 
        onChange={(e) => handleBeneficiario(e.currentTarget.name, e.currentTarget.value)}
        /> <br />
        <span></span>

        <label>Genero</label><br />
        <select
        name="genero"
        onChange={(e) => handleBeneficiario(e.currentTarget.name, e.currentTarget.value)}
        >
          <option value="">Seleccionar Genero</option>

          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
          <option value="Otro">Otro</option>
        </select>     
        <br />
        <span></span>

        <label>ingresar observaciones</label><br />
        <textarea name="observacion" 
        onChange={(e) => handleBeneficiario(e.currentTarget.name, e.currentTarget.value)}>
        </textarea>
        <br />
        <span></span>

        <label>Ingresar fecha de ingreso</label><br />
        <input type="date" 
        name="fechaIngreso"
        onChange={(e) => handleBeneficiario(e.currentTarget.name, e.currentTarget.value)}
        /> <br />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};
export default FormularioBeneficiario;
