export const datos = [
  /************* MODULO 1 *************/
  // saludos
  { id: 1, name: 'Hola', icon: ['/imagenes/HOLA.jpg'], categoria:'saludos' },
  { id: 2, name: 'Chau', icon: ['/imagenes/CHAU.jpg'], categoria:'saludos' },
  { id: 3, name: 'Permiso', icon: ['/imagenes/PERMISO.jpg'], categoria:'saludos' },
  { id: 4, name: 'Buenos dias', icon: ['/imagenes/BUENOS_DIAS_A.jpg', '/imagenes/BUENOS_DIAS_B.jpg'], categoria:'saludos' },
  { id: 5, name: 'Buenas tardes', icon: ['/imagenes/BUENAS_TARDES_A.jpg','/imagenes/BUENAS_TARDES_B.jpg'], categoria:'saludos' },
  { id: 6, name: 'Gracias', icon: ['/imagenes/GRACIAS.jpg'], categoria:'saludos' },
  { id: 7, name: 'Buenas noches', icon: ['/imagenes/BUENAS_NOCHES_A.jpg','/imagenes/BUENAS_NOCHES_B.jpg'], categoria:'saludos' },
  { id: 8, name: 'Por favor', icon: ['/imagenes/POR_FAVOR.jpg'], categoria:'saludos' },
  { id: 9, name: 'Como estas', icon: ['/imagenes/COMO_ESTAS_A.jpg','/imagenes/COMO_ESTAS_B.jpg'], categoria:'saludos' },
  { id: 10, name: 'Estoy bien', icon: ['/imagenes/ESTOY_BIEN.jpg'], categoria:'saludos' },
  { id: 11, name: 'Puedo', icon: ['/imagenes/PUEDO.jpg'], categoria:'saludos' },
  { id: 12, name: 'No puedo', icon: ['/imagenes/NO_PUEDO.jpg'], categoria:'saludos' },
  { id: 13, name: 'Mal', icon: ['/imagenes/MAL.jpg'], categoria:'saludos' },
  { id: 14, name: 'Mas o menos', icon: ['/imagenes/MAS_O_MENOS.jpg'], categoria:'saludos' },
  { id: 15, name: 'Nombre', icon: ['/imagenes/NOMBRE.jpg'], categoria:'saludos' },
  { id: 16, name: 'Si', icon: ['/imagenes/SI.jpg'], categoria:'saludos' },
  { id: 17, name: 'No', icon: ['/imagenes/NO.jpg'], categoria:'saludos' },
  { id: 18, name: 'Lo siento', icon: ['/imagenes/LO_SIENTO.jpg'], categoria:'saludos' },
  { id: 19, name: 'Te amo', icon: ['/imagenes/TE_AMO_A.jpg','/imagenes/TE_AMO_B.jpg'], categoria:'saludos' },
];
// Función de búsqueda
export function buscarDatosPorCategoria(categoria) {
  return datos.filter(dato => dato.categoria === categoria);
}
