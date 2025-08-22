import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { type ExpedienteDetailData, type RequisitoData } from '../types/expediente';
import { InformeModal } from '../components/expediente/InformeModal';
import { RequisitosTabs } from '../components/expediente/RequisitosTabs';
import { ActionButtons } from '../components/buttons/ActionButtons';
import { EditRequisitoModal } from '../components/modals/EditRequisitoModal';
import { NormativasModal } from '../components/modals/NormativasModal';
import { type SelectedNormativas } from '../types/normativa';

export const ExpedienteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [expediente, setExpediente] = useState<ExpedienteDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInformeModalOpen, setIsInformeModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditRequisitoModalOpen, setIsEditRequisitoModalOpen] = useState(false);
  const [requisitoToEdit, setRequisitoToEdit] = useState<RequisitoData | null>(null);
  const [isNormativasModalOpen, setIsNormativasModalOpen] = useState(false);

  useEffect(() => {
    const fetchExpediente = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/expediente/${id}`);
        // const data = await response.json();
        
        // Production data
        const mockData: ExpedienteDetailData = {
          nombre_expediente: 'EMC.2025000233',
          tipo_expediente: 'Proceso de inscripción de listas electorales',
          materia: 'Solicitud de inscripción',
          total_requisitos: 47,
          total_requisitos_lista: 11,
          total_requisitos_candidatos: 36,
          requisitos_cumplidos: 47,
          requisitos_faltantes: 0,
          porcentaje_cumplimiento: 100,
          mensaje_alerta: 'Todos los requisitos aplicables han sido cumplidos satisfactoriamente.',
          tipo_resolucion: 'Resolución de Admisibilidad',
          motivo_resolucion: 'Cumple con todos los requisitos esenciales para la inscripción.',
          analisis_resolucion: 'Tras la exhaustiva revisión de la documentación y los requisitos exigidos para la inscripción de la lista de candidatos, se ha determinado que todos los elementos formales y sustantivos han sido **cumplidos** satisfactoriamente. No se ha identificado ningún incumplimiento que afecte la validez de la postulación. Por consiguiente, la lista de candidatos es declarada **ADMISIBLE** para continuar con el proceso electoral, conforme a la normativa aplicable.',
          tabs: [
            {
              id: 'solicitud',
              nombre: 'Solicitud de Inscripción',
              requisitos: [
                {
                  id_estado_requisito: '1848',
                  nombre: 'Alternancia de Género',
                  descripcion: 'Lista debe cumplir con alternancia (hombre y mujer o mujer y hombre).',
                  observacion: 'La lista cumple con la alternancia (intercalado hombre/mujer, aplicado al cuerpo de la lista)',
                  estado: 'CUMPLE',
                  estado_color: 'green',
                  estado_texto: 'Cumple',
                  metodo_validacion: 'Validado por ELECCIA',
                  boton_accion: 'https://mpesije.jne.gob.pe/docs/6b4a0f45-d282-47e0-90c9-0b45e43c25cc.pdf'
                },
                {
                  id_estado_requisito: '1845',
                  nombre: 'Cantidad de Regidores',
                  descripcion: 'Se valida que la lista cumpla con la cantidad de regidores para el ubigeo al que esta postulando.',
                  observacion: 'La lista tiene 5 regidores para PION. Cumple con la cantidad de regidores requerida.',
                  estado: 'CUMPLE',
                  estado_color: 'green',
                  estado_texto: 'Cumple',
                  metodo_validacion: 'Validado por ELECCIA',
                  boton_accion: 'https://mpesije.jne.gob.pe/docs/6b4a0f45-d282-47e0-90c9-0b45e43c25cc.pdf'
                },
                {
                  id_estado_requisito: '1846',
                  nombre: 'Cuota de Género',
                  descripcion: 'Al menos el 50% de los participantes en las listas electorales deben ser hombres o mujeres, si la lista es impar se permitirá máximo la diferencia de 1.',
                  observacion: 'El cuerpo de la lista es impar. Tiene 2 mujeres (40.0%) y 3 hombres (60.0%). Cumple con la diferencia de 1 de cada género.',
                  estado: 'CUMPLE',
                  estado_color: 'green',
                  estado_texto: 'Cumple',
                  metodo_validacion: 'Validado por ELECCIA',
                  boton_accion: 'https://mpesije.jne.gob.pe/docs/6b4a0f45-d282-47e0-90c9-0b45e43c25cc.pdf'
                },
                {
                  id_estado_requisito: '1847',
                  nombre: 'Cuota Joven',
                  descripcion: 'Mínimo 20% de los candidatos entre los 18 y 29 años.',
                  observacion: 'La lista tiene 60.0% de jóvenes (3 de 5 candidatos)',
                  estado: 'CUMPLE',
                  estado_color: 'green',
                  estado_texto: 'Cumple',
                  metodo_validacion: 'Validado por ELECCIA',
                  boton_accion: 'https://mpesije.jne.gob.pe/docs/6b4a0f45-d282-47e0-90c9-0b45e43c25cc.pdf'
                },
                {
                  id_estado_requisito: '1849',
                  nombre: 'Solicitud de Inscripción Firmada',
                  descripcion: 'Documento debe estar firmado por el personero legal.',
                  observacion: 'Documento firmado digitalmente por el personero legal, CORDOVA CAPUCHO ANA MARIA, identificado con DNI 20107161',
                  estado: 'CUMPLE',
                  estado_color: 'green',
                  estado_texto: 'Cumple',
                  metodo_validacion: 'Validado por ELECCIA',
                  boton_accion: 'https://mpesije.jne.gob.pe/docs/6b4a0f45-d282-47e0-90c9-0b45e43c25cc.pdf'
                }
              ]
            },
            {
              id: 'acta_eleccion_interna',
              nombre: 'Acta de Elección Interna',
              requisitos: [
                {
                  id_estado_requisito: '1853',
                  nombre: 'Comite Electoral',
                  descripcion: 'Debe contener Nombres, apellidos, números de DNI y firmas de los miembros del comité electoral (3 miembros) inscritos en el ROP.',
                  observacion: 'Todos los miembros del comité electoral pertenecen al partido político PARTIDO POLITICO NACIONAL PERU LIBRE validados por el ROP',
                  estado: 'CUMPLE',
                  estado_color: 'green',
                  estado_texto: 'Cumple',
                  metodo_validacion: 'Validado por ELECCIA',
                  boton_accion: 'https://mpesije.jne.gob.pe/docs/d0d3a761-9c5f-41b4-9313-3b527039534b.pdf'
                },
                {
                  id_estado_requisito: '1852',
                  nombre: 'Elección Interna Realizada en Plazo Establecido',
                  descripcion: 'Elección interna se realizo dentro del plazo establecido, de acuerdo a la modalidad empleada',
                  observacion: 'Elección interna realizada el 10/05/2025 dentro del plazo de Afiliados, según calendario electoral 10/05/2025.',
                  estado: 'CUMPLE',
                  estado_color: 'green',
                  estado_texto: 'Cumple',
                  metodo_validacion: 'Validado por ELECCIA',
                  boton_accion: 'https://mpesije.jne.gob.pe/docs/d0d3a761-9c5f-41b4-9313-3b527039534b.pdf'
                },
                {
                  id_estado_requisito: '1851',
                  nombre: 'Lista de Candidatos en el Acta',
                  descripcion: 'La lista de candidatos consignada en el acta electoral debe coincidir de forma exacta con la lista de candidatos presentada en la solicitud de inscripción.',
                  observacion: 'La Lista de candidatos coincide en orden de prelación de acuerdo a la ubicación correlativa de cada candidato, cumpliendo con la cantidad de regidores exigidos para el distrito correspondiente.',
                  estado: 'CUMPLE',
                  estado_color: 'green',
                  estado_texto: 'Cumple',
                  metodo_validacion: 'Validado por SECCAJAEMC2025',
                  boton_accion: 'https://mpesije.jne.gob.pe/docs/d0d3a761-9c5f-41b4-9313-3b527039534b.pdf#page=3'
                },
                {
                  id_estado_requisito: '1850',
                  nombre: 'Ubigeo Electoral entre Acta y Solicitud',
                  descripcion: 'El ubigeo electoral para el cual hace referencia el acta es igual al de la solicitud de inscripción',
                  observacion: 'Los ubigeos coinciden, ubigeo en acta: PIÓN, ubigeo de postulación: PION',
                  estado: 'CUMPLE',
                  estado_color: 'green',
                  estado_texto: 'Cumple',
                  metodo_validacion: 'Validado por SECCAJAEMC2025',
                  boton_accion: 'https://mpesije.jne.gob.pe/docs/d0d3a761-9c5f-41b4-9313-3b527039534b.pdf'
                }
              ]
            },
            {
              id: 'hoja_vida_candidatos',
              nombre: 'Hoja de Vida de Candidatos',
              candidatos: [
                {
                  dni: '42106831',
                  nombres: 'MINER',
                  apellidos: 'HERRERA CORONEL',
                  cargo: 'ALCALDE DISTRITAL',
                  cumple: true,
                  requisitos: [
                    {
                      id_estado_requisito: '1876',
                      nombre: 'Comprobante de Pago Adjunto',
                      descripcion: 'Se debe adjuntar comprobante de pago que cumpla con la tasa correspondiente, el cual no debe estar en uso en otro proceso.',
                      observacion: 'Comprobante de pago validado correctamente con la tasa vigente. Código de operación: 048110-8. Voucher válido - No está siendo usado en ningún expediente.',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/9e65dd2c-ec2c-4e79-85db-b230e505da47.pdf'
                    },
                    {
                      id_estado_requisito: '1877',
                      nombre: 'Declaración Jurada de Consentimiento de Participación',
                      descripcion: 'Declaración jurada de consentimiento de participación',
                      observacion: 'Declaración Jurada de consentimiento correctamente validado con firma y huella del candidato MINER HERRERA CORONEL',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/e46e6b70-b440-47c3-8fc3-98ce73aacfd1.pdf'
                    },
                    {
                      id_estado_requisito: '1874',
                      nombre: 'Declaración Jurada de No Deuda por Reparación Civil',
                      descripcion: 'Declaración jurada de no tener deuda de reparación civil',
                      observacion: 'Declaración Jurada de no deuda correctamente validado con firma y huella del candidato MINER HERRERA CORONEL',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/0046439b-9ba4-40f1-abca-ba4889412049.pdf'
                    },
                    {
                      id_estado_requisito: '1875',
                      nombre: 'Fecha de presentación de la Hoja de Vida y Declaraciones Juradas',
                      descripcion: 'La Hoja de Vida deberá presentarse firmada por el personero legal. Las Declaraciones Juradas de Consentimiento y de No Deuda por Reparación Civil deberán presentarse en la misma fecha o después de la Hoja de Vida, no antes.',
                      observacion: 'Declaración Jurada de Consentimiento completado en fecha 10/06/2025 y Declaración Jurada de No deuda completado en fecha 10/06/2025. Ambos completados en fecha igual o posterior a 10/06/2025 de la declaración jurada de Hoja de Vida presentada',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/2f8e9878-4b9a-466b-9e97-0bc1ecd9cbab.pdf'
                    },
                    {
                      id_estado_requisito: '1872',
                      nombre: 'Ubigeo del Candidato',
                      descripcion: 'El domicilio del candidato corresponde al ubigeo al que postula y debe acreditar 2 años de residencia.',
                      observacion: 'El candidato nació en el ubigeo de postulación (PION)',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: ''
                    },
                    {
                      id_estado_requisito: '1873',
                      nombre: 'Verificación ROP',
                      descripcion: 'Se valida si el candidato se encuentra inscrito al ROP',
                      observacion: 'El candidato MINER HERRERA CORONEL está afiliado al partido político PARTIDO POLITICO NACIONAL PERU LIBRE',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: ''
                    }
                  ]
                },
                {
                  dni: '71064993',
                  nombres: 'ANGELA MILENIA',
                  apellidos: 'MESTANZA BACA',
                  cargo: 'REGIDOR DISTRITAL',
                  cumple: true,
                  requisitos: [
                    {
                      id_estado_requisito: '1856',
                      nombre: 'Comprobante de Pago Adjunto',
                      descripcion: 'Se debe adjuntar comprobante de pago que cumpla con la tasa correspondiente, el cual no debe estar en uso en otro proceso.',
                      observacion: 'Comprobante de pago validado correctamente con la tasa vigente. Código de operación: 047759-3. Voucher válido - No está siendo usado en ningún expediente.',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/1e54c850-a9f0-46e3-9fae-d673a429c560.pdf'
                    },
                    {
                      id_estado_requisito: '1858',
                      nombre: 'Declaración Jurada de Consentimiento de Participación',
                      descripcion: 'Declaración jurada de consentimiento de participación',
                      observacion: 'Declaración Jurada de consentimiento correctamente validado con firma y huella del candidato ANGELA MILENIA MESTANZA BACA',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/29d4dfbd-82a2-48dc-832e-78aee2f4727d.pdf'
                    },
                    {
                      id_estado_requisito: '1859',
                      nombre: 'Declaración Jurada de No Deuda por Reparación Civil',
                      descripcion: 'Declaración jurada de no tener deuda de reparación civil',
                      observacion: 'Declaración Jurada de no deuda correctamente validado con firma y huella del candidato ANGELA MILENIA MESTANZA BACA',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/e5d0a38e-0a24-4acd-b664-7d92c53d6283.pdf'
                    },
                    {
                      id_estado_requisito: '1857',
                      nombre: 'Fecha de presentación de la Hoja de Vida y Declaraciones Juradas',
                      descripcion: 'La Hoja de Vida deberá presentarse firmada por el personero legal. Las Declaraciones Juradas de Consentimiento y de No Deuda por Reparación Civil deberán presentarse en la misma fecha o después de la Hoja de Vida, no antes.',
                      observacion: 'Declaración Jurada de Consentimiento completado en fecha 10/06/2025 y Declaración Jurada de No deuda completado en fecha 10/06/2025. Ambos completados en fecha igual o posterior a 10/06/2025 de la declaración jurada de Hoja de Vida presentada',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/c21f3faa-c55b-499c-b30a-2dd555c71f6a.pdf'
                    },
                    {
                      id_estado_requisito: '1854',
                      nombre: 'Ubigeo del Candidato',
                      descripcion: 'El domicilio del candidato corresponde al ubigeo al que postula y debe acreditar 2 años de residencia.',
                      observacion: 'El candidato nació en el ubigeo de postulación (PION)',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: ''
                    },
                    {
                      id_estado_requisito: '1855',
                      nombre: 'Verificación ROP',
                      descripcion: 'Se valida si el candidato se encuentra inscrito al ROP',
                      observacion: 'El candidato ANGELA MILENIA MESTANZA BACA no tiene afiliación a ningún partido político',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: ''
                    }
                  ]
                },
                {
                  dni: '71068498',
                  nombres: 'YOJANI',
                  apellidos: 'PEREZ BOCANEGRA',
                  cargo: 'REGIDOR DISTRITAL',
                  cumple: true,
                  requisitos: [
                    {
                      id_estado_requisito: '1863',
                      nombre: 'Comprobante de Pago Adjunto',
                      descripcion: 'Se debe adjuntar comprobante de pago que cumpla con la tasa correspondiente, el cual no debe estar en uso en otro proceso.',
                      observacion: 'Comprobante de pago validado correctamente con la tasa vigente. Código de operación: 047620-6. Voucher válido - No está siendo usado en ningún expediente.',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/0563a6a8-8631-4cfd-8b40-6565e8091cfc.pdf'
                    },
                    {
                      id_estado_requisito: '1864',
                      nombre: 'Declaración Jurada de Consentimiento de Participación',
                      descripcion: 'Declaración jurada de consentimiento de participación',
                      observacion: 'Declaración Jurada de consentimiento correctamente validado con firma y huella del candidato YOJANI PEREZ BOCANEGRA',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/46b0f045-b48a-4183-99c4-439a1bc5028c.pdf'
                    },
                    {
                      id_estado_requisito: '1865',
                      nombre: 'Declaración Jurada de No Deuda por Reparación Civil',
                      descripcion: 'Declaración jurada de no tener deuda de reparación civil',
                      observacion: 'Declaración Jurada de no deuda correctamente validado con firma y huella del candidato YOJANI PEREZ BOCANEGRA',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/3e72a5a6-9964-4902-9ff2-352b1fbfc06e.pdf'
                    },
                    {
                      id_estado_requisito: '1862',
                      nombre: 'Fecha de presentación de la Hoja de Vida y Declaraciones Juradas',
                      descripcion: 'La Hoja de Vida deberá presentarse firmada por el personero legal. Las Declaraciones Juradas de Consentimiento y de No Deuda por Reparación Civil deberán presentarse en la misma fecha o después de la Hoja de Vida, no antes.',
                      observacion: 'Declaración Jurada de Consentimiento completado en fecha 10/06/2025 y Declaración Jurada de No deuda completado en fecha 10/06/2025. Ambos completados en fecha igual o posterior a 10/06/2025 de la declaración jurada de Hoja de Vida presentada',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/e08d0889-3d24-477d-a007-7364e3021b1d.pdf'
                    },
                    {
                      id_estado_requisito: '1860',
                      nombre: 'Ubigeo del Candidato',
                      descripcion: 'El domicilio del candidato corresponde al ubigeo al que postula y debe acreditar 2 años de residencia.',
                      observacion: 'El candidato nació en el ubigeo de postulación (PION)',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: ''
                    },
                    {
                      id_estado_requisito: '1861',
                      nombre: 'Verificación ROP',
                      descripcion: 'Se valida si el candidato se encuentra inscrito al ROP',
                      observacion: 'El candidato YOJANI PEREZ BOCANEGRA no tiene afiliación a ningún partido político',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: ''
                    }
                  ]
                },
                {
                  dni: '42290106',
                  nombres: 'JORVEL',
                  apellidos: 'GONZALES DIAZ',
                  cargo: 'REGIDOR DISTRITAL',
                  cumple: true,
                  requisitos: [
                    {
                      id_estado_requisito: '1882',
                      nombre: 'Comprobante de Pago Adjunto',
                      descripcion: 'Se debe adjuntar comprobante de pago que cumpla con la tasa correspondiente, el cual no debe estar en uso en otro proceso.',
                      observacion: 'Comprobante de pago validado correctamente con la tasa vigente. Código de operación: 047575-1. Voucher válido - No está siendo usado en ningún expediente.',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/6b233aa9-7e6e-4a16-b113-0c65528da5c5.pdf'
                    },
                    {
                      id_estado_requisito: '1880',
                      nombre: 'Declaración Jurada de Consentimiento de Participación',
                      descripcion: 'Declaración jurada de consentimiento de participación',
                      observacion: 'Declaración Jurada de consentimiento correctamente validado con firma y huella del candidato JORVEL GONZALES DIAZ',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/6fd038fd-461d-465b-9c4b-f37254914ac4.pdf'
                    },
                    {
                      id_estado_requisito: '1881',
                      nombre: 'Declaración Jurada de No Deuda por Reparación Civil',
                      descripcion: 'Declaración jurada de no tener deuda de reparación civil',
                      observacion: 'Declaración Jurada de no deuda correctamente validado con firma y huella del candidato JORVEL GONZALES DIAZ',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/812974fe-a3ba-4056-9c15-165fa14090f8.pdf'
                    },
                    {
                      id_estado_requisito: '1883',
                      nombre: 'Fecha de presentación de la Hoja de Vida y Declaraciones Juradas',
                      descripcion: 'La Hoja de Vida deberá presentarse firmada por el personero legal. Las Declaraciones Juradas de Consentimiento y de No Deuda por Reparación Civil deberán presentarse en la misma fecha o después de la Hoja de Vida, no antes.',
                      observacion: 'Declaración Jurada de Consentimiento completado en fecha 10/06/2025 y Declaración Jurada de No deuda completado en fecha 10/06/2025. Ambos completados en fecha igual o posterior a 10/06/2025 de la declaración jurada de Hoja de Vida presentada',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/9b3c15e3-794b-4602-bf6c-b546ba4b03b2.pdf'
                    },
                    {
                      id_estado_requisito: '1878',
                      nombre: 'Ubigeo del Candidato',
                      descripcion: 'El domicilio del candidato corresponde al ubigeo al que postula y debe acreditar 2 años de residencia.',
                      observacion: 'El candidato nació en el ubigeo de postulación (PION)',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: ''
                    },
                    {
                      id_estado_requisito: '1879',
                      nombre: 'Verificación ROP',
                      descripcion: 'Se valida si el candidato se encuentra inscrito al ROP',
                      observacion: 'El candidato JORVEL GONZALES DIAZ está afiliado al partido político PARTIDO POLITICO NACIONAL PERU LIBRE',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: ''
                    }
                  ]
                },
                {
                  dni: '80546211',
                  nombres: 'SEGUNDO OSWALD',
                  apellidos: 'FERNANDEZ SANCHEZ',
                  cargo: 'REGIDOR DISTRITAL',
                  cumple: true,
                  requisitos: [
                    {
                      id_estado_requisito: '1870',
                      nombre: 'Comprobante de Pago Adjunto',
                      descripcion: 'Se debe adjuntar comprobante de pago que cumpla con la tasa correspondiente, el cual no debe estar en uso en otro proceso.',
                      observacion: 'Comprobante de pago validado correctamente con la tasa vigente. Código de operación: 047861-4. Voucher válido - No está siendo usado en ningún expediente.',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/c300aa30-48db-452c-a08e-6510e01aa256.pdf'
                    },
                    {
                      id_estado_requisito: '1869',
                      nombre: 'Declaración Jurada de Consentimiento de Participación',
                      descripcion: 'Declaración jurada de consentimiento de participación',
                      observacion: 'Declaración Jurada de consentimiento correctamente validado con firma y huella del candidato SEGUNDO OSWALD FERNANDEZ SANCHEZ',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/b159715a-bd02-41bd-bb44-0822db72e808.pdf'
                    },
                    {
                      id_estado_requisito: '1868',
                      nombre: 'Declaración Jurada de No Deuda por Reparación Civil',
                      descripcion: 'Declaración jurada de no tener deuda de reparación civil',
                      observacion: 'Declaración Jurada de no deuda correctamente validado con firma y huella del candidato SEGUNDO OSWALD FERNANDEZ SANCHEZ',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/18e0eb9c-72a0-496a-a407-f2348f287109.pdf'
                    },
                    {
                      id_estado_requisito: '1871',
                      nombre: 'Fecha de presentación de la Hoja de Vida y Declaraciones Juradas',
                      descripcion: 'La Hoja de Vida deberá presentarse firmada por el personero legal. Las Declaraciones Juradas de Consentimiento y de No Deuda por Reparación Civil deberán presentarse en la misma fecha o después de la Hoja de Vida, no antes.',
                      observacion: 'Declaración Jurada de Consentimiento completado en fecha 10/06/2025 y Declaración Jurada de No deuda completado en fecha 10/06/2025. Ambos completados en fecha igual o posterior a 10/06/2025 de la declaración jurada de Hoja de Vida presentada',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/a71a6de8-9876-4e40-9156-714d9606c6f7.pdf'
                    },
                    {
                      id_estado_requisito: '1866',
                      nombre: 'Ubigeo del Candidato',
                      descripcion: 'El domicilio del candidato corresponde al ubigeo al que postula y debe acreditar 2 años de residencia.',
                      observacion: 'El candidato nació en el ubigeo de postulación (PION)',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: ''
                    },
                    {
                      id_estado_requisito: '1867',
                      nombre: 'Verificación ROP',
                      descripcion: 'Se valida si el candidato se encuentra inscrito al ROP',
                      observacion: 'El candidato SEGUNDO OSWALD FERNANDEZ SANCHEZ no tiene afiliación a ningún partido político',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: ''
                    }
                  ]
                },
                {
                  dni: '78113562',
                  nombres: 'ERLAND',
                  apellidos: 'MONTENEGRO GUERRERO',
                  cargo: 'REGIDOR DISTRITAL',
                  cumple: true,
                  requisitos: [
                    {
                      id_estado_requisito: '1889',
                      nombre: 'Comprobante de Pago Adjunto',
                      descripcion: 'Se debe adjuntar comprobante de pago que cumpla con la tasa correspondiente, el cual no debe estar en uso en otro proceso.',
                      observacion: 'Comprobante de pago validado correctamente con la tasa vigente. Código de operación: 047693-1. Voucher válido - No está siendo usado en ningún expediente.',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/3db9ebc1-616f-405e-84d7-e22253f235f8.pdf'
                    },
                    {
                      id_estado_requisito: '1886',
                      nombre: 'Declaración Jurada de Consentimiento de Participación',
                      descripcion: 'Declaración jurada de consentimiento de participación',
                      observacion: 'Declaración Jurada de consentimiento correctamente validado con firma y huella del candidato ERLAND MONTENEGRO GUERRERO',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/f276d8ed-be3d-4e6b-b96c-c4e67c1005db.pdf'
                    },
                    {
                      id_estado_requisito: '1888',
                      nombre: 'Declaración Jurada de No Deuda por Reparación Civil',
                      descripcion: 'Declaración jurada de no tener deuda de reparación civil',
                      observacion: 'Declaración Jurada de no deuda correctamente validado con firma y huella del candidato ERLAND MONTENEGRO GUERRERO',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/abc1382c-13e9-42bc-b410-2901a58af9d9.pdf'
                    },
                    {
                      id_estado_requisito: '1887',
                      nombre: 'Fecha de presentación de la Hoja de Vida y Declaraciones Juradas',
                      descripcion: 'La Hoja de Vida deberá presentarse firmada por el personero legal. Las Declaraciones Juradas de Consentimiento y de No Deuda por Reparación Civil deberán presentarse en la misma fecha o después de la Hoja de Vida, no antes.',
                      observacion: 'Declaración Jurada de Consentimiento completado en fecha 10/06/2025 y Declaración Jurada de No deuda completado en fecha 10/06/2025. Ambos completados en fecha igual o posterior a 10/06/2025 de la declaración jurada de Hoja de Vida presentada',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/f5747f58-8f88-4f0c-a26c-8b5d33dd322c.pdf'
                    },
                    {
                      id_estado_requisito: '1884',
                      nombre: 'Ubigeo del Candidato',
                      descripcion: 'El domicilio del candidato corresponde al ubigeo al que postula y debe acreditar 2 años de residencia.',
                      observacion: 'El candidato nació en el ubigeo de postulación (PION)',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: 'https://mpesije.jne.gob.pe/apidocs/415e8df5-b678-44d2-adfe-1e01fe2c93e3.pdf'
                    },
                    {
                      id_estado_requisito: '1885',
                      nombre: 'Verificación ROP',
                      descripcion: 'Se valida si el candidato se encuentra inscrito al ROP',
                      observacion: 'El candidato ERLAND MONTENEGRO GUERRERO no tiene afiliación a ningún partido político',
                      estado: 'CUMPLE',
                      estado_color: 'green',
                      estado_texto: 'Cumple',
                      metodo_validacion: 'Validado por ELECCIA',
                      boton_accion: ''
                    }
                  ]
                }
              ]
            },
            {
              id: 'plan_gobierno',
              nombre: 'Plan de Gobierno',
              requisitos: [
                {
                  id_estado_requisito: '1890',
                  nombre: 'Concordancia entre Plan de Gobierno y Formato de Resumen',
                  descripcion: 'Se valida que el Plan de Gobierno y el Resumen del Plan de Gobierno tengan concordancia',
                  observacion: 'Coincide con el Plan de Gobierno; no podemos interpretar de manera estricta.',
                  estado: 'CUMPLE',
                  estado_color: 'green',
                  estado_texto: 'Cumple',
                  metodo_validacion: 'Validado por SECCAJAEMC2025',
                  boton_accion: 'https://mpesije.jne.gob.pe/docs/c91b3d71-f3a1-450a-95e4-7c2b74825df1.pdf'
                },
                {
                  id_estado_requisito: '1891',
                  nombre: 'Ubigeo de Plan de Gobierno',
                  descripcion: 'El ubigeo del plan de gobierno concuerda con el ubigeo de postulación.',
                  observacion: 'El plan de gobierno corresponde al ubigeo PION.',
                  estado: 'CUMPLE',
                  estado_color: 'green',
                  estado_texto: 'Cumple',
                  metodo_validacion: 'Validado por ELECCIA',
                  boton_accion: 'https://mpesije.jne.gob.pe/docs/c4bf203e-d9f8-4a6f-9299-508007104af1.pdf'
                }
              ]
            }
          ]
        };
        
        setExpediente(mockData);
      } catch (err) {
        setError('Error al cargar los datos del expediente');
        console.error('Error fetching expediente:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpediente();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-jne-red"></div>
      </div>
    );
  }

  if (error || !expediente) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error || 'Expediente no encontrado'}</span>
      </div>
    );
  }

  const handleEditRequisito = (requisito: RequisitoData) => {
    setRequisitoToEdit(requisito);
    setIsEditRequisitoModalOpen(true);
  };

  const handleEditModeToggle = (newEditMode: boolean) => {
    setEditMode(newEditMode);
    if (!newEditMode) {
      setHasChanges(false);
    }
  };

  const handleSaveChanges = async () => {
    // TODO: Implement save functionality
    console.log('Saving changes...');
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setHasChanges(false);
        resolve();
      }, 1000);
    });
  };

  const handleSaveRequisito = (requisitoId: string, estado: string, observacion: string) => {
    // TODO: Implement save requisito functionality
    console.log('Saving requisito:', { requisitoId, estado, observacion });
    setHasChanges(true);
    setIsEditRequisitoModalOpen(false);
  };

  const handleGenerateResolution = () => {
    // Check for alert requirements first
    const alertRequirements = expediente?.tabs
      .flatMap(tab => tab.requisitos || [])
      .filter(req => req.estado === 'ALERTA').length || 0;

    if (alertRequirements > 0) {
      const confirmWithAlert = window.confirm(
        `Existen ${alertRequirements} requisitos marcados como alerta. ¿Desea continuar con la generación de la resolución?`
      );
      if (!confirmWithAlert) {
        return;
      }
    }

    setIsNormativasModalOpen(true);
  };

  const handleConfirmNormativas = async (selectedNormativas: SelectedNormativas) => {
    try {
      // TODO: Implement actual API call
      console.log('Generating resolution with normativas:', selectedNormativas);
      
      // Simulate API call
      const response = await fetch(`/generar_resolucion?nombre_expediente=${encodeURIComponent(expediente?.nombre_expediente || '')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          normativas: selectedNormativas
        })
      });

      if (response.ok) {
        setIsNormativasModalOpen(false);
        // TODO: Show success toast
        alert('Resolución generada exitosamente');
        // Optionally refresh the page or redirect
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        const error = await response.json();
        throw new Error(error.detail || 'Error al generar la resolución');
      }
    } catch (error) {
      console.error('Error generating resolution:', error);
      alert(`Error al generar la resolución: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  return (
    <>
      {/* Información del Expediente */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Información del Expediente</h3>
            <p className="text-sm text-gray-600">Detalles del expediente analizado</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Analizado
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Número de Expediente</h4>
            <p className="text-lg font-semibold text-gray-800">{expediente.nombre_expediente}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Tipo de Expediente</h4>
            <p className="text-lg font-semibold text-gray-800">{expediente.tipo_expediente}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Materia</h4>
            <p className="text-lg font-semibold text-gray-800">{expediente.materia}</p>
          </div>
        </div>
      </div>

      {/* Resumen de requisitos */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Validación</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <span className="text-3xl font-bold text-blue-700">{expediente.total_requisitos}</span>
            <p className="text-sm text-blue-700 mt-1">Total Requisitos</p>
            <div className="mt-2 flex justify-center space-x-4 text-xs text-blue-600">
              <div className="flex items-center group relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{expediente.total_requisitos_lista}</span>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Requisitos de Lista
                </div>
              </div>
              <div className="flex items-center group relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{expediente.total_requisitos_candidatos}</span>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Requisitos de Candidatos
                </div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <span className="text-3xl font-bold text-green-700">{expediente.requisitos_cumplidos}</span>
            <p className="text-sm text-green-700 mt-1">Requisitos Cumplidos</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <span className="text-3xl font-bold text-red-700">{expediente.requisitos_faltantes}</span>
            <p className="text-sm text-red-700 mt-1">Requisitos Faltantes</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <span className="text-3xl font-bold text-yellow-700">{expediente.porcentaje_cumplimiento}%</span>
            <p className="text-sm text-yellow-700 mt-1">Nivel de Cumplimiento</p>
          </div>
        </div>
        
        {expediente.mensaje_alerta && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Importante:</strong> {expediente.mensaje_alerta}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <div className="flex space-x-4">
            <button 
              type="button" 
              onClick={() => setIsInformeModalOpen(true)}
              className="text-jne-red hover:text-red-700 flex items-center text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Ver informe completo
            </button>
          </div>
        </div>    
      </div>

      {/* Recomendación de Resolución */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto mb-6">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-800">Recomendación de Resolución</h3>
        </div>
        
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-gray-700 text-sm">
                De acuerdo al análisis realizado, se recomienda emitir una 
                <span className="font-bold text-blue-600"> {expediente.tipo_resolucion}</span> 
                para el presente expediente, considerando el cumplimiento de los requisitos establecidos y la normativa aplicable.
              </p>
            </div>
          </div>
          
          <div className="mt-3 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <p className="text-indigo-700 text-sm font-medium">Motivo:</p>
              <p className="text-indigo-600 text-sm mt-1">{expediente.motivo_resolucion}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categorias de requisitos */}
      <RequisitosTabs 
        tabs={expediente.tabs}
        onEditRequisito={handleEditRequisito}
        editMode={editMode}
      />

      {/* Botones de Acción */}
      <ActionButtons
        expedienteId={id || ''}
        onEditModeToggle={handleEditModeToggle}
        onSaveChanges={handleSaveChanges}
        onGenerateResolution={handleGenerateResolution}
        editMode={editMode}
        hasChanges={hasChanges}
      />

      {/* Modal de Informe Completo */}
      <InformeModal
        isOpen={isInformeModalOpen}
        onClose={() => setIsInformeModalOpen(false)}
        expedienteData={expediente}
      />

      {/* Modal de Edición de Requisito */}
      <EditRequisitoModal
        isOpen={isEditRequisitoModalOpen}
        onClose={() => setIsEditRequisitoModalOpen(false)}
        requisito={requisitoToEdit}
        onSave={handleSaveRequisito}
      />

      {/* Modal de Normativas */}
      <NormativasModal
        isOpen={isNormativasModalOpen}
        onClose={() => setIsNormativasModalOpen(false)}
        onConfirm={handleConfirmNormativas}
      />
    </>
  );
};