export default {
  translation: {
    nav: {
      home: 'Accueil',
      simulator: 'Simulateur',
      molecules: 'Bibliothèque de molécules',
      about: 'À propos',
      organicReaction: 'Animation',
      keyframeEditor: 'Éditeur de clés'
    },
    home: {
      title: 'Visualisation 3D des réactions chimiques',
      subtitle: 'Explorez les mystères des réactions chimiques grâce à la visualisation 3D interactive',
      startButton: 'Commencer l\'expérience',
      learnMore: 'En savoir plus',
      features: {
        simulation: {
          title: 'Simulation en temps réel',
          description: 'Expérimentez les réactions chimiques dans un environnement 3D en temps réel'
        },
        interaction: {
          title: 'Apprentissage interactif',
          description: 'Interagissez avec les molécules et observez leur comportement'
        },
        learning: {
          title: 'Outil éducatif',
          description: 'Apprenez la chimie à travers des expériences visuelles et interactives'
        }
      }
    },
    simulator: {
      title: 'Simulateur',
      controls: {
        start: 'Démarrer la simulation',
        stop: 'Arrêter la simulation',
        reset: 'Réinitialiser',
        temperature: 'Température',
        pressure: 'Pression',
        addWater: 'Ajouter de l\'eau (H₂O)',
        addHydrogen: 'Ajouter de l\'hydrogène (H₂)',
        addAmmonia: 'Ajouter de l\'ammoniac (NH₃)',
        addAmmoniaHydrate: 'Ajouter de l\'hydrate d\'ammoniac (NH₃·H₂O)',
        addChlorine: 'Ajouter du chlore (Cl₂)',
        addHypochlorousAcid: 'Ajouter de l\'acide hypochloreux (HClO)',
        addHydrochloricAcid: 'Ajouter de l\'acide chlorhydrique (HCl)',
        addNitrogen: 'Ajouter de l\'azote (N₂)',
        addOxygen: 'Ajouter de l\'oxygène (O₂)',
        addHydrogenPeroxide: 'Ajouter du peroxyde d\'hydrogène (H₂O₂)',
        moleculeCount: 'Nombre de molécules',
        addCarbon: 'Ajouter du carbone (C)',
        addCarbonicAcid: 'Ajouter de l\'acide carbonique (H₂CO₃)',
        addAmmoniumBicarbonate: 'Ajouter du bicarbonate d\'ammonium (NH₄HCO₃)'
      }
    },
    molecules: {
      title: 'Bibliothèque de molécules',
      water: 'Molécule d\'eau',
      waterDesc: 'La molécule d\'eau est l\'une des substances chimiques les plus fondamentales',
      categories: {
        organic: 'Molécules organiques',
        inorganic: 'Molécules inorganiques',
        common: 'Molécules courantes'
      },
      details: {
        formula: 'Formule chimique',
        structure: 'Structure',
        properties: 'Propriétés',
        applications: 'Applications'
      }
    },
    about: {
      title: 'À propos',
      description: 'Un système de visualisation 3D des réactions chimiques basé sur Three.js et React',
      features: {
        title: 'Caractéristiques du projet',
        visualization: 'Visualisation 3D en temps réel',
        interaction: 'Simulation moléculaire interactive',
        education: 'Démonstration éducative des réactions'
      },
      team: {
        title: 'Notre équipe',
        description: 'Un groupe de développeurs et de chimistes passionnés'
      },
      technology: {
        title: 'Stack technologique',
        description: 'Construit avec des technologies web modernes'
      }
    },
    footer: {
      projectName: 'Visualisation 3D des réactions chimiques',
      projectSubtitle: 'Réaction chimique 3D',
      description: 'Une plateforme interactive de visualisation 3D pour les réactions chimiques',
      quickLinks: {
        title: 'Liens rapides',
        about: 'À propos',
        contact: 'Contact',
        help: 'Aide'
      },
      contact: {
        title: 'Contact',
        email: 'Email : ?????@?????.com',
        github: 'GitHub : https://github.com/qwewhy/Chemviz3D-3D_chemical_reaction_visualization'
      }
    },
    organicReaction: {
      dropZoneHint: 'Déposez le fichier .chemx ici',
      supportedFormats: 'Prend en charge les fichiers au format .chemx',
      controls: 'Contrôles d\'animation',
      play: 'Lecture',
      pause: 'Pause',
      reset: 'Réinitialiser',
      export: 'Exporter .chemx'
    },
    bonds: {
      types: {
        ionic: {
          name: "Liaison ionique",
          description: "Attraction électrostatique entre des ions de charges opposées"
        },
        metallic: {
          name: "Liaison métallique",
          description: "Liaisons métalliques formées par le partage d'électrons entre atomes de métal"
        },
        covalent: {
          name: "Liaison covalente",
          description: "Liaison chimique formée par le partage de paires d'électrons entre atomes"
        },
        hydrogen: {
          name: "Liaison hydrogène",
          description: "Liaison hydrogène entre atomes d'hydrogène et d'autres atomes"
        },
        pi: {
          name: "Liaison π",
          description: "Liaison π formée par le partage de nuage π entre plusieurs atomes"
        } 
      }
    },
    keyframeEditor: {
      title: "Éditeur d'animation",
      maximumKeyframes: "Maximum 10 images clés autorisées",
      hints: {
        addAtom: "Cliquez sur la scène pour ajouter un matériau", 
        addBond: "Cliquez sur deux matériaux pour créer une liaison",
        select: "Faites glisser pour faire pivoter la vue, défilez pour zoomer, clic droit et glisser pour déplacer la caméra, cliquer sur un matériau pour le déplacer",
        deleteAtom: 'Cliquer sur un matériau pour le supprimer',
        breakBond: 'Cliquer sur une liaison pour la casser' 
      },
      importantNotes: {
        title: "Important Notes",
        note1: "Please place all required atoms and build the initial molecular structure in the first frame. All chemical reactions should follow atomic conservation.",
        note2: "Please create from the first frame to the last frame of the chemical reaction in order. In the subsequent keyframes, atoms can only be moved; positive and negative charges can be created, moved, and deleted; and chemical bonds can be broken and connected in each frame to achieve the animation effect of the chemical reaction.",
        note3: "When operating molecules, chemical bonds, or charges located below the plane grid (y=0), please rotate the camera to the bottom of the plane grid before operating, and all scene operations will only operate on the side of the camera's grid.",
        note4: "After each frame of animation is completed, the current keyframe must be saved. After all keyframes are completed, drag the exported .chemx file directly into the animation window to see your animation."
      }     
    },
    keyframePanel: {
      title: "Images clés",
      current: "Actuel : {{current}} / 20",
      saveFrame: "Enregistrer l'image actuelle",
      keyframe: "Image clé {{number}}",
      export: "Exporter le fichier .chemx",
      createNewFrame: "Créer une nouvelle image clé"    
    },
    toolbar: {
      animationName: "Nom de l'animation",
      description: "Description",
      select: "Sélectionner",
      addAtom: "Ajouter un matériau",
      addBond: "Ajouter une liaison",
      breakBond: "Rompre la liaison",
      undo: "Annuler",
      atomType: "Type de matériau :", 
      bondType: "Type de liaison :",
      deleteAtom: 'Supprimer matériau'
    },
    atoms: {
      H: "Hydrogène",
      B: "Bore",
      C: "Carbone",
      N: "Azote",
      O: "Oxygène",
      F: "Fluor",
      Na: "Sodium",
      Mg: "Magnésium",
      Al: "Aluminium",
      Si: "Silicium",
      P: "Phosphore",
      S: "Soufre",
      Cl: "Chlore",
      K: "Potassium",
      Ca: "Calcium",
      As: "Arsenic",
      Se: "Sélénium",
      Br: "Brome",
      I: "Iode",
      Pb: "Plomb",
      Fe: "Fer",
      Cu: "Cuivre",
      Zn: "Zinc",
      Hg: "Mercure",
      R: "Groupe fonctionnel organique",
      '+': "Charge positive",
      '-': "Charge négative",
      '?': "Élément inconnu"  
    },
    sceneController: {
      bondCreation: {
        title: "Création de liaison",
        selectFirst: "Veuillez sélectionner le premier atome",
        startingAtom: "Atome de départ",
        selectTarget: "Veuillez sélectionner l'atome cible"
      }
    },
    atomPositionEditor: {
      title: "Éditeur de position atomique"
    },
    draggableAtom: {
      startAtom: " Atome de départ"
    }
  }
}; 