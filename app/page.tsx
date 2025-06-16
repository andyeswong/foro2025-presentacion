"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import TitleSlide from "@/components/slides/title-slide"
import ContentSlide from "@/components/slides/content-slide"
import ScrollSlide from "@/components/slides/scroll-slide"
import ComparisonSlide from "@/components/slides/comparison-slide"
import WorkflowSlide from "@/components/slides/workflow-slide"



// Import the presentation data directly
const presentationData = {
  presentation: {
    title: "Foro de tecnologia 2025",
    description: "conferencia para foro de tecnologia 2025",
    theme: "gradient",
    is_public: true,
    slides: [
      {
        title: "Intro",
        content: {
          title: "Bienvenidos",
          subtitle: "Inteligencia artificial: Del hype a la solucion practica",
        },
        type: "title",
        order: 0,
        template: "title",
        settings: null,
      },
      {
        title: "Presentador",
        content: {
          title: "Andres Gonzalez Wong",
          subtitle: "Ing. Desarrollo de Software",
        },
        type: "title",
        order: 1,
        template: "title",
        settings: null,
      },

      {
        title: "Conceptos Fundamentales",
        content: {
          containerTitle: "Conceptos Fundamentales de IA",
          subtitle: "LLM • Lenguaje Natural • Prompt • Contexto • Historial",
          sections: [
            {
              title: "LLM (Large Language Model)",
              content: "• **Modelo de Lenguaje Grande** entrenado con billones de parámetros\n• **Predicción de tokens**: Siguiente palabra más probable\n• **Arquitectura Transformer** con mecanismo de atención\n• Genera **texto coherente** y contextual",
              useMarkdown: true,
            },
            {
              title: "Lenguaje Natural",
              content: "• **Comunicación humana** con palabras, gramática y contexto\n• Las máquinas necesitan **reglas explícitas**\n• Debes ser **preciso y claro** (como hablar con un turista)\n• Evitar **modismos o jerga**",
              useMarkdown: true,
            },
            {
              title: "Prompt",
              content: "• **Instrucción de texto** que das al modelo de IA\n• Debe ser **claro, específico y contextualizado**\n• **Analogía del café**: \"Dame algo caliente\" vs \"Café americano, sin azúcar, taza grande\"\n• **Calidad del prompt = Calidad de la respuesta**",
              useMarkdown: true,
            },
            {
              title: "Contexto",
              content: "• **Información adicional** que ayuda a interpretar correctamente\n• **Tipos**: Temporal, Audiencia, Objetivo\n• Evita **malentendidos** y mejora precisión\n• Reduce **alucinaciones** del modelo",
              useMarkdown: true,
            },
            {
              title: "Historial",
              content: "• **Retención Contextual**: Recordar mensajes anteriores\n• **Sesgo Temático**: Conectar con temas establecidos\n• **Ejemplo**: Preguntas sobre gatos → respuestas con analogías felinas 🐱\n• La IA actúa como un **\"espejo conversacional\"**",
              useMarkdown: true,
            },
          ],
          useMarkdownSections: true,
        },
        type: "scroll",
        order: 3,
        template: "scroll",
        settings: null,
      },
      {
        title: "SystemPrompt",
        content: {
          containerTitle: "SystemPrompt",
          useMarkdownSections: false,
          sections: [
            {
              title: "¿Qué es?",
              content:
                "Instrucciones que definen el comportamiento, contexto y límites de un asistente de IA. Establece cómo debe responder, qué tono usar y cómo interactuar.",
              useMarkdown: false,
            },
            {
              title: "Ejemplos Clave",
              content:
                '• **Asistente de Tareas:** "Eres un asistente de productividad..."\n• **Soporte al Cliente:** "Eres un agente de soporte técnico..."\n• **Generador de Informes:** "Eres un asistente de análisis..."\n• **Coordinador:** "Eres un facilitador de reuniones..."',
              useMarkdown: true,
            },
            {
              title: "¿Por qué es importante?",
              content: "El SystemPrompt es la base que guía el comportamiento y personalidad de la IA, asegurando respuestas alineadas a los objetivos y valores definidos.",
              useMarkdown: true,
            },
          ],
        },
        type: "scroll",
        order: 4,
        template: "scroll",
        settings: null,
      },
      {
        title: "Seguridad en LLMs",
        content: {
          containerTitle: "Aspectos Críticos de Seguridad en LLMs",
          subtitle: "Protección • Vulnerabilidades • Mejores Prácticas • Ética • ShadowAI • Estadísticas",
          sections: [
            {
              title: "🔒 Protección de Datos",
              content: "• **Encriptación** de datos sensibles\n• **Control de acceso** y autenticación\n• **Cumplimiento** de regulaciones (GDPR, HIPAA)",
              useMarkdown: true,
            },
            {
              title: "⚠️ Vulnerabilidades Comunes",
              content: "• **Prompt Injection**: Manipulación de instrucciones del sistema\n  - Inyección de comandos maliciosos en prompts\n  - Bypass de restricciones de seguridad\n• **Data Leakage**: Filtración de información sensible\n• **Model Poisoning**: Corrupción del entrenamiento\n• **Hallucinaciones**: Respuestas incorrectas o inventadas",
              useMarkdown: true,
            },
            {
              title: "👤 ShadowAI",
              content: "• **Uso no autorizado** de herramientas de IA en empresas\n• **Empleados** utilizan IA sin conocimiento de TI/Seguridad\n• **Riesgos**: Datos corporativos en plataformas externas\n• **Falta de control** sobre información sensible\n• **Políticas inexistentes** o no comunicadas",
              useMarkdown: true,
            },
            {
              title: "✅ Mejores Prácticas",
              content: "• **Validación** de inputs del usuario\n• **Sanitización** de outputs generados\n• **Monitoreo continuo** de actividad\n• **Actualizaciones regulares** del modelo",
              useMarkdown: true,
            },
            {
              title: "🎯 Consideraciones Éticas",
              content: "• **Sesgos** en el modelo y sus respuestas\n• **Privacidad** del usuario y sus datos\n• **Transparencia** en decisiones y procesos\n\n> *\"La seguridad no es un producto, es un proceso\"*",
              useMarkdown: true,
            },
            {
              title: "📊 Estadísticas IBM",
              content: "• **9 de cada 10 compañías**: Los empleados usan IA\n• **Solo el 30%** ha recibido asesoría o formación\n• **Brecha crítica**: Entre adopción y preparación\n• **Necesidad urgente** de políticas y capacitación\n\n> *Fuente: IBM AI Adoption Study*",
              useMarkdown: true,
            },
          ],
          useMarkdownSections: true,
        },
        type: "scroll",
        order: 5,
        template: "scroll",
        settings: null,
      },
      {
        title: "Caso Samsung: ChatGPT Prohibido",
        content: {
          containerTitle: "Samsung Prohíbe ChatGPT tras Filtración de Código",
          subtitle: "El Incidente • Empresas Afectadas • Preocupaciones • Lección Aprendida",
          backgroundImage: "https://imageio.forbes.com/specials-images/imageserve/6450f107e81ee893f6dc456e/Mobile-World-Congress-2023-Barcelona-Logotypes/0x0.jpg?format=jpg&crop=3259,1834,x0,y168,safe&width=1440",
          sections: [
            {
              title: "📰 El Incidente (2023)",
              content: "• Un ingeniero accidentalmente subió **código fuente sensible** a ChatGPT\n• Samsung descubrió la filtración y actuó de inmediato\n• Prohibición total de herramientas de **IA generativa** para empleados\n• Ejemplo claro de **ShadowAI** en acción",
              useMarkdown: true,
            },
            {
              title: "🏢 Otras Empresas Afectadas",
              content: "• **Amazon:** Advirtió sobre compartir código con ChatGPT\n• **JPMorgan Chase:** Restricciones severas por riesgos regulatorios\n• **Bank of America, Wells Fargo, Goldman Sachs:** Siguieron el ejemplo\n• **Reacción en cadena** en el sector financiero y tecnológico",
              useMarkdown: true,
            },
            {
              title: "⚠️ Preocupaciones de Seguridad",
              content: "• Los datos se almacenan en servidores de **OpenAI, Microsoft, Google**\n• **No hay forma fácil** de acceder y eliminar datos\n• Los datos pueden ser **servidos a otros usuarios**\n• ChatGPT guarda historial y **entrena con conversaciones**\n• **Falta de control** sobre información corporativa",
              useMarkdown: true,
            },
            {
              title: "💡 Lección Aprendida",
              content: "• **Políticas claras** son esenciales antes de adoptar IA\n• **Capacitación** del personal sobre riesgos de seguridad\n• **Monitoreo** del uso de herramientas externas\n• Balance entre **innovación y seguridad**\n\n> *\"La conveniencia de la IA no debe comprometer la seguridad empresarial\"*",
              useMarkdown: true,
            },
          ],
          useMarkdownSections: true,
        },
        type: "scroll",
        order: 6,
        template: "scroll",
        settings: null,
      },
      {
        title: "Flujo de Comunicación LLM",
        content: {
          title: "Flujo de Comunicación con un Modelo LLM",
          subtitle: "Del input del usuario hasta la respuesta final",
          steps: [
            {
              id: 1,
              title: "Interfaz de Cliente",
              subtitle: "Web/App/API",
              description: [
                "• Captura entrada del usuario",
                "• Interfaz web/móvil/API"
              ],
              color: "border-blue-400/50",
              position: { x: 0, y: 0 }
            },
            {
              id: 2,
              title: "Inyección de Contexto",
              subtitle: "System Prompt + Chat History + Knowledge",
              description: [
                "• Añade información relevante",
                "• Define comportamiento"
              ],
              color: "border-green-400/50",
              position: { x: 1, y: 0 }
            },
            {
              id: 3,
              title: "Filtros de Seguridad (Entrada)",
              subtitle: "Validación y sanitización",
              description: [
                "• Previene prompt injection",
                "• Detecta contenido inapropiado"
              ],
              codeExample: "checkPII();\ndetectHarmfulContent();\nvalidateContent();",
              color: "border-yellow-400/50",
              position: { x: 2, y: 0 }
            },
            {
              id: 4,
              title: "Preprocesamiento",
              subtitle: "Normalización y formateo",
              description: [
                "• Limpieza y formateo",
                "• Normalización de texto"
              ],
              codeExample: "formatRemove(userInput);\nsanitizeInput();\nnormalizeText();",
              color: "border-pink-400/50",
              position: { x: 3, y: 0 }
            }
          ],
          secondRow: [
            {
              id: 5,
              title: "Motor LLM",
              subtitle: "Procesamiento de tokens",
              description: [
                "• Predicción de tokens",
                "• Razonamiento y generación"
              ],
              codeExample: "// Procesamiento de tokens\nif (token) {\n  predict_next();\n}",
              color: "border-purple-400/50",
              position: { x: 0, y: 1 }
            },
            {
              id: 6,
              title: "Tool Calling",
              subtitle: "Identificación de funciones",
              description: [
                "• Identificación de intención",
                "• Preparación de funciones"
              ],
              codeExample: "function('weatherAPI');\n{\n  params: city, date\n}",
              color: "border-indigo-400/50",
              position: { x: 1, y: 1 }
            },
            {
              id: 7,
              title: "Filtros de Seguridad (Salida)",
              subtitle: "Verificación final",
              description: [
                "• Verifica contenido apropiado",
                "• Evita información errónea"
              ],
              color: "border-orange-400/50",
              position: { x: 2, y: 1 }
            },
            {
              id: 8,
              title: "Formateo de Respuesta",
              subtitle: "Estructuración final",
              description: [
                "• Estructuración de la respuesta",
                "• Adaptación al canal de salida"
              ],
              color: "border-cyan-400/50",
              position: { x: 3, y: 1 }
            }
          ],
          categories: [

          ],
          bottomText: "Desliza para explorar"
        },
        type: "workflow",
        order: 7,
        template: "workflow",
        settings: null,
      },
      {
        title: "Privado VS Publico",
        content: {
          containerTitle: "LLM: Comparativa Público vs. Privado",
          subtitle: "Datos • Control • Personalización • Disponibilidad • Costos • Soporte • Seguridad • Exclusividad",
          sections: [
            {
              title: "📊 Datos y Entrenamiento",
              content: "**Privado:** Datos propios y controlados, entrenamiento personalizado con información específica de la empresa\n\n**Público:** Datos masivos de internet, entrenamiento general con conocimiento amplio pero no específico",
              useMarkdown: true,
            },
            {
              title: "🔒 Control de Datos",
              content: "**Privado:** Control total sobre los datos, permanecen en infraestructura propia, sin riesgo de filtración\n\n**Público:** Los datos se envían a terceros, almacenamiento externo, posible uso para entrenamiento",
              useMarkdown: true,
            },
            {
              title: "⚙️ Personalización",
              content: "**Privado:** Altamente personalizable, adaptado a terminología y procesos específicos de la empresa\n\n**Público:** Personalización limitada, configuración general, no adaptado a casos específicos",
              useMarkdown: true,
            },
            {
              title: "🌐 Disponibilidad",
              content: "**Privado:** Disponibilidad controlada por la empresa, posibles interrupciones por mantenimiento\n\n**Público:** Alta disponibilidad 24/7, infraestructura robusta y distribuida globalmente",
              useMarkdown: true,
            },
            {
              title: "💰 Costos",
              content: "**Privado:** Alto costo inicial de implementación, mantenimiento de infraestructura, personal especializado\n\n**Público:** Costo por uso, sin inversión inicial, modelos de suscripción flexibles",
              useMarkdown: true,
            },
            {
              title: "🛠️ Soporte Técnico",
              content: "**Privado:** Soporte interno o del proveedor específico, recursos limitados para resolución\n\n**Público:** Soporte robusto del proveedor, comunidad activa, documentación extensa",
              useMarkdown: true,
            },
            {
              title: "🔐 Seguridad",
              content: "**Privado:** Máxima seguridad, datos no salen del entorno controlado, cumplimiento regulatorio total\n\n**Público:** Dependiente del proveedor, riesgos de filtración, cumplimiento limitado de regulaciones específicas",
              useMarkdown: true,
            },
            {
              title: "👑 Exclusividad",
              content: "**Privado:** Modelo exclusivo para la empresa, ventaja competitiva única, conocimiento propietario\n\n**Público:** Modelo compartido con otros usuarios, sin ventaja competitiva diferencial",
              useMarkdown: true,
            },
          ],
          useMarkdownSections: true,
        },
        type: "scroll",
        order: 8,
        template: "scroll",
        settings: null,
      },
      {
        title: "Etapa 2",
        content: {
          title: "Etapa 2",
          subtitle: "Conceptos Avanzados: RAG, SMA y Agentic AI",
        },
        type: "title",
        order: 9,
        template: "title",
        settings: null,
      },
      {
        title: "RAG",
        content: {
          containerTitle: "RAG (Retrieval-Augmented Generation)",
          subtitle: "Explicación • Analogía • Componentes • Ventajas • Casos de Uso • Implementación",
          sections: [
            {
              title: "🔍 ¿Qué es RAG?",
              content: "**Retrieval-Augmented Generation** combina la capacidad generativa de los LLMs con la búsqueda de información específica en bases de conocimiento externas\n\n• **Recupera** información relevante de fuentes externas\n• **Aumenta** el contexto del modelo con datos actualizados\n• **Genera** respuestas más precisas y fundamentadas",
              useMarkdown: true,
            },
            {
              title: "📚 Analogía: Biblioteca Inteligente",
              content: "**Imagina un bibliotecario experto:**\n• Cuando le haces una pregunta, **busca** en los libros más relevantes\n• **Lee** las secciones pertinentes de esos libros\n• **Combina** esa información con su conocimiento general\n• Te da una respuesta **completa y actualizada**\n\n*RAG funciona igual: busca, lee y combina información*",
              useMarkdown: true,
            },
            {
              title: "⚙️ Componentes Principales",
              content: "**1. Base de Conocimiento:** Documentos, PDFs, bases de datos\n**2. Sistema de Embeddings:** Convierte texto en vectores matemáticos\n**3. Motor de Búsqueda:** Encuentra información relevante (vector similarity)\n**4. LLM Generator:** Combina información recuperada con su conocimiento\n**5. Orchestrator:** Coordina todo el proceso",
              useMarkdown: true,
            },
            {
              title: "✅ Ventajas Clave",
              content: "• **Información Actualizada:** Acceso a datos recientes sin reentrenar\n• **Fuentes Verificables:** Referencias específicas a documentos originales\n• **Reducción de Alucinaciones:** Respuestas basadas en hechos reales\n• **Especialización Rápida:** Adaptación a dominios específicos\n• **Control de Conocimiento:** Gestión de qué información puede usar",
              useMarkdown: true,
            },
            {
              title: "🎯 Casos de Uso Populares",
              content: "• **Asistentes Corporativos:** Consultas sobre políticas internas\n• **Soporte Técnico:** Búsqueda en manuales y documentación\n• **Investigación Médica:** Consultas en literatura científica\n• **Legal:** Búsqueda en jurisprudencia y regulaciones\n• **E-commerce:** Recomendaciones basadas en catálogos",
              useMarkdown: true,
            },
            {
              title: "🛠️ Proceso de Implementación",
              content: "**1. Preparación:** Recopilar y procesar documentos\n**2. Vectorización:** Crear embeddings de todos los textos\n**3. Indexación:** Almacenar vectores en base de datos especializada\n**4. Pipeline:** Configurar flujo RAG (query → search → generate)\n**5. Evaluación:** Medir precisión y relevancia de respuestas",
              useMarkdown: true,
            },
          ],
          useMarkdownSections: true,
        },
        type: "scroll",
        order: 10,
        template: "scroll",
        settings: null,
      },

      {
        title: "SMA",
        content: {
          containerTitle: "SMA (Sistemas Multi-Agente)",
          subtitle: "Colaboración Privado-Público • Seguridad • Escalabilidad • Control • Eficiencia",
          sections: [
            {
              title: "🔐 SMA Híbrido: Lo Mejor de Ambos Mundos",
              content: "**Combinación estratégica** de agentes privados y públicos trabajando en colaboración:\n\n• **Agentes Privados:** Manejan datos sensibles en entorno controlado\n• **Agentes Públicos:** Procesan tareas complejas con modelos potentes\n• **Orquestación Inteligente:** Decide qué agente usar según el tipo de dato\n• **Seguridad por Diseño:** Información sensible nunca sale del entorno privado",
              useMarkdown: true,
            },
            {
              title: "🏦 Analogía: Banco con Consultores Externos",
              content: "**Como un banco que colabora con consultores:**\n• **Empleados Internos:** Manejan datos de clientes y transacciones confidenciales\n• **Consultores Externos:** Procesan análisis complejos con datos anonimizados\n• **Coordinador:** Decide qué información puede salir y cuál debe quedarse\n• **Protocolo Seguro:** Intercambio controlado de información no sensible\n\n*El banco mantiene control total, pero aprovecha expertise externo*",
              useMarkdown: true,
            },
            {
              title: "⚖️ División Inteligente del Trabajo",
              content: "**Agentes Privados se encargan de:**\n• Datos personales (PII), financieros, médicos\n• Información propietaria y secretos comerciales\n• Cumplimiento regulatorio y auditorías\n\n**Agentes Públicos procesan:**\n• Análisis complejos con datos anonimizados\n• Tareas que requieren modelos más grandes\n• Investigación y síntesis de información pública",
              useMarkdown: true,
            },
            {
              title: "🎯 Beneficios de la Colaboración",
              content: "• **Seguridad Garantizada:** Datos sensibles nunca abandonan el entorno privado\n• **Potencia Computacional:** Acceso a modelos públicos más avanzados\n• **Costo Optimizado:** Uso eficiente de recursos privados y públicos\n• **Compliance Total:** Cumplimiento regulatorio sin sacrificar capacidades\n• **Escalabilidad Híbrida:** Crece según necesidades sin comprometer seguridad",
              useMarkdown: true,
            },
            {
              title: "💼 Casos de Uso Empresariales",
              content: "• **Análisis Financiero:** Agente privado maneja datos de clientes, público hace modelado predictivo\n• **Investigación Médica:** Privado protege datos de pacientes, público analiza tendencias globales\n• **Legal:** Privado revisa contratos confidenciales, público investiga jurisprudencia\n• **RH:** Privado maneja datos de empleados, público analiza tendencias del mercado laboral\n• **Desarrollo:** Privado protege código propietario, público ayuda con arquitecturas generales",
              useMarkdown: true,
            },
            {
              title: "🔧 Implementación del SMA Híbrido",
              content: "**1. Clasificación de Datos:** Identificar qué es sensible vs. público\n**2. Diseño de Fronteras:** Establecer límites entre agentes privados/públicos\n**3. Protocolo de Anonimización:** Métodos para sanitizar datos compartidos\n**4. Orquestador Inteligente:** Sistema que decide ruteo de tareas\n**5. Auditoría Continua:** Monitoreo de cumplimiento y seguridad",
              useMarkdown: true,
            },
          ],
          useMarkdownSections: true,
        },
        type: "scroll",
        order: 11,
        template: "scroll",
        settings: null,
      },

      {
        title: "Agentic AI",
        content: {
          containerTitle: "Agentes de IA Empresariales",
          subtitle: "Integración • CRM • ERP • Seguridad • Automatización • APIs • Sistemas Legados",
          sections: [
            {
              title: "🔗 IA Conectada a Sistemas Empresariales",
              content: "**Agentes de IA** que se integran directamente con la infraestructura tecnológica empresarial:\n\n• **Conexión Nativa:** APIs y webhooks con sistemas existentes\n• **Acceso en Tiempo Real:** Lectura y escritura de datos empresariales\n• **Automatización Inteligente:** Decisiones basadas en datos reales del negocio\n• **Orquestación de Sistemas:** Coordinación entre múltiples plataformas",
              useMarkdown: true,
            },
            {
              title: "🏢 Analogía: Asistente Ejecutivo Digital",
              content: "**Como un asistente ejecutivo que tiene acceso a todo:**\n• **Agenda (CRM):** Programa reuniones basándose en datos de clientes\n• **Finanzas (ERP):** Revisa presupuestos y aprueba gastos menores\n• **Seguridad (Firewall):** Monitorea amenazas y ajusta políticas\n• **Comunicaciones (Email/Slack):** Filtra mensajes y responde automáticamente\n• **Reportes (BI):** Genera análisis ejecutivos combinando múltiples fuentes\n\n*El agente tiene las llaves de todos los sistemas, pero actúa con inteligencia*",
              useMarkdown: true,
            },
            {
              title: "🔧 Integración con Sistemas Clave",
              content: "**CRM (Customer Relationship Management):**\n• Actualización automática de leads y oportunidades\n• Análisis predictivo de ventas\n• Seguimiento inteligente de clientes\n\n**ERP (Enterprise Resource Planning):**\n• Gestión automática de inventarios\n• Optimización de cadena de suministro\n• Procesamiento inteligente de facturas\n\n**Sistemas de Seguridad:**\n• Monitoreo proactivo de amenazas\n• Respuesta automática a incidentes\n• Gestión dinámica de políticas de acceso",
              useMarkdown: true,
            },
            {
              title: "⚡ Capacidades de Automatización",
              content: "• **Procesamiento de Documentos:** OCR + análisis de contratos, facturas, reportes\n• **Gestión de Tickets:** Clasificación automática y asignación inteligente\n• **Monitoreo de Compliance:** Verificación continua de regulaciones\n• **Optimización de Recursos:** Ajuste dinámico de capacidades según demanda\n• **Análisis Predictivo:** Anticipación de problemas y oportunidades\n• **Orquestación de Workflows:** Coordinación de procesos multi-sistema",
              useMarkdown: true,
            },
            {
              title: "💼 Casos de Uso por Industria",
              content: "• **Banca:** Agente conectado a core banking para análisis de riesgo en tiempo real\n• **Manufactura:** Integración con MES/SCADA para optimización de producción\n• **Retail:** Conexión con POS y e-commerce para gestión dinámica de inventario\n• **Salud:** Integración con HIS/EMR para análisis de datos clínicos\n• **Logística:** Conexión con WMS/TMS para optimización de rutas y almacenes\n• **Telecomunicaciones:** Integración con OSS/BSS para gestión de red y facturación",
              useMarkdown: true,
            },
            {
              title: "🛡️ Implementación Segura y Escalable",
              content: "**1. Arquitectura de APIs:** Diseño de endpoints seguros y versionados\n**2. Autenticación Robusta:** OAuth, JWT, y certificados para acceso controlado\n**3. Monitoreo y Logging:** Auditoría completa de todas las interacciones\n**4. Failover y Redundancia:** Sistemas de respaldo para continuidad operacional\n**5. Sandbox Testing:** Entornos aislados para pruebas sin impacto en producción\n**6. Governance de IA:** Políticas y controles para uso responsable",
              useMarkdown: true,
            },
          ],
          useMarkdownSections: true,
        },
        type: "scroll",
        order: 12,
        template: "scroll",
        settings: null,
      },

      {
        title: "Etapa 3",
        content: {
          title: "Etapa 3",
          subtitle: "Actualidad y futuro en el contexto de la IA",
        },
        type: "title",
        order: 13,
        template: "title",
        settings: null,
      },
      {
        title: "MCP (Model Context Protocol)",
        content: {
          containerTitle: "MCP (Model Context Protocol)",
          subtitle: "Protocolo Universal • Interoperabilidad • Estándarización • Ecosistema • Integración • Futuro",
          sections: [
            {
              title: "🌐 El Protocolo Universal de IA",
              content: "**Model Context Protocol** es el estándar emergente que permite la comunicación fluida entre diferentes modelos de IA y sistemas:\n\n• **Lingua Franca:** Lenguaje común para todos los sistemas de IA\n• **Interoperabilidad Total:** Diferentes modelos pueden colaborar sin fricción\n• **Estándarización:** Protocolos unificados para intercambio de contexto\n• **Ecosistema Abierto:** Permite integración plug-and-play entre plataformas",
              useMarkdown: true,
            },
            {
              title: "🔌 Analogía: USB para la IA",
              content: "**Como el estándar USB revolucionó la conectividad:**\n• **Antes de USB:** Cada dispositivo tenía su propio conector propietario\n• **Después de USB:** Un solo cable conecta cualquier dispositivo\n• **Antes de MCP:** Cada IA tiene su propia API y formato\n• **Con MCP:** Un protocolo universal conecta cualquier modelo de IA\n\n*MCP elimina las barreras técnicas entre diferentes sistemas de IA*",
              useMarkdown: true,
            },
            {
              title: "💼 Casos de Uso Transformadores",
              content: "• **IA Híbrida Empresarial:** Combinar modelos privados locales con públicos en la nube\n• **Especialización Multi-Modelo:** GPT para texto, DALL-E para imágenes, Whisper para audio\n• **Failover Inteligente:** Cambio automático entre proveedores si uno falla\n• **A/B Testing de Modelos:** Comparación en tiempo real de diferentes IA\n• **Orquestación Compleja:** Workflows que usan decenas de modelos especializados\n• **Marketplace de IA:** Ecosistema donde cualquier modelo puede participar",
              useMarkdown: true,
            },
            {
              title: "🛠️ Implementación y Adopción",
              content: "**Estado Actual:**\n• Desarrollado por Anthropic en colaboración con la industria\n• Adoptado por principales proveedores de IA\n• Especificación abierta y extensible\n\n**Roadmap de Implementación:**\n**1. Pilot Programs:** Pruebas con partners selectos\n**2. Open Source Tools:** SDKs y herramientas de desarrollo\n**3. Industry Adoption:** Adopción masiva por proveedores\n**4. Ecosystem Maturity:** Marketplace completo y estándares consolidados",
              useMarkdown: true,
            },
          ],
          useMarkdownSections: true,
        },
        type: "scroll",
        order: 14,
        template: "scroll",
        settings: null,
      },

      {
        title: "IA como Accion",
        content: {
          containerTitle: "IA como Acción: Más que un Chat",
          subtitle: "Ejecutabilidad • Automatización • APIs • Workflows • Integración • Transformación Digital",
          sections: [
            {
              title: "⚡ De Conversación a Ejecución",
              content: "**La evolución de la IA:** De simplemente responder preguntas a ejecutar acciones reales en el mundo digital:\n\n• **Más que Respuestas:** La IA toma acciones concretas y medibles\n• **Integración Directa:** Se conecta con sistemas empresariales para ejecutar tareas\n• **Automatización Inteligente:** Combina razonamiento con ejecución automática\n• **Impacto Real:** Genera valor tangible más allá de la información",
              useMarkdown: true,
            },
            {
              title: "🔧 Analogía: Asistente Personal vs. Ejecutor",
              content: "**Diferencia fundamental:**\n\n**IA Tradicional (Chat):**\n• \"Te sugiero que envíes un email a Juan sobre el proyecto\"\n• \"Deberías actualizar el CRM con la nueva información\"\n• \"Recomiendo revisar el inventario de producto X\"\n\n**IA como Acción:**\n• **Envía** automáticamente el email a Juan con el contexto del proyecto\n• **Actualiza** directamente el CRM con los datos procesados\n• **Verifica** el inventario y **genera** orden de compra si es necesario\n\n*De dar consejos a ejecutar soluciones*",
              useMarkdown: true,
            },
            {
              title: "🔗 Arquitectura de IA Ejecutable",
              content: "**Componentes Clave:**\n\n**1. Decision Engine:** Motor que analiza contexto y decide acciones\n**2. Action Orchestrator:** Sistema que coordina ejecución de múltiples tareas\n**3. API Gateway:** Punto de acceso seguro a sistemas empresariales\n**4. Audit Trail:** Registro completo de todas las acciones ejecutadas\n**5. Safety Controls:** Límites y validaciones para prevenir errores críticos\n**6. Rollback Mechanism:** Capacidad de deshacer acciones si es necesario",
              useMarkdown: true,
            },
            {
              title: "💼 Implementación Empresarial",
              content: "**Fases de Adopción:**\n\n**Fase 1 - Observación:** IA analiza y recomienda, humanos ejecutan\n**Fase 2 - Asistencia:** IA ejecuta acciones simples con aprobación humana\n**Fase 3 - Automatización:** IA ejecuta tareas rutinarias de forma autónoma\n**Fase 4 - Orquestación:** IA coordina procesos complejos multi-sistema\n\n**Consideraciones Críticas:**\n• Governance y políticas de uso\n• Monitoreo continuo y alertas\n• Training del personal en nuevos workflows\n• Medición de ROI y impacto en productividad",
              useMarkdown: true,
            },
          ],
          useMarkdownSections: true,
        },
        type: "scroll",
        order: 15,
        template: "scroll",
        settings: null,
      },

      {
        title: "VibeCoding",
        content: {
          containerTitle: "VibeCoding: Programación por Intención",
          subtitle: "Desarrollo Intuitivo • IA Colaborativa • Prototipado Rápido • Democratización • Creatividad • Eficiencia",
          sections: [
            {
              title: "🎨 ¿Qué es VibeCoding?",
              content: "**VibeCoding** es un nuevo paradigma de programación donde describes **la intención y el sentimiento** de lo que quieres crear, y la IA traduce esa visión en código funcional:\n\n• **Programación por Concepto:** Explica qué quieres lograr, no cómo implementarlo\n• **Lenguaje Natural:** Usa descripciones conversacionales en lugar de sintaxis estricta\n• **Iteración Creativa:** Refina ideas a través de conversación con la IA\n• **Prototipado Instantáneo:** De idea a aplicación funcional en minutos",
              useMarkdown: true,
            },
            {
              title: "🎭 Analogía: Director de Orquesta Digital",
              content: "**Como un director dirigiendo una orquesta:**\n\n**Programación Tradicional:**\n• Le dices a cada músico exactamente qué nota tocar y cuándo\n• Necesitas conocer cada instrumento en detalle\n• Proceso lento y requiere expertise técnico profundo\n\n**VibeCoding:**\n• Describes el **sentimiento** y **estilo** de la música que quieres\n• La IA-orquesta interpreta tu visión y ejecuta la sinfonía\n• Te enfocas en la **creatividad** y **dirección artística**\n\n*De micromanager técnico a visionario creativo*",
              useMarkdown: true,
            },

            {
              title: "🔧 Casos de Uso Transformadores",
              content: "• **Prototipado de Startups:** MVP funcional en horas, no semanas\n• **Automatización Empresarial:** Herramientas internas creadas por usuarios finales\n• **Educación Personalizada:** Profesores crean apps educativas específicas\n• **Análisis de Datos:** Científicos de datos generan visualizaciones complejas\n• **Marketing Digital:** Campañas interactivas y landing pages dinámicas\n• **Investigación:** Herramientas especializadas para experimentos únicos",
              useMarkdown: true,
            },
            {
              title: "🌟 El Futuro del Desarrollo",
              content: "**Cambio de Paradigma:**\n\n**Antes:** Programadores escriben código → Usuarios usan software\n**Ahora:** Usuarios describen necesidades → IA genera soluciones\n\n**Implicaciones:**\n• **Velocidad 100x:** De semanas de desarrollo a minutos\n• **Creatividad Desbloqueada:** Más tiempo para innovación, menos para implementación\n• **Democratización Total:** Cualquiera puede crear software profesional\n• **Personalización Masiva:** Cada usuario puede tener su herramienta perfecta\n\n*\"El futuro es donde la creatividad humana se amplifica exponencialmente por la IA\"*",
              useMarkdown: true,
            },
          ],
          useMarkdownSections: true,
        },
        type: "scroll",
        order: 16,
        template: "scroll",
        settings: null,
      },

      {
        title: "Pregunta",
        content: {
          title: "Pregunta",
          subtitle: "Que pasaria si el gerente de departamento pudiera crear aplicaciones a su medida?",
        },
        type: "title",
        order: 17,
        template: "title",
        settings: null,
      },
      {
        title: "Conclusion",
        content: {
          title: "Conclusion",
          subtitle: "Donde estamos y para donde vamos?",
        },
        type: "title",
        order: 18,
        template: "title",
        settings: null,
      },
    ],
  },
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
    rotateY: direction > 0 ? 45 : -45,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
    rotateY: direction < 0 ? 45 : -45,
  }),
}

const backgroundVariants = [
  "bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20",
  "bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-cyan-900/20",
  "bg-gradient-to-br from-rose-900/20 via-pink-900/20 to-purple-900/20",
  "bg-gradient-to-br from-amber-900/20 via-orange-900/20 to-red-900/20",
  "bg-gradient-to-br from-slate-900/20 via-gray-900/20 to-zinc-900/20",
]

export default function PresentationApp() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const slides = presentationData.presentation.slides

  const paginate = (newDirection: number) => {
    const newSlide = currentSlide + newDirection
    if (newSlide >= 0 && newSlide < slides.length) {
      setDirection(newDirection)
      setCurrentSlide(newSlide)
    }
  }

  useEffect(() => {
    if (isAutoPlay) {
      const timer = setInterval(() => {
        if (currentSlide < slides.length - 1) {
          paginate(1)
        } else {
          setIsAutoPlay(false)
        }
      }, 8000)
      return () => clearInterval(timer)
    }
  }, [currentSlide, isAutoPlay, slides.length])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault()
          if (currentSlide > 0) {
            paginate(-1)
          }
          break
        case "ArrowRight":
        case "ArrowDown":
        case " ": // Spacebar
          event.preventDefault()
          if (currentSlide < slides.length - 1) {
            paginate(1)
          }
          break
        case "Home":
          event.preventDefault()
          setDirection(-1)
          setCurrentSlide(0)
          break
        case "End":
          event.preventDefault()
          setDirection(1)
          setCurrentSlide(slides.length - 1)
          break
        case "Escape":
          event.preventDefault()
          setIsAutoPlay(false)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentSlide, slides.length])

  const renderSlide = (slide: any, index: number) => {
    const backgroundClass = ""

    switch (slide.type) {
      case "title":
        return <TitleSlide slide={slide} backgroundClass={backgroundClass} />
      case "content":
        return <ContentSlide slide={slide} backgroundClass={backgroundClass} />
      case "scroll":
        return <ScrollSlide slide={slide} backgroundClass={backgroundClass} />
      case "comparison":
        return <ComparisonSlide slide={slide} backgroundClass={backgroundClass} />
      case "workflow":
        return <WorkflowSlide slide={slide} backgroundClass={backgroundClass} />
      default:
        return <TitleSlide slide={slide} backgroundClass={backgroundClass} />
    }
  }

  return (
    <div
      className="min-h-screen overflow-hidden relative"
      style={{
        backgroundImage: `
          linear-gradient(114.95deg, rgba(235, 0, 255, 0.4) 0%, rgba(0, 71, 255, 0) 34.35%), 
          linear-gradient(180deg, #004B5B 0%, #A7C7FF 100%), 
          linear-gradient(244.35deg, #FFB26A 0%, #3676B1 50.58%, #00A3FF 100%), 
          linear-gradient(244.35deg, #FFFFFF 0%, #004A74 49.48%, #0066FF 100%), 
          radial-gradient(100% 233.99% at 0% 100%, #0066B7 0%, #AD00FF 100%), 
          linear-gradient(307.27deg, #1DAC92 0.37%, #2800C6 100%), 
          radial-gradient(100% 140% at 100% 0%, #EAFF6B 0%, #006C7A 57.29%, #2200AA 100%)
        `,
        backgroundBlendMode: 'hard-light, overlay, overlay, overlay, difference, difference, normal'
      }}
    >
      {/* SVG Noise Background */}
      <div className="absolute inset-0 opacity-15 z-5">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          version="1.1" 
          viewBox="0 0 700 700" 
          width="100%" 
          height="100%" 
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="nnnoise-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="linearRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" seed="15" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
              <feColorMatrix in="turbulence" type="saturate" values="0.1" result="desaturated"/>
              <feComponentTransfer in="desaturated" result="contrast">
                <feFuncA type="discrete" tableValues="0.5 0.6 0.7 0.8 0.9 1"/>
              </feComponentTransfer>
            </filter>
          </defs>
          <rect width="700" height="700" fill="transparent"></rect>
          <rect width="700" height="700" fill="#ffffff" filter="url(#nnnoise-filter)"></rect>
        </svg>
      </div>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Main presentation area */}
      <div className="relative z-20 h-screen flex items-center justify-center ">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 },
              rotateY: { duration: 0.6 },
            }}
            className="w-full w-[100vw] h-full h-[100vh] perspective-1000"
          >
            {renderSlide(slides[currentSlide], currentSlide)}
          </motion.div>
        </AnimatePresence>
      </div>



  
    </div>
  )
}