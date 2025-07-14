import { Beneficiario } from "@/interfaces/Ibeneficiario"

const colecion = "beneficiarios"

//ingrwesar
export const crearBeneficiario = async (beneficiario:Beneficiario) =>{
    return await addDoc(colecion(db,colecion),beneficiario)
};

//leer
const
