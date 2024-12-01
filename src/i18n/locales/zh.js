export default {
  translation: {
    nav: {
      home: '首页',
      simulator: '模拟器',
      molecules: '分子库',
      about: '关于',
      organicReaction: '动画',
      keyframeEditor: '动画编辑器'
    },
    home: {
      title: '化学反应3D可视化',
      subtitle: '通过交互式3D可视化技术探索化学反应的奥秘',
      startButton: '开始体验',
      learnMore: '了解更多',
      features: {
        simulation: {
          title: '实时模拟',
          description: '在3D环境中实时体验化学反应'
        },
        interaction: {
          title: '交互式学习',
          description: '与分子互动并观察其行为'
        },
        learning: {
          title: '教育工具',
          description: '通过视觉和交互式体验学习化学'
        }
      }
    },
    simulator: {
      title: '模拟器',
      controls: {
        start: '开始模拟',
        stop: '停止模拟',
        reset: '重置',
        temperature: '温度',
        pressure: '压力',
        addWater: '添加水分子 (H₂O)',
        addHydrogen: '添加氢气 (H₂)',
        addAmmonia: '添加氨气 (NH₃)',
        addAmmoniaHydrate: '添加一水合氨 (NH₃·H₂O)',
        addChlorine: '添加氯气 (Cl₂)',
        addHypochlorousAcid: '添加次氯酸 (HClO)',
        addHydrochloricAcid: '添加氯化氢 (HCl)',
        addNitrogen: '添加氮气 (N₂)',
        addOxygen: '添加氧气 (O₂)',
        addHydrogenPeroxide: '添加过氧化氢 (H₂O₂)',
        moleculeCount: '分子数量',
        addCarbon: '添加碳 (C)',
        addCarbonicAcid: '添加碳酸 (H₂CO₃)',
        addAmmoniumBicarbonate: '添加碳酸氢铵 (NH₄HCO₃)'
      }
    },
    molecules: {
      title: '分子库',
      water: '水分子',
      waterDesc: '水分子是最基本的化学物质之一',
      categories: {
        organic: '有机分子',
        inorganic: '无机分子',
        common: '常见分子'
      },
      details: {
        formula: '化学式',
        structure: '结构',
        properties: '性质',
        applications: '应用'
      }
    },
    about: {
      title: '关于我们',
      description: '这是一个基于Three.js和React的3D化学反应可视化系统',
      features: {
        title: '项目特点',
        visualization: '实时3D可视化',
        interaction: '交互式分子模拟',
        education: '教育性的反应演示'
      },
      team: {
        title: '我们团队',
        description: '一群充满热情的开发者和化学家'
      },
      technology: {
        title: '技术栈',
        description: '使用现代网络技术构建'
      }
    },
    footer: {
      projectName: '化学反应3D可视化',
      projectSubtitle: '化学反应3D',
      description: '一个交互式3D化学反应可视化平台',
      quickLinks: {
        title: '快速链接',
        about: '关于我们',
        contact: '联系我们',
        help: '帮助'
      },
      contact: {
        title: '联系我们',
        email: '邮箱：?????@?????.com',
        github: 'GitHub：https://github.com/qwewhy/Chemviz3D-3D_chemical_reaction_visualization'
      }
    },
    organicReaction: {
      dropZoneHint: '拖放.chemx文件到此处',
      supportedFormats: '支持.chemx格式文件',
      controls: '动画控制',
      play: '播放',
      pause: '暂停',
      reset: '重置',
      export: '导出.chemx'
    },
    bonds: {
      types: {
        ionic: {
          name: "离子键",
          description: "带有相反电荷的离子之间的静电引力"
        },
        metallic: {
          name: "金属键",
          description: "金属原子间通过电子云共享形成的键"
        },
        covalent: {
          name: "共价键",
          description: "原子间共用电子对形成的化学键"
        },
        hydrogen: {
          name: "氢键",
          description: "氢原子与其他原子形成的键"
        },
        pi: {
          name: "大π键",
          description: "多个原子共享的π电子云形成的键"
        }
      }
    },
    keyframeEditor: {
      title: "动画编辑器",
      maximumKeyframes: "最多允许20个关键帧",
      hints: {
        addAtom: "点击场景添加物质",
        addBond: "点击两个物质创建键",
        select: "鼠标拖拽旋转视角、滚轮缩放视角、右键单击后拖动摄像机、点击物质移动位置",
        deleteAtom: '点击物质以删除',
        breakBond: '点击键以断开'
      },
      importantNotes: {
        title: "必读注意事项",
        note1: "请在第一帧就在场景中放置好所有所需原子和构建初始状态的分子结构，所有化学反应应当遵循原子守恒。",
        note2: "请从第一帧至化学反应的最后一帧按顺序制作。在接下来的关键帧中，原子只能移动；正负电荷可以进行创建、移动和删除；并在每一帧对化学键进行断开和连接操作实现化学反应动画效果。",
        note3: "操作位于平面网格（y=0）下面的分子、化学键或电荷，请将摄像头旋转到平面网格下方后再操作，所有场景操作仅会操作摄像机所在网格那一侧。",
        note4: "每一帧动画制作完成后必须保存当前关键帧。所有关键帧制作完毕后，将导出的.chemx文件直接拖拽进动画窗口中，即可看到自己的动画。"
      } 
    },
    keyframePanel: {
      title: "关键帧",
      current: "当前: {{current}} / 20",
      saveFrame: "保存当前帧",
      keyframe: "关键帧 {{number}}",
      export: "导出.chemx文件",
      createNewFrame: "创建新关键帧"
    },
    toolbar: {
      animationName: "动画名称",
      description: "描述",
      select: "选择",
      addAtom: "添加物质",
      addBond: "添加化学键",
      breakBond: "断开化学键",
      undo: "撤销",
      atomType: "物质类型:",
      bondType: "键类型:",
      deleteAtom: '删除物质',
    },
    atoms: {
      H: "氢",
      B: "硼",
      C: "碳",
      N: "氮",
      O: "氧",
      F: "氟",
      Na: "钠",
      Mg: "镁",
      Al: "铝",
      Si: "硅",
      P: "磷",
      S: "硫",
      Cl: "氯",
      K: "钾",
      Ca: "钙",
      As: "砷",
      Se: "硒",
      Br: "溴",
      I: "碘",
      Pb: "铅",
      Fe: "铁",
      Cu: "铜",
      Zn: "锌",
      Hg: "汞",
      R: "有机官能团",
      '+': "正电荷",
      '-': "负电荷",
      '?': "未知元素"
    },
    sceneController: {
      bondCreation: {
        title: "化学键创建",
        selectFirst: "请选择起始原子",
        startingAtom: "起始原子",
        selectTarget: "请选择目标原子"
      }
    },
    atomPositionEditor: {
      title: "原子位置编辑"
    },
    draggableAtom: {
      startAtom: " 起始原子 "
    }
  }
}; 