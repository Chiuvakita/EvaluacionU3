import { db } from "@/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Beneficiario } from "@/interfaces/Ibeneficiario";
const coleccion = "beneficiarios"




//crear
export const crearBeneficiario = async (beneficiario:Beneficiario) =>{
    return await addDoc(collection(db,coleccion),beneficiario)
};

//leer
export const leerBeneficiarios = async () =>{
    const querySnapshot = await getDocs(collection(db,coleccion))
    return querySnapshot.docs.map(docu=>({id: docu.id,...docu.data()}))
};

//eliminar
export const eliminarBeneficiario = async (id:string) =>{

    return await deleteDoc(doc(db,coleccion, id))
};

//ediatr
export const editarBeneficiario = async(id:string, datos:Beneficiario)=>{
    const{id: _,...datosSinId}=datos
    return await updateDoc(doc(db,coleccion,id),{...datosSinId})
}
//borrar todos
export const borrarTodos = async()=>{
    const querySnapshot = await getDocs(collection(db,coleccion))
    for (const docu of querySnapshot.docs){
        await deleteDoc(doc(db,coleccion,docu.id))
    }
}
