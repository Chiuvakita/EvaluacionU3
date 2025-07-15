import { db } from "@/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Beneficiario } from "@/interfaces/Ibeneficiario";
const coleccion = "beneficiarios"




//crear
export const crearBeneficiario = async (beneficiario:Beneficiario) =>{
    return await addDoc(collection(db,coleccion),beneficiario)
};

//leer
export const leerBeneficiarioa = async () =>{
    const querySnapshot = await getDocs(collection(db,coleccion))
    return querySnapshot.docs.map(docu=>({id: docu.id,...docu.data()}))
};

//eliminar
export const eliminarBeneficiario = async (id:string) =>{

