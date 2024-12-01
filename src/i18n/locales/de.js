export default {
  translation: {
    nav: {
      home: 'Startseite',
      simulator: 'Simulator',
      molecules: 'Molekülbibliothek',
      about: 'Über uns',
      organicReaction: 'Animation',
      keyframeEditor: 'Animationseditor'
    },
    home: {
      title: '3D-Visualisierung chemischer Reaktionen',
      subtitle: 'Erforschen Sie die Geheimnisse chemischer Reaktionen durch interaktive 3D-Visualisierung',
      startButton: 'Erlebnis starten',
      learnMore: 'Mehr erfahren',
      features: {
        simulation: {
          title: 'Echtzeit-Simulation',
          description: 'Erleben Sie chemische Reaktionen in einer 3D-Echtzeitumgebung'
        },
        interaction: {
          title: 'Interaktives Lernen',
          description: 'Interagieren Sie mit Molekülen und beobachten Sie ihr Verhalten'
        },
        learning: {
          title: 'Bildungswerkzeug',
          description: 'Lernen Sie Chemie durch visuelle und interaktive Erfahrungen'
        }
      }
    },
    simulator: {
      title: 'Simulator',
      controls: {
        start: 'Simulation starten',
        stop: 'Simulation stoppen',
        reset: 'Zurücksetzen',
        temperature: 'Temperatur',
        pressure: 'Druck',
        addWater: 'Wasser hinzufügen (H₂O)',
        addHydrogen: 'Wasserstoff hinzufügen (H₂)',
        addAmmonia: 'Ammoniak hinzufügen (NH₃)',
        addAmmoniaHydrate: 'Ammoniakhydrat hinzufügen (NH₃·H₂O)',
        addChlorine: 'Chlor hinzufügen (Cl₂)',
        addHypochlorousAcid: 'Hypochlorige Säure hinzufügen (HClO)',
        addHydrochloricAcid: 'Salzsäure hinzufügen (HCl)',
        addNitrogen: 'Stickstoff hinzufügen (N₂)',
        addOxygen: 'Sauerstoff hinzufügen (O₂)',
        addHydrogenPeroxide: 'Wasserstoffperoxid hinzufügen (H₂O₂)',
        moleculeCount: 'Molekülanzahl',
        addCarbon: 'Kohlenstoff hinzufügen (C)',
        addCarbonicAcid: 'Kohlensäure hinzufügen (H₂CO₃)',
        addAmmoniumBicarbonate: 'Ammoniumbicarbonat hinzufügen (NH₄HCO₃)'
      }
    },
    molecules: {
      title: 'Molekülbibliothek',
      water: 'Wassermolekül',
      waterDesc: 'Das Wassermolekül ist einer der grundlegendsten chemischen Substanzen',
      categories: {
        organic: 'Organische Moleküle',
        inorganic: 'Anorganische Moleküle',
        common: 'Häufige Moleküle'
      },
      details: {
        formula: 'Chemische Formel',
        structure: 'Struktur',
        properties: 'Eigenschaften',
        applications: 'Anwendungen'
      }
    },
    about: {
      title: 'Über uns',
      description: 'Dies ist ein 3D-Visualisierungssystem für chemische Reaktionen basierend auf Three.js und React',
      features: {
        title: 'Projektmerkmale',
        visualization: 'Echtzeit-3D-Visualisierung',
        interaction: 'Interaktive Molekülsimulation',
        education: 'Lehrreiche Reaktionsdemonstration'
      },
      team: {
        title: 'Unser Team',
        description: 'Eine Gruppe leidenschaftlicher Entwickler und Chemiker'
      },
      technology: {
        title: 'Technologie-Stack',
        description: 'Entwickelt mit modernen Webtechnologien'
      }
    },
    footer: {
      projectName: '3D-Visualisierung chemischer Reaktionen',
      projectSubtitle: 'Chemische Reaktion 3D',
      description: 'Eine interaktive 3D-Visualisierungsplattform für chemische Reaktionen',
      quickLinks: {
        title: 'Schnelllinks',
        about: 'Über uns',
        contact: 'Kontakt',
        help: 'Hilfe'
      },
      contact: {
        title: 'Kontakt',
        email: 'E-Mail: ?????@?????.com',
        github: 'GitHub: https://github.com/qwewhy/Chemviz3D-3D_chemical_reaction_visualization'
      }
    },
    organicReaction: {
      dropZoneHint: '.chemx-Datei hier ablegen',
      supportedFormats: 'Unterstützt .chemx-Formatdateien',
      controls: 'Animationssteuerung',
      play: 'Abspielen',
      pause: 'Pause',
      reset: 'Zurücksetzen',
      export: '.chemx exportieren'
    },
    bonds: {
      types: {
        ionic: {
          name: "Ionenbindung",
          description: "Elektrostatische Anziehung zwischen entgegengesetzt geladenen Ionen"
        },
        metallic: {
          name: "Metallische Bindung",
          description: "Metallische Bindungen, die durch das gemeinsame Teilen von Elektronen zwischen Metallatomen entstehen"
        },
        covalent: {
          name: "Kovalente Bindung",
          description: "Chemische Bindung durch gemeinsame Elektronenpaare zwischen Atomen"
        },
        hydrogen: {
          name: "Wasserstoffbindung",
          description: "Wasserstoffbindung zwischen Wasserstoffatomen und anderen Atomen"
        },
        pi: {
          name: "Pi-Bindung",
          description: "Pi-Bindung durch gemeinsames π-Elektronen-Wolke zwischen mehreren Atomen"
        } 
      }
    },
    keyframeEditor: {
      title: "Animationseditor",
      maximumKeyframes: "Maximal 10 Keyframes erlaubt",
      hints: {
        addAtom: "Klicken Sie auf die Szene, um ein Materialien hinzuzufügen",
        addBond: "Klicken Sie auf zwei Materialien, um eine Bindung zu erstellen",
        select: "Ziehen zum Drehen der Ansicht, Scrollen zum Zoomen, Rechtsklick und Ziehen zum Bewegen der Kamera, Material anklicken um Position zu ändern",
        deleteAtom: 'Materialien anklicken um zu löschen',
        breakBond: 'Bindung anklicken um zu brechen'
      },
      importantNotes: {
        title: "Wichtige Hinweise",
        note1: "Bitte platzieren Sie alle erforderlichen Atome und bauen Sie die initiale Molekülstruktur in der ersten Keyframe ein. Alle chemischen Reaktionen sollten den Atomerhaltung folgen.",
        note2: "Bitte erstellen Sie von der ersten bis zur letzten Keyframe der chemischen Reaktion in der richtigen Reihenfolge. In den nachfolgenden Keyframes können Atome nur bewegt werden; positive und negative Ladungen können erstellt, bewegt und gelöscht werden; und chemische Bindungen können in jedem Frame gebrochen und verbunden werden, um die Animation der chemischen Reaktion zu erreichen.",
        note3: "Wenn Sie Moleküle, chemische Bindungen oder Ladungen, die sich unter der Ebene (y=0) befinden, betätigen, drehen Sie bitte die Kamera auf die Unterseite der Ebene, bevor Sie betätigen, und alle Szenenoperationen werden nur auf der Seite der Kamera's Ebene ausgeführt.",
        note4: "Nachdem jedes Frame der Animation abgeschlossen ist, muss die aktuelle Keyframe gespeichert werden. Nachdem alle Keyframes abgeschlossen sind, ziehen Sie die exportierte .chemx-Datei direkt in das Animationfenster, um Ihre Animation zu sehen."
      }   
    },
    keyframePanel: {
      title: "Keyframes",
      current: "Aktuell: {{current}} / 20",
      saveFrame: "Aktuellen Frame speichern",
      keyframe: "Keyframe {{number}}",
      export: ".chemx-Datei exportieren",
      createNewFrame: "Neuen Keyframe erstellen"  
    },
    toolbar: {
      animationName: "Animationsname",
      description: "Beschreibung",
      select: "Auswählen",
      addAtom: "Material hinzufügen",
      addBond: "Bindung hinzufügen",
      breakBond: "Bindung brechen",
      undo: "Rückgängig",
      atomType: "Materialtyp:",
      bondType: "Bindungstyp:",
      deleteAtom: 'Material löschen'    
    },
    atoms: {
      H: "Wasserstoff",
      B: "Bor",
      C: "Kohlenstoff",
      N: "Stickstoff",
      O: "Sauerstoff",
      F: "Fluor",
      Na: "Natrium",
      Mg: "Magnesium",
      Al: "Aluminium",
      Si: "Silizium",
      P: "Phosphor",
      S: "Schwefel",
      Cl: "Chlor",
      K: "Kalium",
      Ca: "Calcium",
      As: "Arsen",
      Se: "Selen",
      Br: "Brom",
      I: "Iod",
      Pb: "Blei",
      Fe: "Eisen",
      Cu: "Kupfer",
      Zn: "Zink",
      Hg: "Quecksilber",
      R: "Organische Funktionelle Gruppe",
      '+': "Positive Ladung",
      '-': "Negative Ladung",
      '?': "Unbekanntes Element"  
    },
    sceneController: {
      bondCreation: {
        title: "Bindungserstellung",
        selectFirst: "Bitte wählen Sie das erste Atom",
        startingAtom: "Startatom",
        selectTarget: "Bitte wählen Sie das Zielatom"
      }
    },
    atomPositionEditor: {
      title: "Atomposition bearbeiten"
    },
    draggableAtom: {
      startAtom: " Startatom"
    }
  }
}; 