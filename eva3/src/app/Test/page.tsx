'use client'
import { useEffect } from "react";
import { crearBeneficiario, leerBeneficiarios } from "@/app/firebase/FirebaseBeneficiarios";

export default function TestFirebase() {
  useEffect(() => {
    const prueba = async () => {
      // Agregar beneficiario
      await crearBeneficiario({
        nombre: "cristobal",
        edad: 24,
        genero: "Hombre",
        observaciones: "pruebaXd",
        fIngreso: "09-01-2001"
      });

      // Leer beneficiario
      const lista = await leerBeneficiarios();
      console.log("Firebase:", lista);

      
      alert("Test completasdo");
    };
    prueba();
  }, []);

  return (
    <div>
      <h3>Prueba de conexion a firebase.</h3>
      <p>(revisar consola)</p>
    </div>
  );
}
