import React, { useState, useEffect, useRef, useCallback } from 'react'
import Hero3D from './components/Hero3D'

export default function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [activeToc, setActiveToc] = useState('')
  const tocIds = [
    'que-es','como-funciona','cuanto-te-prestan','requisitos',
    'costos','banco-vs-sofom','propiedades','usos','donde-solicitar','faq'
  ]

  /* back-to-top + TOC highlight on scroll */
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400)

      // TOC highlight
      const scrollPos = window.scrollY + 120
      let current = ''
      for (const id of tocIds) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollPos) current = id
      }
      setActiveToc(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      {/* ─── HEADER ─── */}
      <header className="site-header">
        <div className="site-header-inner">
          <a href="/" className="site-logo">crédito<span>de</span>liquidez<span>.com</span></a>
          <button className="nav-toggle" aria-label="Menú" onClick={() => setNavOpen(v => !v)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <nav className={`site-nav${navOpen ? ' open' : ''}`}>
            <a href="/credito-de-liquidez-sin-buro">Sin buró</a>
            <a href="/credito-con-garantia-hipotecaria">Garantía hipotecaria</a>
            <a href="/sofom-vs-banco">SOFOM vs Banco</a>
          </nav>
        </div>
      </header>

      {/* ─── HERO WITH 3D ─── */}
      <section className="hero">
        <div className="breadcrumb">
          <a href="/">Inicio</a> › Guía completa
        </div>
        <div className="hero-layout">
          <div className="hero-text">
            <span className="hero-label">Actualizado febrero 2026</span>
            <h1>Crédito de Liquidez en México: Qué es, cómo funciona y todas las opciones</h1>
            <p className="hero-subtitle">Todo lo que necesitas saber sobre la liquidez hipotecaria: requisitos, costos, cuánto te prestan y las diferencias entre bancos y SOFOMs. Información objetiva, sin vender nada.</p>
          </div>
          <div className="hero-3d-container">
            <Hero3D />
          </div>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <div className="content">
        <div className="content-grid">
          <main className="main-content">

            {/* Key facts */}
            <div className="key-facts">
              <div className="key-facts-title">Datos clave del crédito de liquidez en México</div>
              <div className="key-facts-grid">
                <div className="key-fact">
                  <div className="key-fact-label">Tasas de interés</div>
                  <div className="key-fact-value">9% – 28% anual</div>
                </div>
                <div className="key-fact">
                  <div className="key-fact-label">Porcentaje del valor</div>
                  <div className="key-fact-value">33% – 75% LTV</div>
                </div>
                <div className="key-fact">
                  <div className="key-fact-label">Plazos típicos</div>
                  <div className="key-fact-value">1 – 20 años</div>
                </div>
                <div className="key-fact">
                  <div className="key-fact-label">Tiempo de proceso</div>
                  <div className="key-fact-value">2 – 8 semanas</div>
                </div>
                <div className="key-fact">
                  <div className="key-fact-label">Monto mínimo</div>
                  <div className="key-fact-value">$500,000 MXN</div>
                </div>
                <div className="key-fact">
                  <div className="key-fact-label">Quién lo ofrece</div>
                  <div className="key-fact-value">Bancos, SOFOMs, Fintechs</div>
                </div>
              </div>
            </div>

            {/* Article */}
            <article className="article">

              <h2 id="que-es">¿Qué es un crédito de liquidez?</h2>
              <p>Un <strong>crédito de liquidez</strong> —también conocido como <strong>liquidez hipotecaria</strong>, <strong><a href="/credito-con-garantia-hipotecaria">crédito con garantía hipotecaria</a></strong> o <strong>préstamo con garantía inmobiliaria</strong>— es un financiamiento en el que utilizas una propiedad que ya es tuya como garantía para obtener dinero en efectivo.</p>
              <p>A diferencia de un crédito hipotecario tradicional que sirve para comprar una vivienda, el crédito de liquidez te permite convertir el valor de un inmueble que ya posees en capital disponible. El dinero obtenido es de libre disposición: puedes usarlo para invertir en tu negocio, pagar deudas, adquirir activos, capital de trabajo o cualquier otro fin.</p>
              <p>Este tipo de financiamiento es una de las opciones más accesibles para empresarios y dueños de PyMEs que necesitan montos grandes (desde $500,000 hasta más de $8,000,000 MXN) y que cuentan con una propiedad. Al ofrecer un inmueble como respaldo, las tasas de interés son considerablemente más bajas que las de un crédito personal o empresarial sin garantía.</p>

              <div className="callout">
                <strong>¿Liquidez hipotecaria, crédito de liquidez o crédito privado?</strong> Son diferentes nombres para productos muy similares. La diferencia está en quién los ofrece: los bancos lo llaman "crédito con garantía hipotecaria" o "liquidez", las SOFOMs lo comercializan como "crédito de liquidez" o "crédito privado", y las fintechs como "préstamo con garantía inmobiliaria". El mecanismo es el mismo: tu propiedad como garantía a cambio de capital.
              </div>

              <h2 id="como-funciona">¿Cómo funciona?</h2>
              <p>El proceso de un crédito de liquidez sigue una mecánica clara. La institución financiera evalúa tu propiedad mediante un avalúo profesional, determina cuánto puede prestarte según el valor del inmueble, y formaliza la operación ante notario público registrando una hipoteca sobre tu propiedad.</p>
              <p>Mientras pagues tus mensualidades, la propiedad sigue siendo tuya y puedes seguir usándola (vivir en ella, rentarla, operar tu negocio). La hipoteca se cancela una vez que liquidas el crédito en su totalidad.</p>

              <div className="formula-box">
                <div className="formula">Monto del crédito = Valor de avalúo × LTV</div>
                <div className="formula-caption">LTV (Loan-to-Value) es el porcentaje del valor que te prestan, típicamente entre 33% y 75%</div>
              </div>

              <h3>Proceso paso a paso</h3>
              <div className="steps">
                {[
                  { n: '1', title: 'Solicitud y precalificación.', text: 'Presentas tu solicitud con datos básicos de la propiedad y tu situación financiera. La institución hace una evaluación preliminar para determinar si es viable.' },
                  { n: '2', title: 'Avalúo del inmueble.', text: 'Un perito valuador certificado visita la propiedad y determina su valor comercial. Este avalúo tiene un costo de $3,000 a $8,000 MXN dependiendo del tipo y ubicación del inmueble.' },
                  { n: '3', title: 'Análisis y aprobación.', text: 'La institución revisa el avalúo, tu historial crediticio (según el tipo de institución), documentos legales de la propiedad y tu capacidad de pago. Determina el monto, tasa y plazo de tu crédito.' },
                  { n: '4', title: 'Firma ante notario.', text: 'Se formaliza el crédito y se constituye la hipoteca sobre tu propiedad mediante escritura pública ante notario. Esto genera gastos notariales que varían por estado.' },
                  { n: '5', title: 'Inscripción y disposición.', text: 'La hipoteca se inscribe en el Registro Público de la Propiedad. Una vez registrada, recibes el dinero. El tiempo total del proceso es de 2 a 8 semanas según la institución.' },
                ].map(s => (
                  <div className="step" key={s.n}>
                    <div className="step-num">{s.n}</div>
                    <div className="step-text"><strong>{s.title}</strong> {s.text}</div>
                  </div>
                ))}
              </div>

              <h2 id="cuanto-te-prestan">¿Cuánto te prestan?</h2>
              <p>El monto que puedes obtener depende de dos factores principales: el <strong>valor de avalúo de tu propiedad</strong> y el <strong>porcentaje LTV (Loan-to-Value)</strong> que aplica la institución financiera. El LTV varía según el tipo de institución y el tipo de propiedad.</p>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Tipo de propiedad</th>
                      <th>LTV en bancos</th>
                      <th>LTV en SOFOMs</th>
                      <th>Ejemplo (propiedad de $5M)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Casa habitación</td><td>50% – 75%</td><td>40% – 60%</td><td>$2,000,000 – $3,750,000</td></tr>
                    <tr><td>Departamento</td><td>50% – 70%</td><td>40% – 60%</td><td>$2,000,000 – $3,500,000</td></tr>
                    <tr><td>Local comercial</td><td>No suelen aceptar</td><td>35% – 55%</td><td>$1,750,000 – $2,750,000</td></tr>
                    <tr><td>Bodega u oficina</td><td>No suelen aceptar</td><td>35% – 50%</td><td>$1,750,000 – $2,500,000</td></tr>
                    <tr><td>Terreno urbano</td><td>No suelen aceptar</td><td>33% – 45%</td><td>$1,650,000 – $2,250,000</td></tr>
                  </tbody>
                </table>
              </div>

              <p>Es importante notar que <strong>los bancos generalmente solo aceptan propiedades residenciales</strong> (casas y departamentos) como garantía. Si tu propiedad es un local comercial, bodega, oficina o terreno, las SOFOMs y financieras no bancarias son prácticamente tu única opción para obtener un crédito de liquidez.</p>

              <h2 id="requisitos">Requisitos</h2>
              <p>Los requisitos varían significativamente entre bancos y SOFOMs. Esta es una de las diferencias más importantes que debes entender antes de solicitar un crédito de liquidez o préstamo con garantía hipotecaria.</p>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Requisito</th>
                      <th>Bancos</th>
                      <th>SOFOMs / Fintechs</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><strong>Buró de crédito</strong></td><td>Indispensable, buen historial</td><td>Flexible, aceptan mal buró</td></tr>
                    <tr><td><strong>Comprobación de ingresos</strong></td><td>Formal (nómina, declaraciones)</td><td>Flexible (estados de cuenta, flujo)</td></tr>
                    <tr><td><strong>Antigüedad laboral</strong></td><td>1-2 años mínimo</td><td>No suelen pedirla</td></tr>
                    <tr><td><strong>Tipo de propiedad</strong></td><td>Solo residencial</td><td>Residencial y comercial</td></tr>
                    <tr><td><strong>Propiedad libre de gravamen</strong></td><td>Sí, generalmente</td><td>Sí, generalmente</td></tr>
                    <tr><td><strong>Escrituras en regla</strong></td><td>Sí</td><td>Sí</td></tr>
                    <tr><td><strong>Identificación oficial</strong></td><td>Sí</td><td>Sí</td></tr>
                    <tr><td><strong>Tiempo de proceso</strong></td><td>4 – 8 semanas</td><td>2 – 4 semanas</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="callout">
                <strong>Si el banco te rechazó, no significa que no haya opciones.</strong> La razón más común de rechazo bancario es el historial en buró de crédito o la falta de comprobación formal de ingresos. Las SOFOMs reguladas por la CONDUSEF ofrecen créditos de liquidez con requisitos más flexibles precisamente porque la garantía hipotecaria reduce su riesgo. Las tasas serán mayores, pero es una alternativa legítima y regulada. Conoce más en nuestra guía de <a href="/credito-de-liquidez-sin-buro">crédito de liquidez sin buró</a>.
              </div>

              <h2 id="costos">Costos y tasas de interés</h2>
              <p>El costo total de un crédito de liquidez incluye varios componentes además de la tasa de interés. Es fundamental que los conozcas todos antes de comprometerte.</p>

              <h3>Tasas de interés por tipo de institución</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Institución</th>
                      <th>Tasa anual</th>
                      <th>Pago mensual por cada $1M</th>
                      <th>Plazo típico</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><strong>Bancos</strong></td><td>9% – 18%</td><td>$9,000 – $16,000</td><td>5 – 20 años</td></tr>
                    <tr><td><strong>SOFOMs</strong></td><td>15% – 28%</td><td>$14,500 – $24,000</td><td>1 – 10 años</td></tr>
                    <tr><td><strong>Fintechs</strong></td><td>18% – 30%</td><td>$16,000 – $26,000</td><td>1 – 5 años</td></tr>
                  </tbody>
                </table>
              </div>

              <h3>Costos adicionales al inicio</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Concepto</th>
                      <th>Costo estimado</th>
                      <th>Quién lo cobra</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Avalúo de la propiedad</td><td>$3,000 – $8,000 MXN</td><td>Perito valuador</td></tr>
                    <tr><td>Comisión por apertura</td><td>1% – 3% del monto</td><td>La institución financiera</td></tr>
                    <tr><td>Gastos notariales</td><td>Variable por estado</td><td>Notaría pública</td></tr>
                    <tr><td>Inscripción en RPP</td><td>Variable por estado</td><td>Registro Público</td></tr>
                    <tr><td>Seguro de daños al inmueble</td><td>0.3% – 0.5% anual</td><td>Aseguradora</td></tr>
                    <tr><td>Seguro de vida (si aplica)</td><td>Variable por edad</td><td>Aseguradora</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="callout callout-warning">
                <strong>Cuidado con los costos ocultos.</strong> Antes de firmar, solicita la tabla de amortización completa y el Costo Anual Total (CAT). Algunas instituciones manejan comisiones por prepago, penalizaciones por pago tardío, o seguros obligatorios que incrementan significativamente el costo real del crédito. El CAT es el indicador más confiable para comparar opciones porque incluye todos los costos.
              </div>

              <h2 id="banco-vs-sofom">Banco vs SOFOM: ¿Cuál conviene?</h2>
              <p>No hay una respuesta universal. La mejor opción depende de tu perfil específico. Hemos preparado una <a href="/sofom-vs-banco">comparativa detallada entre SOFOM y banco</a> con costos reales, pero aquí va el resumen:</p>

              <h3>El banco te conviene si:</h3>
              <p>Tienes buen historial en buró de crédito, puedes comprobar ingresos formalmente (nómina, declaraciones fiscales, constancias), tu propiedad es una casa o departamento habitacional, y no tienes urgencia de tiempo. A cambio obtendrás las tasas más bajas del mercado (desde 9% anual) y plazos largos de hasta 20 años.</p>

              <h3>Una SOFOM te conviene si:</h3>
              <p>Tu historial en buró de crédito no es perfecto o tienes anotaciones negativas, tus ingresos son informales o difíciles de comprobar fiscalmente (como ocurre con muchos empresarios y dueños de PyMEs), tu propiedad es un local comercial, bodega, oficina o terreno, o necesitas el dinero en menos de 4 semanas. Las tasas serán mayores (15-28%) pero tendrás acceso a financiamiento que un banco simplemente no te daría.</p>

              <div className="callout">
                <strong>¿Qué es una SOFOM?</strong> Una Sociedad Financiera de Objeto Múltiple (SOFOM) es una institución financiera regulada en México que puede otorgar créditos, arrendamiento y factoraje sin ser un banco. Las SOFOMs reguladas están supervisadas por la CONDUSEF y la CNBV. Puedes verificar que una SOFOM sea legítima consultando el registro de la CONDUSEF o la lista de miembros de la ASOFOM (Asociación de Sociedades Financieras de Objeto Múltiple).
              </div>

              <h2 id="propiedades">Tipos de propiedad aceptada</h2>
              <p>Una de las ventajas del crédito de liquidez frente a otros tipos de financiamiento es que permite usar diferentes tipos de inmuebles como garantía, especialmente cuando acudes a SOFOMs o financieras no bancarias.</p>
              <p><strong>Casas y departamentos</strong> son el tipo de garantía más común y el que obtiene mejores condiciones (LTV más alto, tasas más bajas). Todas las instituciones los aceptan.</p>
              <p><strong>Locales comerciales y oficinas</strong> son aceptados principalmente por SOFOMs. Esto es particularmente relevante para empresarios que tienen un local como su principal patrimonio inmobiliario. Los LTV son menores (35-55%) pero es una opción que los bancos simplemente no ofrecen.</p>
              <p><strong>Bodegas y naves industriales</strong> representan un nicho donde las SOFOMs especializadas pueden ofrecer financiamiento. Los montos pueden ser significativos dado el valor de estos inmuebles, aunque los LTV son más conservadores.</p>
              <p><strong>Terrenos urbanos</strong> son la garantía con menores LTV (33-45%) y no todos los intermediarios los aceptan. Debe ser terreno urbano con escrituras claras y de preferencia en zona con uso de suelo definido.</p>

              <h2 id="usos">¿Para qué se usa un crédito de liquidez?</h2>
              <p>El crédito de liquidez es de libre disposición, lo que significa que puedes usar el dinero para cualquier fin. Los usos más comunes son:</p>
              <p><strong>Inversión en negocio o PyME:</strong> capital de trabajo, compra de inventario, adquisición de maquinaria o equipo, apertura de sucursales, remodelación de instalaciones. Es una de las formas más accesibles de financiamiento para PyMEs que tienen propiedad pero no califican para un crédito bancario empresarial.</p>
              <p><strong>Consolidación de deudas:</strong> reemplazar deudas caras (tarjetas de crédito con tasas del 30-50% anual, préstamos personales) por una sola deuda con tasa más baja respaldada por tu propiedad.</p>
              <p><strong>Proyectos personales:</strong> gastos médicos, educación, remodelación de vivienda, o cualquier necesidad que requiera un monto importante de capital.</p>

              <div className="callout callout-warning">
                <strong>Riesgo principal:</strong> recuerda que estás poniendo tu propiedad como garantía. Si dejas de pagar, la institución puede ejecutar la hipoteca y quedarse con tu inmueble mediante un proceso judicial. Solo solicita un crédito de liquidez si tienes un plan claro de pago y la capacidad real de cubrir las mensualidades. Nunca lo uses como último recurso para sostener un negocio que no es viable.
              </div>

              <h2 id="donde-solicitar">¿Dónde solicitar un crédito de liquidez en México?</h2>
              <p>En México existen tres tipos principales de instituciones que ofrecen créditos de liquidez o préstamos con garantía hipotecaria:</p>
              <p><strong>Bancos:</strong> BBVA, Santander, Banorte, HSBC, Scotiabank y otros bancos comerciales ofrecen productos de liquidez hipotecaria. Ofrecen las mejores tasas pero con los requisitos más estrictos. Ideales si tienes buen buró y comprobación formal de ingresos.</p>
              <p><strong>SOFOMs:</strong> instituciones financieras reguladas especializadas en crédito. Muchas son miembros de la ASOFOM. Ofrecen mayor flexibilidad en requisitos y aceptan propiedades comerciales. Son la principal alternativa para empresarios con ingresos informales o historial crediticio imperfecto.</p>
              <p><strong>Fintechs:</strong> plataformas tecnológicas de financiamiento que están ganando participación en el mercado mexicano. Ofrecen procesos más ágiles y digitales, aunque sus tasas suelen ser las más altas del rango.</p>

              <div className="callout">
                <strong>Antes de solicitar, compara.</strong> Las condiciones varían enormemente entre instituciones. Una diferencia de 5 puntos porcentuales en la tasa puede representar cientos de miles de pesos a lo largo del crédito. Solicita cotizaciones en al menos 3 instituciones diferentes, revisa el CAT (no solo la tasa) y lee la letra pequeña sobre comisiones y penalizaciones.
              </div>

              <h2 id="faq">Preguntas frecuentes</h2>

              {[
                { q: '¿Qué es un crédito de liquidez?', a: 'Un crédito de liquidez (también llamado liquidez hipotecaria) es un préstamo donde usas una propiedad inmueble que ya es tuya como garantía para obtener dinero en efectivo. A diferencia de un crédito hipotecario para comprar vivienda, el crédito de liquidez te permite convertir el valor de tu propiedad en capital disponible para cualquier fin: negocio, deudas, inversión u otras necesidades.' },
                { q: '¿Cuánto dinero puedo obtener con un crédito de liquidez?', a: 'Depende del valor de tu propiedad y de la institución. Generalmente te prestan entre el 33% y el 75% del valor de avalúo. Por ejemplo, si tu propiedad vale $5,000,000 MXN, podrías obtener entre $1,650,000 y $3,750,000 MXN. Los bancos ofrecen LTV más altos (50-75%) con requisitos estrictos; las SOFOMs ofrecen LTV de 33-60% con mayor flexibilidad.' },
                { q: '¿Qué tipos de propiedad se aceptan como garantía?', a: 'Los bancos generalmente solo aceptan casas y departamentos. Las SOFOMs aceptan una gama más amplia: casas, departamentos, locales comerciales, bodegas, oficinas y terrenos urbanos. El tipo de propiedad afecta el porcentaje que te prestan.' },
                { q: '¿Cuál es la diferencia entre un banco y una SOFOM para este crédito?', a: 'Los bancos ofrecen tasas más bajas (9-18% anual) pero exigen buen buró, comprobación formal de ingresos y solo aceptan propiedades residenciales. Las SOFOMs tienen tasas más altas (15-28%) pero aceptan mal buró, ingresos informales, propiedades comerciales y su proceso es más rápido.' },
                { q: '¿Puedo obtener un crédito de liquidez si tengo mal buró?', a: 'En un banco, no. Pero varias SOFOMs y financieras no bancarias sí otorgan créditos de liquidez a personas con mal historial crediticio. La garantía hipotecaria reduce el riesgo para ellos, lo que les permite ser más flexibles con el buró. Las tasas serán más altas, pero es una opción real y regulada.' },
                { q: '¿En cuánto tiempo me dan el dinero?', a: 'Los bancos tardan entre 4 y 8 semanas. Las SOFOMs y fintechs pueden completar el proceso en 2 a 4 semanas. El tiempo incluye solicitud, avalúo, análisis, firma ante notario e inscripción en el Registro Público de la Propiedad.' },
                { q: '¿Qué costos adicionales tiene además de la tasa de interés?', a: 'Los costos típicos incluyen: avalúo ($3,000-$8,000 MXN), comisión por apertura (1-3% del monto), gastos notariales, inscripción en el Registro Público, y posibles seguros obligatorios. En total, los costos iniciales pueden representar entre el 3% y el 7% del monto del crédito.' },
                { q: '¿Puedo perder mi propiedad si no pago?', a: 'Sí. Si dejas de pagar, la institución financiera puede iniciar un proceso judicial para ejecutar la garantía hipotecaria y vender tu propiedad para cubrir la deuda. Solo solicita este crédito si tienes capacidad real de pago y un plan claro para cumplir con las mensualidades.' },
              ].map((faq, i) => (
                <div className="faq-item" key={i}>
                  <div className="faq-question">{faq.q}</div>
                  <div className="faq-answer">{faq.a}</div>
                </div>
              ))}

            </article>
          </main>

          {/* ─── SIDEBAR ─── */}
          <aside className="sidebar">
            <nav className="toc" aria-label="Tabla de contenidos">
              <div className="toc-title">Contenido</div>
              {[
                ['que-es', '¿Qué es?'],
                ['como-funciona', '¿Cómo funciona?'],
                ['cuanto-te-prestan', '¿Cuánto te prestan?'],
                ['requisitos', 'Requisitos'],
                ['costos', 'Costos y tasas'],
                ['banco-vs-sofom', 'Banco vs SOFOM'],
                ['propiedades', 'Tipos de propiedad'],
                ['usos', '¿Para qué se usa?'],
                ['donde-solicitar', '¿Dónde solicitar?'],
                ['faq', 'Preguntas frecuentes'],
              ].map(([id, label]) => (
                <a key={id} href={`#${id}`} className={activeToc === id ? 'active' : ''}>
                  {label}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <nav className="footer-nav">
            <a href="/">Guía completa</a>
            <a href="/credito-de-liquidez-sin-buro">Crédito sin buró</a>
            <a href="/credito-con-garantia-hipotecaria">Garantía hipotecaria</a>
            <a href="/sofom-vs-banco">SOFOM vs Banco</a>
          </nav>
          <div className="footer-bottom">
            <p className="footer-text">creditodeliquidez.com — Información objetiva sobre créditos con garantía hipotecaria en México. Este sitio es meramente informativo y no constituye asesoría financiera.</p>
            <p className="footer-updated">Última actualización: febrero 2026</p>
          </div>
        </div>
      </footer>

      {/* ─── BACK TO TOP ─── */}
      <button
        className={`back-to-top${showTop ? ' visible' : ''}`}
        aria-label="Volver arriba"
        onClick={scrollToTop}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    </>
  )
}
