/**
 * Every word, figure and photo of the deck lives here. Changing a fact never
 * touches a slide's layout (src/components/slides.tsx).
 *
 * `PENDING` marks a fact the team still has to supply: the slide shows it as a
 * visible blank, so nothing invented reaches a jury.
 */

export type Lang = "es" | "en";
export type L = Record<Lang, string>;

const l = (es: string, en: string): L => ({ es, en });

export const PENDING = l("Por definir", "To be defined");

/** Photos the team uploads to `public/fotos/` with exactly these names. */
export const PHOTOS = {
  tarija: ["tarija-01.jpg", "tarija-02.jpg", "tarija-03.jpg", "tarija-04.jpg", "tarija-05.jpg"],
  daroca: "daroca-01.jpg",
  darocaLogo: "daroca-logo.png",
  ucb: "ucb-01.jpg",
  ucbLogo: "ucb-logo.png",
  launch: "lanzamiento-01.jpg",
  erp: "captura-erp.png",
  marketplace: "captura-marketplace.png",
} as const;

export const BRAND = {
  eyebrow: l("Vinos & Singani de altura", "High-altitude wines & Singani"),
  tagline: l("Bodegas de Tarija y Cinti · Bolivia", "Wineries of Tarija and Cinti · Bolivia"),
};

export const UI = {
  prev: l("Anterior", "Previous"),
  next: l("Siguiente", "Next"),
  notes: l("Notas", "Notes"),
  fullscreen: l("Pantalla completa", "Full screen"),
  pdf: l("PDF", "PDF"),
  photo: l("Foto", "Photo"),
  example: l("Ejemplo", "Example"),
  tentative: l("Fecha tentativa", "Tentative date"),
};

export const DECK = {
  portada: {
    section: l("Presentación", "Presentation"),
    title: l("Cada botella, con su lugar y su historia", "Every bottle, with its place and its story"),
    lead: l(
      "Trazabilidad y mercado para los vinos y singanis de altura de Bolivia.",
      "Traceability and a marketplace for Bolivia's high-altitude wines and singanis.",
    ),
    pills: [
      l("Identidad digital", "Digital identity"),
      l("Trazabilidad en Stellar", "Traceability on Stellar"),
      l("Mercado premium", "Premium marketplace"),
    ],
    notes: l(
      "Somos Drinks on Chain. Le damos a cada botella boliviana una identidad que se puede comprobar, desde la parcela hasta la copa.",
      "We are Drinks on Chain. We give every Bolivian bottle an identity anyone can verify, from the vineyard plot to the glass.",
    ),
  },

  problemaBodega: {
    section: l("El problema · la bodega", "The problem · the winery"),
    title: l("Hacer un gran vino no basta: hay que poder demostrarlo", "Making a great wine is not enough: you have to prove it"),
    items: [
      {
        head: l("Producción en cuadernos", "Production kept in notebooks"),
        body: l(
          "La mayoría de las bodegas no usa un sistema: el registro del lote vive en papel y hojas de cálculo.",
          "Most wineries run without a system: the record of each lot lives on paper and spreadsheets.",
        ),
      },
      {
        head: l("Sin rastro cuando algo falla", "No trail when something fails"),
        body: l(
          "Si una barrica se echa a perder, no hay cómo saber de qué lote viene, qué más está afectado ni por qué.",
          "If a barrel spoils, there is no way to know which lot it came from, what else is affected or why.",
        ),
      },
      {
        head: l("Origen que no se comprueba", "An origin nobody can check"),
        body: l(
          "La altura y la Denominación de Origen se afirman en la etiqueta, pero nadie puede verificarlas.",
          "Altitude and the Denomination of Origin are claimed on the label, but nobody can verify them.",
        ),
      },
    ],
    notes: l(
      "Empezamos por la bodega porque ahí nace el dato. En Tarija vimos que la mayoría trabaja sin sistema. El ejemplo que más se repitió: una barrica con un sabor raro y ninguna forma de rastrear el origen del problema.",
      "We start with the winery because that is where the data is born. In Tarija most of them work without a system. The example we heard most: a barrel with an off flavour and no way to trace the cause.",
    ),
  },

  problemaComprador: {
    section: l("El problema · quien compra", "The problem · the buyer"),
    title: l("Una botella sin historia es una botella en riesgo", "A bottle without a story is a bottle at risk"),
    items: [
      {
        head: l("Falsificación y fraude", "Counterfeiting and fraud"),
        body: l(
          "Vinos y destilados premium expuestos a la adulteración, sin sellos que se puedan verificar.",
          "Premium wines and spirits exposed to adulteration, with no seal that can be verified.",
        ),
      },
      {
        head: l("Cero trazabilidad", "Zero traceability"),
        body: l(
          "Quien compra no conoce la parcela, la añada ni el lote de la botella que tiene en la mano.",
          "The buyer does not know the plot, the vintage or the lot of the bottle in their hand.",
        ),
      },
      {
        head: l("Territorio invisible", "An invisible terroir"),
        body: l(
          "El valor de cosechar a más de 1.800 msnm se diluye en etiquetas genéricas.",
          "The value of harvesting above 1,800 m a.s.l. is lost on generic labels.",
        ),
      },
    ],
    notes: l(
      "Del otro lado está quien compra: no tiene cómo saber si la botella es auténtica ni de dónde viene. Y Bolivia pierde lo que la hace única: la altura.",
      "On the other side is the buyer, who cannot tell whether the bottle is authentic or where it comes from. And Bolivia loses what makes it unique: altitude.",
    ),
  },

  solucion: {
    section: l("La solución", "The solution"),
    title: l("Un solo hilo, de la parcela a la copa", "One thread, from the plot to the glass"),
    lead: l(
      "Lo que la bodega registra al producir es exactamente lo que el comprador ve al escanear.",
      "What the winery records while producing is exactly what the buyer sees when scanning.",
    ),
    nodes: [
      {
        kicker: l("Para la bodega", "For the winery"),
        head: l("ERP de trazabilidad", "Traceability ERP"),
        body: l("Cada paso del lote, con quién y cuándo.", "Every step of the lot, with who and when."),
      },
      {
        kicker: l("Para cada botella", "For every bottle"),
        head: l("Pasaporte digital", "Digital passport"),
        body: l("Un NFT y un QR que abren su historia.", "An NFT and a QR that open its story."),
      },
      {
        kicker: l("Para quien compra", "For the buyer"),
        head: l("Marketplace", "Marketplace"),
        body: l("Directo de la bodega, con origen comprobado.", "Straight from the winery, origin verified."),
      },
    ],
    notes: l(
      "No son tres productos sueltos. Es un solo hilo de datos: nace en el ERP, se sella en el pasaporte de la botella y llega al comprador en el Marketplace.",
      "These are not three separate products. It is a single thread of data: born in the ERP, sealed in the bottle's passport and delivered to the buyer in the Marketplace.",
    ),
  },

  erp: {
    section: l("ERP · la bodega", "ERP · the winery"),
    title: l("El ERP hecho para una bodega de altura", "The ERP built for a high-altitude winery"),
    lead: l(
      "Vino y singani, con el proceso boliviano y sus normas ya incorporados.",
      "Wine and singani, with the Bolivian process and its rules built in.",
    ),
    points: [
      l("Parcelas con la Denominación de Origen calculada por altitud y cepa", "Plots with the Denomination of Origin computed from altitude and grape variety"),
      l("Cinco roles: dirección, enología, agronomía, operario y contabilidad", "Five roles: management, oenology, agronomy, cellar hand and accounting"),
      l("Panel de tareas, candados de reposo y alertas por vencer", "Task board, resting locks and upcoming deadlines"),
      l("Cada bodega ve solo lo suyo", "Each winery sees only its own data"),
    ],
    notes: l(
      "El ERP es el producto que ya funciona de punta a punta. No es un ERP genérico: conoce la diferencia entre un vino y un singani, y calcula la Denominación de Origen en lugar de dejar que se marque a mano.",
      "The ERP is the product that already works end to end. It is not a generic ERP: it knows the difference between a wine and a singani, and it computes the Denomination of Origin instead of letting anyone tick a box.",
    ),
  },

  recorrido: {
    section: l("ERP · el lote", "ERP · the lot"),
    title: l("De la parcela a la botella, paso por paso", "From the plot to the bottle, step by step"),
    steps: [
      { head: l("Parcela", "Plot"), body: l("Altitud, cepa y D.O.", "Altitude, variety, D.O.") },
      { head: l("Pesaje", "Weighing"), body: l("Cada ingreso de uva", "Every grape intake") },
      { head: l("Madurez", "Ripeness"), body: l("°Brix, pH, acidez", "°Brix, pH, acidity") },
      { head: l("Dictamen", "Health check"), body: l("Fitosanitario", "Phytosanitary ruling") },
      { head: l("Fermentación", "Fermentation"), body: l("Lecturas diarias", "Daily readings") },
      { head: l("Destilación o crianza", "Distilling or ageing"), body: l("Singani · vino", "Singani · wine") },
      { head: l("Embotellado", "Bottling"), body: l("Balance de litros", "Litre balance") },
      { head: l("Códigos", "Codes"), body: l("Uno por botella", "One per bottle") },
      { head: l("Laboratorio", "Laboratory"), body: l("Conformidad", "Conformity") },
      { head: l("Expediente", "Dossier"), body: l("Sellado y certificado", "Sealed and certified") },
    ],
    notes: l(
      "Este es el recorrido completo de un lote. Cada paso deja registrado quién lo hizo y cuándo. Para el singani hay destilación y reposo; para el vino, crianza.",
      "This is the full journey of a lot. Every step records who did it and when. Singani goes through distillation and resting; wine through ageing.",
    ),
  },

  reglas: {
    section: l("ERP · las reglas", "ERP · the rules"),
    title: l("La trazabilidad no se declara: se cumple", "Traceability is not declared: it is enforced"),
    lead: l("Reglas que el sistema no deja saltarse.", "Rules the system will not let anyone skip."),
    rules: [
      l("Uva de una parcela bajo la altura mínima no entra a un lote de singani", "Grapes from a plot below the minimum altitude cannot enter a singani lot"),
      l("Quien pesa la uva no puede aprobarla", "Whoever weighs the grapes cannot approve them"),
      l("No se embotella antes de cumplir el reposo", "No bottling before the resting period is over"),
      l("No se declaran más botellas que litros hay", "No more bottles declared than there are litres"),
      l("Un expediente cerrado ya no se corrige", "A closed dossier can no longer be edited"),
    ],
    notes: l(
      "La diferencia con una hoja de cálculo: aquí las reglas las hace cumplir el servidor. Una bodega no puede declarar algo que su propia producción contradice.",
      "The difference with a spreadsheet: here the server enforces the rules. A winery cannot declare something its own production contradicts.",
    ),
  },

  expediente: {
    section: l("El sello", "The seal"),
    title: l("Un expediente sellado y un código por botella", "A sealed dossier and one code per bottle"),
    blocks: [
      {
        label: l("Código de lote", "Lot code"),
        value: "CVJ-2026-SINGANI-004",
        body: l("Bodega, año, tipo y correlativo.", "Winery, year, type and sequence."),
      },
      {
        label: l("Código de botella", "Bottle code"),
        value: "K7M2-Q9XM",
        body: l("Único, al azar e imposible de adivinar.", "Unique, random and impossible to guess."),
      },
      {
        label: l("Huella del expediente", "Dossier fingerprint"),
        value: "ea261238…7d27c1bb",
        body: l("Si cambia una coma, la huella cambia.", "Change one comma and the fingerprint changes."),
      },
    ],
    foot: l(
      "Una etiqueta copiada repite un código que ya existe; una inventada no pasa la comprobación.",
      "A copied label repeats a code that already exists; an invented one fails the check.",
    ),
    notes: l(
      "Al cerrar el lote, todo lo registrado se sella con una huella digital. Y cada botella recibe su propio código: esa es la defensa contra la falsificación.",
      "When the lot closes, everything recorded is sealed with a fingerprint. And each bottle gets its own code: that is the defence against counterfeiting.",
    ),
  },

  pasaporte: {
    section: l("El pasaporte", "The passport"),
    title: l("Escanea la etiqueta. Lee la historia", "Scan the label. Read the story"),
    lead: l(
      "Sin instalar nada y sin crear una cuenta: la cámara del teléfono abre el pasaporte de esa botella.",
      "Nothing to install, no account to create: the phone camera opens that bottle's passport.",
    ),
    rows: [
      l("Origen · parcela y Denominación de Origen", "Origin · plot and Denomination of Origin"),
      l("Elaboración · de la vendimia al embotellado", "Making · from harvest to bottling"),
      l("Laboratorio · cada parámetro con su límite", "Laboratory · each parameter with its limit"),
      l("Registro · qué se hizo, cuándo y qué rol", "Record · what was done, when and by which role"),
      l("Expediente · huella anclada en Stellar", "Dossier · fingerprint anchored on Stellar"),
    ],
    phone: {
      winery: l("Destilería · Valle de Cinti", "Distillery · Cinti Valley"),
      lot: "Singani Gran Reserva 2026",
      bottle: l("Botella n.º 1.234 de 2.950", "Bottle no. 1,234 of 2,950"),
      ok: l("Botella auténtica", "Authentic bottle"),
    },
    qr: l("Pruébalo ahora", "Try it now"),
    notes: l(
      "Invito al jurado a escanear este QR: es un pasaporte real de la plataforma. Muestra el origen, la elaboración, el laboratorio y la huella del expediente.",
      "I invite the jury to scan this QR: it is a real passport on the platform. It shows origin, production, laboratory results and the dossier fingerprint.",
    ),
  },

  marketplace: {
    section: l("Marketplace", "Marketplace"),
    title: l("El mercado de los vinos y singanis de altura", "The marketplace for high-altitude wines and singanis"),
    lead: l(
      "La bodega vende directo y conoce a su cliente. Quien compra sabe exactamente qué recibe.",
      "The winery sells direct and knows its customer. The buyer knows exactly what they are getting.",
    ),
    steps: [
      {
        head: l("Descubre", "Discover"),
        body: l("Bodegas, parcelas, altitud, añada y la familia detrás de cada botella.", "Wineries, plots, altitude, vintage and the family behind every bottle."),
      },
      {
        head: l("Adquiere", "Buy"),
        body: l("Botellas exclusivas y lotes que aún maduran, en preventa.", "Exclusive bottles and lots still maturing, on pre-sale."),
      },
      {
        head: l("Colecciona", "Collect"),
        body: l("Cada botella es un NFT en su cava digital: la guarda, la regala o la transfiere.", "Every bottle is an NFT in their digital cellar: keep it, gift it or transfer it."),
      },
    ],
    notes: l(
      "El Marketplace conecta a la bodega con el comprador final. La botella física se queda en guarda en la bodega; el comprador tiene su propiedad digital.",
      "The Marketplace connects the winery with the final buyer. The physical bottle stays in the winery's cellar; the buyer holds digital ownership.",
    ),
  },

  stellar: {
    section: l("Tecnología", "Technology"),
    title: l("Blockchain simple, seguridad real", "Simple blockchain, real security"),
    lead: l(
      "Invisible para quien compra. Comprobable para cualquiera.",
      "Invisible to the buyer. Verifiable by anyone.",
    ),
    stats: [
      { value: l("1 = 1", "1 = 1"), label: l("Un NFT por botella, vinculado a su etiqueta", "One NFT per bottle, tied to its label") },
      { value: l("3–5 s", "3–5 s"), label: l("Para confirmar una transacción", "To confirm a transaction") },
      { value: l("< US$ 0,001", "< US$ 0.001"), label: l("Costo por transacción", "Cost per transaction") },
    ],
    flow: [
      { head: l("Bodega", "Winery"), body: l("Emite el lote: un NFT por botella", "Mints the lot: one NFT per bottle") },
      { head: l("Red Stellar", "Stellar network"), body: l("Registro inalterable y público", "Tamper-proof, public record") },
      { head: l("Comprador", "Buyer"), body: l("Propiedad verificada en su cuenta", "Verified ownership in their account") },
    ],
    foot: l(
      "Contrato NFT por bodega sobre Soroban y OpenZeppelin. La huella de cada expediente queda anclada en la red: nadie tiene que confiar en nosotros.",
      "One NFT contract per winery on Soroban and OpenZeppelin. Each dossier's fingerprint is anchored on the network: nobody has to trust us.",
    ),
    notes: l(
      "Elegimos Stellar por tres razones: es rápida, cuesta fracciones de centavo y permite liquidar en moneda local o stablecoins. El usuario nunca ve la palabra blockchain.",
      "We chose Stellar for three reasons: it is fast, it costs fractions of a cent and it settles in local currency or stablecoins. The user never sees the word blockchain.",
    ),
  },

  traccion: {
    section: l("Tracción · octubre 2026", "Traction · October 2026"),
    title: l("Fuimos a preguntarle a las bodegas", "We went and asked the wineries"),
    lead: l(
      "La primera semana de octubre el equipo viajó a Tarija para sondear el mercado: visitó bodegas, mostró la plataforma y recogió sus observaciones.",
      "In the first week of October the team travelled to Tarija to sound out the market: we visited wineries, showed the platform and gathered their feedback.",
    ),
    stats: [
      { value: "5", label: l("Bodegas visitadas", "Wineries visited") },
      { value: "1", label: l("Primera bodega cerrada", "First winery signed") },
      { value: "1", label: l("Alianza académica", "Academic alliance") },
    ],
    notes: l(
      "Visitamos cinco bodegas, entre ellas Bodega Daroca, Bodega Barbacana y El Cañón Escondido. Volvimos con nuestra primera bodega cerrada y una alianza con la Universidad Católica.",
      "We visited five wineries, among them Bodega Daroca, Bodega Barbacana and El Cañón Escondido. We came back with our first winery signed and an alliance with the Catholic University.",
    ),
  },

  aprendizajes: {
    section: l("Lo que escuchamos", "What we heard"),
    quote: l(
      "Si una barrica se echa a perder, necesitamos saber de qué lote viene y por qué.",
      "If a barrel spoils, we need to know which lot it came from and why.",
    ),
    source: l("Lo que nos dijeron las bodegas de Tarija", "What the wineries of Tarija told us"),
    items: [
      l("La mayoría no maneja su producción con un sistema", "Most do not manage their production with a system"),
      l("Quieren rastrear un problema hasta su origen y actuar a tiempo", "They want to trace a problem back to its source and act in time"),
      l("Piden una herramienta hecha para su proceso, no adaptada", "They ask for a tool built for their process, not adapted to it"),
    ],
    notes: l(
      "Este comentario lo escuchamos en más de una bodega: cuando algo sale mal en la fermentación o en una barrica, hoy no pueden rastrearlo. El ERP resuelve exactamente eso.",
      "We heard this in more than one winery: when something goes wrong in fermentation or in a barrel, today they cannot trace it. The ERP solves exactly that.",
    ),
  },

  daroca: {
    section: l("Primera bodega", "First winery"),
    title: l("Bodega Daroca", "Bodega Daroca"),
    kicker: l("Viñedos y bodega boutique · Tarija · Desde 1920", "Boutique vineyards and winery · Tarija · Since 1920"),
    lead: l(
      "Nuestra primera bodega. Con su equipo estamos validando y calibrando el ERP sobre su producción real, rumbo al lanzamiento oficial.",
      "Our first winery. With their team we are validating and calibrating the ERP on their real production, on the way to the official launch.",
    ),
    facts: [
      l("Más de un siglo de tradición familiar", "More than a century of family tradition"),
      l("Vinos de altura: Syrah, Tannat, Oporto y Blend", "High-altitude wines: Syrah, Tannat, Port-style and Blend"),
      l("Singani premium", "Premium singani"),
    ],
    notes: l(
      "Bodega Daroca es una bodega boutique familiar de Tarija, con más de cien años. Su equipo está recorriendo la plataforma y nos entrega observaciones; con eso calibramos el software antes de abrirlo a todas las bodegas.",
      "Bodega Daroca is a family boutique winery in Tarija, more than a hundred years old. Their team is going through the platform and giving us feedback; with it we calibrate the software before opening it to every winery.",
    ),
  },

  ucb: {
    section: l("Alianza académica", "Academic alliance"),
    title: l("La academia, de nuestro lado", "Academia on our side"),
    kicker: l("Carrera de Enología · Universidad Católica Boliviana · Tarija", "Oenology programme · Universidad Católica Boliviana · Tarija"),
    lead: l(
      "Una alianza para crecer juntos: la carrera forma a sus estudiantes con una herramienta real y nosotros llegamos, de su mano, a todas las bodegas de Tarija.",
      "An alliance to grow together: the programme trains its students on a real tool and, alongside them, we reach every winery in Tarija.",
    ),
    facts: [
      l("Formación de futuros enólogos sobre la plataforma", "Future oenologists trained on the platform"),
      l("Convocatoria conjunta a las bodegas de la región", "A joint call to the wineries of the region"),
      l("Firma del convenio: noviembre de 2026", "Agreement to be signed: November 2026"),
    ],
    notes: l(
      "Acordamos una alianza con la carrera de Enología de la Universidad Católica en Tarija. En noviembre volvemos para firmar el convenio. Ellos convocan a las bodegas para el lanzamiento.",
      "We agreed an alliance with the Oenology programme of the Catholic University in Tarija. In November we return to sign the agreement. They will convene the wineries for the launch.",
    ),
  },

  lanzamiento: {
    section: l("Próximo hito", "Next milestone"),
    title: l("Lanzamiento oficial en Tarija", "Official launch in Tarija"),
    date: l("21 · XI · 2026", "21 · XI · 2026"),
    lead: l(
      "El ERP se abre a todas las bodegas que quieran ser parte, junto a la Universidad Católica y Bodega Daroca.",
      "The ERP opens to every winery that wants to join, together with the Catholic University and Bodega Daroca.",
    ),
    items: [
      l("ERP abierto de forma oficial", "The ERP officially open"),
      l("Presentación de beneficios a las bodegas convocadas", "Benefits presented to the invited wineries"),
      l("Anuncio de las siguientes fases: tokenización y Marketplace", "Next phases announced: tokenisation and Marketplace"),
    ],
    notes: l(
      "El 21 de noviembre, fecha tentativa, lanzamos oficialmente en Tarija, con la universidad, con Daroca y con las bodegas que ellos convoquen.",
      "On 21 November, tentative date, we launch officially in Tarija, with the university, with Daroca and with the wineries they convene.",
    ),
  },

  negocio: {
    section: l("Modelo de negocio", "Business model"),
    title: l("Cómo ganamos", "How we make money"),
    cards: [
      { head: l("ERP para bodegas", "ERP for wineries"), body: PENDING },
      { head: l("Marketplace", "Marketplace"), body: PENDING },
      { head: l("Tokenización", "Tokenisation"), body: PENDING },
    ],
    notes: l("Pendiente: definir con el equipo las fuentes de ingreso y sus precios.", "Pending: the team still has to define revenue streams and pricing."),
  },

  ruta: {
    section: l("La ruta", "Roadmap"),
    title: l("Lo construido y lo que viene", "What is built and what comes next"),
    points: [
      {
        when: l("Hecho", "Done"),
        head: l("La plataforma", "The platform"),
        body: l("ERP, pasaporte de botella, back office y contrato NFT en Stellar.", "ERP, bottle passport, back office and NFT contract on Stellar."),
      },
      {
        when: l("Octubre 2026", "October 2026"),
        head: l("Tarija", "Tarija"),
        body: l("Cinco bodegas visitadas, primera bodega y alianza con la UCB.", "Five wineries visited, first winery and alliance with UCB."),
      },
      {
        when: l("Noviembre 2026", "November 2026"),
        head: l("Lanzamiento oficial", "Official launch"),
        body: l("ERP abierto a las bodegas de Tarija.", "ERP open to the wineries of Tarija."),
      },
      {
        when: l("2027", "2027"),
        head: l("Marketplace y expansión", "Marketplace and expansion"),
        body: l("Preventa, cava digital y más bodegas de Tarija y Cinti.", "Pre-sale, digital cellar and more wineries from Tarija and Cinti."),
      },
    ],
    notes: l(
      "La plataforma está construida. Octubre fue validación en terreno, noviembre es el lanzamiento, y 2027 es el Marketplace y la expansión a más bodegas.",
      "The platform is built. October was field validation, November is the launch, and 2027 is the Marketplace and the expansion to more wineries.",
    ),
  },

  equipo: {
    section: l("El equipo", "The team"),
    title: l("Quiénes somos", "Who we are"),
    people: [
      { name: "Kevin Gomez", role: l("CEO y Co-founder", "CEO & Co-founder"), photo: "kevin-perfil2026.png", founder: true },
      { name: "Vanessa Cárdenas", role: l("Presidente y Co-founder", "President & Co-founder"), photo: "equipo-vanessa.jpg", founder: true },
      { name: "Diego Vargas", role: l("CTO y Co-founder", "CTO & Co-founder"), photo: "diego-perfil.jpeg", founder: true },
      { name: "Clara Bottler", role: l("Sommelier · Curaduría enológica", "Sommelier · Wine curation"), photo: "equipo-clara.jpg", founder: false },
    ],
    founders: l("Equipo fundador", "Founding team"),
    notes: l(
      "Somos tres fundadores: Kevin, Vanessa y Diego. Nos acompaña Clara Bottler, sommelier, en la curaduría enológica.",
      "We are three founders: Kevin, Vanessa and Diego. Clara Bottler, sommelier, joins us on wine curation.",
    ),
  },

  cierre: {
    section: l("Cierre", "Closing"),
    title: l("Sé parte de la primera red de vinos y singanis tokenizados de Bolivia", "Be part of Bolivia's first network of tokenised wines and singanis"),
    ask: { label: l("Lo que buscamos", "What we are looking for"), body: PENDING },
    contact: "contacto@drinksonchain.bo",
    site: "www.drinksonchain.com",
    notes: l("Adaptar el pedido a cada presentación: grant, programa o reunión.", "Tailor the ask to each presentation: grant, programme or meeting."),
  },
} as const;
