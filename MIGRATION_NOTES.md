# 📋 Notas de Migración - Eliminación de parametros.temp.ts

## ✅ Migración Completada

Se ha completado la migración de datos hardcodeados a endpoints dinámicos del backend.

---

## 🗑️ Elementos de `parametros.temp.ts` que YA NO SE USAN

### **1. CATEGORIAS_REQUISITO** ❌
```typescript
// ANTES (hardcoded):
export const CATEGORIAS_REQUISITO: SelectOption[] = [
  { value: 'solicitud_inscripcion', label: 'Solicitud de Inscripción' },
  // ...
];
```

**AHORA:** Se obtiene dinámicamente desde `GET /plataforma/tipos_requisito`

### **2. ID_MAPPINGS.CATEGORIAS_REQUISITO** ❌
```typescript
// ANTES (hardcoded):
CATEGORIAS_REQUISITO: {
  'solicitud_inscripcion': 1,
  'acta_eleccion_interna': 2,
  // ...
}
```

**AHORA:** El ID se almacena directamente como string en `categoriaRequisito` y se convierte con `parseInt()`

### **3. PARAMETROS_MOCK** ❌
```typescript
// ANTES (hardcoded):
export const PARAMETROS_MOCK: Record<string, ParametroEvaluacion> = {
  'acta_plazo': { ... },
  // ...
};
```

**AHORA:** Todos los parámetros vienen desde `GET /plataforma/consulta_parametros`

### **4. Función mapTipoRequisitoToCategory()** ❌
```typescript
// ANTES (en parametrosService.ts):
private mapTipoRequisitoToCategory(tipoRequisito: number): string {
  switch (tipoRequisito) {
    case 1: return 'solicitud_inscripcion';
    // ...
  }
}
```

**AHORA:** Se usa el ID directamente: `param.tipo_requisito.toString()`

### **5. Función updateConfiguracionContexto()** ❌
```typescript
// ANTES (en parametros.temp.ts):
export const updateConfiguracionContexto = (contexto, parametrosValues) => { ... }
```

**AHORA:** No se necesita, los datos se guardan directamente al backend

---

## 🔄 Nuevos Endpoints Creados

### **Backend**

1. **`GET /plataforma/tipos_requisito`**
   - Retorna todos los tipos/categorías de requisito desde la BD
   - Tabla: `ELECCIA.ELECCIA_TRF_TIPO_REQUISITO`
   - Response:
   ```json
   {
     "message": "Tipos de requisito obtenidos exitosamente",
     "total": 8,
     "tipos_requisito": [
       {
         "id_tipo_requisito": 1,
         "nombre_tipo_requisito": "Solicitud de Inscripción",
         "descripcion": "..."
       }
     ]
   }
   ```

### **Frontend**

1. **`parametrosService.getTiposRequisito()`**
   - Obtiene los tipos de requisito del backend
   - Retorna: `TipoRequisitoOption[]`

---

## 📁 Archivos Creados

### Backend:
- ✅ `src/infrastructure/database/oracle/repositories/tipo_requisito_repository.py`
- ✅ `src/application/services/plataforma/tipo_requisito_service.py`
- ✅ Agregada query `Consulta_Tipos_Requisito` en `db_scripts.py`
- ✅ Agregado endpoint en `src/adapters/plataforma_routes.py`

### Frontend:
- ✅ Actualizado `src/services/parametrosService.ts`
  - Nueva interface `TipoRequisitoOption`
  - Nuevo método `getTiposRequisito()`
  - Removida función `mapTipoRequisitoToCategory()`
- ✅ Actualizado `src/pages/ParametrosRequisitos.tsx`
  - Nuevo state `tiposRequisito`
  - Carga paralela de parámetros y tipos
  - Dropdown de categoría usa datos dinámicos

---

## 🎯 Elementos de `parametros.temp.ts` que AÚN SE USAN

### **Constantes de UI (se pueden conservar temporalmente)**
```typescript
// Estos TODAVÍA se usan en otros lugares:
export const ID_MAPPINGS = {
  ANOS: { ... },
  TIPOS_PROCESO: { ... },
  TIPOS_ELECCION: { ... },
  TIPOS_EXPEDIENTE: { ... },
  TIPOS_MATERIA: { ... },
  REQUISITOS: { ... }
}
```

**NOTA:** Estas constantes se usan en `ParametrosRequisitos.tsx` y eventualmente deberían migrar también.

---

## 🚀 Próximos Pasos (Opcional)

1. **Migrar ID_MAPPINGS restantes:** Crear endpoints para obtener los IDs dinámicamente
2. **Eliminar parametros.temp.ts completamente:** Una vez que todas las constantes se migren
3. **Limpiar código legacy:** Remover comentarios y código en desuso

---

## ✅ Ventajas de la Migración

- ✅ **Single Source of Truth:** La BD es la única fuente de verdad
- ✅ **No más desincronización:** Los cambios en BD se reflejan automáticamente
- ✅ **Escalabilidad:** Nuevos tipos de requisito se agregan sin cambiar código
- ✅ **Mantenibilidad:** Menos código hardcoded, más fácil de mantener

---

## 🔍 Testing

Para probar los cambios:

1. **Backend:** Verificar endpoint
   ```bash
   curl http://localhost:8000/plataforma/tipos_requisito
   ```

2. **Frontend:** Verificar que el dropdown de "Categoría del requisito" muestre los datos dinámicos

3. **Integración:** Guardar parámetros y verificar que el `TIPO_REQUISITO` sea el ID correcto

---

**Fecha de migración:** 27 de octubre de 2025  
**Estado:** ✅ Completada exitosamente
