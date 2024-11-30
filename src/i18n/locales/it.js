export default {
  translation: {
    nav: {
      home: "Home",
      simulator: "Simulatore",
      molecules: "Libreria molecolare",
      about: "Chi siamo",
      organicReaction: "Animazione",
      keyframeEditor: "Editor fotogrammi chiave",
    },
    home: {
      title: "Visualizzazione 3D delle reazioni chimiche",
      subtitle:
        "Esplora i misteri delle reazioni chimiche attraverso la visualizzazione 3D interattiva",
      startButton: "Inizia esperienza",
      learnMore: "Scopri di più",
      features: {
        simulation: {
          title: "Simulazione in tempo reale",
          description:
            "Sperimenta le reazioni chimiche in un ambiente 3D in tempo reale",
        },
        interaction: {
          title: "Apprendimento interattivo",
          description:
            "Interagisci con le molecole e osserva il loro comportamento",
        },
        learning: {
          title: "Strumento educativo",
          description:
            "Impara la chimica attraverso esperienze visive e interattive",
        },
      },
    },
    simulator: {
      title: "Simulatore",
      controls: {
        start: "Avvia simulazione",
        stop: "Ferma simulazione",
        reset: "Reimposta",
        temperature: "Temperatura",
        pressure: "Pressione",
        addWater: "Aggiungi acqua (H₂O)",
        addHydrogen: "Aggiungi idrogeno (H₂)",
        addAmmonia: "Aggiungi ammoniaca (NH₃)",
        addAmmoniaHydrate: "Aggiungi idrato di ammoniaca (NH₃·H₂O)",
        addChlorine: "Aggiungi cloro (Cl₂)",
        addHypochlorousAcid: "Aggiungi acido ipocloroso (HClO)",
        addHydrochloricAcid: "Aggiungi acido cloridrico (HCl)",
        addNitrogen: "Aggiungi azoto (N₂)",
        addOxygen: "Aggiungi ossigeno (O₂)",
        addHydrogenPeroxide: "Aggiungi perossido di idrogeno (H₂O₂)",
        moleculeCount: "Conteggio molecole",
        addCarbon: "Aggiungi carbonio (C)",
        addCarbonicAcid: "Aggiungi acido carbonico (H₂CO₃)",
        addAmmoniumBicarbonate: "Aggiungi bicarbonato di ammonio (NH₄HCO₃)",
      },
    },
    molecules: {
      title: "Libreria molecolare",
      water: "Molecola d'acqua",
      waterDesc:
        "La molecola d'acqua è una delle sostanze chimiche più fondamentali",
      categories: {
        organic: "Molecole organiche",
        inorganic: "Molecole inorganiche",
        common: "Molecole comuni",
      },
      details: {
        formula: "Formula chimica",
        structure: "Struttura",
        properties: "Proprietà",
        applications: "Applicazioni",
      },
    },
    about: {
      title: "Chi siamo",
      description:
        "Un sistema di visualizzazione 3D delle reazioni chimiche basato su Three.js e React",
      features: {
        title: "Caratteristiche del progetto",
        visualization: "Visualizzazione 3D in tempo reale",
        interaction: "Simulazione molecolare interattiva",
        education: "Dimostrazione educativa delle reazioni",
      },
      team: {
        title: "Il nostro team",
        description: "Un gruppo di sviluppatori e chimici appassionati",
      },
      technology: {
        title: "Stack tecnologico",
        description: "Costruito con tecnologie web moderne",
      },
    },
    footer: {
      projectName: "Visualizzazione 3D delle reazioni chimiche",
      projectSubtitle: "Reazione chimica 3D",
      description:
        "Una piattaforma interattiva di visualizzazione 3D per le reazioni chimiche",
      quickLinks: {
        title: "Link rapidi",
        about: "Chi siamo",
        contact: "Contatti",
        help: "Aiuto",
      },
      contact: {
        title: "Contatti",
        email: "Email: ?????@?????.com",
        github:
          "GitHub: https://github.com/qwewhy/Chemviz3D-3D_chemical_reaction_visualization",
      },
    },
    organicReaction: {
      dropZoneHint: "Trascina qui il file .chemx",
      supportedFormats: "Supporta file in formato .chemx",
      controls: "Controlli animazione",
      play: "Riproduci",
      pause: "Pausa",
      reset: "Reimposta",
      export: "Esporta .chemx",
    },
    bonds: {
      types: {
        ionic: {
          name: "Legame ionico",
          description: "Attrazione elettrostatica tra ioni con cariche opposte",
        },
        metallic: {
          name: "Legame metallico",
          description:
            "Legami metallici formati dal condividimento di elettroni tra atomi di metallo",
        },
        covalent: {
          name: "Legame covalente",
          description:
            "Legame chimico formato dalla condivisione di coppie di elettroni tra atomi",
        },
      },
    },
    keyframeEditor: {
      hints: {
        addAtom: "Clicca sulla scena per aggiungere un atomo",
        addBond: "Clicca su due atomi per creare un legame",
        select:
          "Trascina per ruotare la vista, scorri per zoom, clic destro e trascina per muovere la camera",
      },
    },
    keyframePanel: {
      title: "Fotogrammi chiave",
      current: "Attuale: {{current}} / {{total}}",
      saveFrame: "Salva fotogramma corrente",
      keyframe: "Fotogramma chiave {{number}}",
      export: "Esporta file .chemx",
    },
    toolbar: {
      animationName: "Nome animazione",
      description: "Descrizione",
      select: "Seleziona",
      addAtom: "Aggiungi atomo",
      addBond: "Aggiungi legame",
      breakBond: "Rompi legame",
      undo: "Annulla",
      atomType: "Tipo di atomo:",
      bondType: "Tipo di legame:",
    },
    atoms: {
      H: "Idrogeno",
      B: "Boro",
      C: "Carbonio",
      N: "Azoto",
      O: "Ossigeno",
      F: "Fluoro",
      Na: "Sodio",
      Mg: "Magnesio",
      Al: "Alluminio",
      Si: "Silicio",
      P: "Fosforo",
      S: "Zolfo",
      Cl: "Cloro",
      K: "Potassio",
      Ca: "Calcio",
      As: "Arsenico",
      Se: "Selenio",
      Br: "Bromo",
      I: "Iodio",
      Pb: "Piombo",
      Fe: "Ferro",
      Cu: "Rame",
      Zn: "Zinco",
      Hg: "Mercurio",
    },
    sceneController: {
      bondCreation: {
        title: "Creazione legame",
        selectFirst: "Seleziona il primo atomo",
        startingAtom: "Atomo iniziale",
        selectTarget: "Seleziona l'atomo target",
      },
    },
    keyframeEditor: {
      hints: {
        addAtom: "Clicca sulla scena per aggiungere un atomo",
        addBond: "Clicca su due atomi per creare un legame",
        select:
          "Trascina per ruotare la vista, scorri per zoom, clic destro e trascina per muovere la camera",
      },
    },
    atomPositionEditor: {
      title: "Editor posizione atomo",
    },
    draggableAtom: {
      startAtom: " Atomo di partenza",
    },
    keyframeEditor: {
      maximumKeyframes: "Massimo 10 fotogrammi chiave consentiti",
      hints: {
        select: "Trascina per ruotare la vista, scorri per zoom, clic destro e trascina per muovere la camera"
      }  
    },
  },
};
