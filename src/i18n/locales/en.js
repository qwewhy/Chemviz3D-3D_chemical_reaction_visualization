export default {
  translation: {
    nav: {
      home: 'Home',
      simulator: 'Simulator',
      molecules: 'Molecules',
      about: 'About',
      organicReaction: 'Animation',
      keyframeEditor: 'Animation Editor'
    },
    home: {
      title: 'Chemical Reaction 3D Visualization',
      subtitle: 'Explore the mysteries of chemical reactions through interactive 3D visualization',
      startButton: 'Start Experience',
      learnMore: 'Learn More',
      features: {
        simulation: {
          title: 'Real-time Simulation',
          description: 'Experience chemical reactions in real-time 3D environment'
        },
        interaction: {
          title: 'Interactive Learning',
          description: 'Interact with molecules and observe their behavior'
        },
        learning: {
          title: 'Educational Tool',
          description: 'Learn chemistry through visual and interactive experiences'
        }
      }
    },
    simulator: {
      title: 'Simulator',
      controls: {
        start: 'Start Simulation',
        stop: 'Stop Simulation',
        reset: 'Reset',
        temperature: 'Temperature',
        pressure: 'Pressure',
        addWater: 'Add Water (H₂O)',
        addHydrogen: 'Add Hydrogen (H₂)',
        addAmmonia: 'Add Ammonia (NH₃)',
        addAmmoniaHydrate: 'Add Ammonia Hydrate (NH₃·H₂O)',
        addChlorine: 'Add Chlorine (Cl₂)',
        addHypochlorousAcid: 'Add Hypochlorous Acid (HClO)',
        addHydrochloricAcid: 'Add Hydrochloric Acid (HCl)',
        addNitrogen: 'Add Nitrogen (N₂)',
        addOxygen: 'Add Oxygen (O₂)',
        addHydrogenPeroxide: 'Add Hydrogen Peroxide (H₂O₂)',
        moleculeCount: 'Molecule Count',
        addCarbon: 'Add Carbon (C)',
        addCarbonicAcid: 'Add Carbonic Acid (H₂CO₃)',
        addAmmoniumBicarbonate: 'Add Ammonium Bicarbonate (NH₄HCO₃)'
      }
    },
    molecules: {
      title: 'Molecule Library',
      water: 'Water Molecule',
      waterDesc: 'Water molecule is one of the most basic chemical substances',
      categories: {
        organic: 'Organic Molecules',
        inorganic: 'Inorganic Molecules',
        common: 'Common Molecules'
      },
      details: {
        formula: 'Chemical Formula',
        structure: 'Structure',
        properties: 'Properties',
        applications: 'Applications'
      }
    },
    about: {
      title: 'About Us',
      description: 'This is a 3D chemical reaction visualization system based on Three.js and React',
      features: {
        title: 'Project Features',
        visualization: 'Real-time 3D visualization',
        interaction: 'Interactive molecular simulation',
        education: 'Educational reaction demonstration'
      },
      team: {
        title: 'Our Team',
        description: 'A group of passionate developers and chemists'
      },
      technology: {
        title: 'Technology Stack',
        description: 'Built with modern web technologies'
      }
    },
    footer: {
      projectName: 'Chemical Reaction 3D Visualization',
      projectSubtitle: 'Chemical Reaction 3D',
      description: 'An interactive 3D visualization platform for chemical reactions',
      quickLinks: {
        title: 'Quick Links',
        about: 'About Us',
        contact: 'Contact',
        help: 'Help'
      },
      contact: {
        title: 'Contact Us',
        email: 'Email: ?????@?????.com',
        github: 'GitHub: https://github.com/qwewhy/Chemviz3D-3D_chemical_reaction_visualization'
      }
    },
    organicReaction: {
      dropZoneHint: 'Drop .chemx file here',
      supportedFormats: 'Supports .chemx format files',
      controls: 'Animation Controls',
      play: 'Play',
      pause: 'Pause',
      reset: 'Reset',
      export: 'Export .chemx'
    },
    bonds: {
      types: {
        ionic: {
          name: "Ionic Bond",
          description: "Electrostatic attraction between oppositely charged ions"
        },
        metallic: {
          name: "Metallic Bond",
          description: "Metallic bonds formed by sharing electrons between metal atoms"
        },
        covalent: {
          name: "Covalent Bond",
          description: "Chemical bond formed by sharing electron pairs between atoms"
        },
        hydrogen: {
          name: "Hydrogen Bond",
          description: "Hydrogen bond formed between hydrogen atoms and other atoms"
        },
        pi: {
          name: "Pi Bond",
          description: "Pi bond formed by sharing π electron cloud among multiple atoms"
        } 
      }
    },
    keyframeEditor: {
      title: "Animation Editor",
      maximumKeyframes: "Maximum 10 Keyframes allowed",
      hints: {
        addAtom: "Click scene to add material",
        addBond: "Click two materials to create bond",
        select: "Drag to rotate view, scroll to zoom, right-click and drag to move camera, click material to move position",
        deleteAtom: 'Click material to delete',
        breakBond: 'Click bond to break'
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
      title: "Keyframes",
      current: "Current: {{current}} / 20",
      saveFrame: "Save Current Frame",
      keyframe: "Keyframe {{number}}",
      export: "Export .chemx",
      createNewFrame: "Create New Frame"  
    },
    toolbar: {
      animationName: "Animation Name",
      description: "Description",
      select: "Select",
      addAtom: "Add Material",
      addBond: "Add Bond",
      breakBond: "Break Bond",  
      undo: "Undo",
      atomType: "Material Type:",
      bondType: "Bond Type:",
      deleteAtom: 'Delete Material'  
    },
    atoms: {
      H: "Hydrogen",
      B: "Boron",
      C: "Carbon",
      N: "Nitrogen",
      O: "Oxygen",
      F: "Fluorine",
      Na: "Sodium",
      Mg: "Magnesium",
      Al: "Aluminum",
      Si: "Silicon",
      P: "Phosphorus",
      S: "Sulfur",
      Cl: "Chlorine",
      K: "Potassium",
      Ca: "Calcium",
      As: "Arsenic",
      Se: "Selenium",
      Br: "Bromine",
      I: "Iodine",
      Pb: "Lead",
      Fe: "Iron",
      Cu: "Copper",
      Zn: "Zinc",
      Hg: "Mercury",
      R: "Organic Functional Group",
      '+': "Positive Charge",
      '-': "Negative Charge",
      '?': "Unknown Element"  
    },
    sceneController: {
      bondCreation: {
        title: "Bond Creation",
        selectFirst: "Please select the first atom",
        startingAtom: "Starting Atom",
        selectTarget: "Please select the target atom"
      }
    },
    atomPositionEditor: {
      title: "Atom Position Editor"
    },
    draggableAtom: {
      startAtom: " Start Atom"
    }
  }
}; 