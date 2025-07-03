const FormularioBeneficiario = () => {
  return (
    <div>
      <form>
        <label>Nombre</label><br />
        <input type="text"
        name="" 
        placeholder="Ingresar nombre"  
        /> <br />
        <span></span>

        <label>Edad</label><br />
        <input type="number"
        name="" 
        placeholder="Ingresar nombre" 
        /> <br />
        <span></span>

        <label>Genero</label><br />
        <select
        name="genero"
        value=""
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
        value="">
        </textarea>
        <br />
        <span></span>

        <label>Ingresar fecha de ingreso</label><br />
        <input type="date" 
        name="fechaIngreso"
        value=""
        />

      </form>
    </div>
  );
};
export default FormularioBeneficiario;
