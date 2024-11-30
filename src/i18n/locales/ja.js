export default {
  translation: {
    nav: {
      home: 'ホーム',
      simulator: 'シミュレーター',
      molecules: '分子ライブラリ',
      about: '概要',
      organicReaction: 'アニメーション',
      keyframeEditor: 'アニメーションエディター'
    },
    home: {
      title: '化学反応3D可視化',
      subtitle: 'インタラクティブな3D可視化技術で化学反応の神秘を探索',
      startButton: '体験を開始',
      learnMore: '詳細を見る',
      features: {
        simulation: {
          title: 'リアルタイムシミュレーション',
          description: '3D環境で化学反応をリアルタイムに体験'
        },
        interaction: {
          title: 'インタラクティブ学習',
          description: '分子と対話して挙動を観察'
        },
        learning: {
          title: '教育ツール',
          description: '視覚的でインタラクティブな体験を通じて化学を学ぶ'
        }
      }
    },
    simulator: {
      title: 'シミュレーター',
      controls: {
        start: 'シミュレーション開始',
        stop: 'シミュレーション停止',
        reset: 'リセット',
        temperature: '温度',
        pressure: '圧力',
        addWater: '水分子を追加 (H₂O)',
        addHydrogen: '水素を追加 (H₂)',
        addAmmonia: 'アンモニアを追加 (NH₃)',
        addAmmoniaHydrate: 'アンモニア一水和物を追加 (NH₃·H₂O)',
        addChlorine: '塩素を追加 (Cl₂)',
        addHypochlorousAcid: '次亜塩素酸を追加 (HClO)',
        addHydrochloricAcid: '塩化水素を追加 (HCl)',
        addNitrogen: '窒素を追加 (N₂)',
        addOxygen: '酸素を追加 (O₂)',
        addHydrogenPeroxide: '過酸化水素を追加 (H₂O₂)',
        moleculeCount: '分子数',
        addCarbon: '炭素を追加 (C)',
        addCarbonicAcid: '炭酸を追加 (H₂CO₃)',
        addAmmoniumBicarbonate: '炭酸水素アンモニウムを追加 (NH₄HCO₃)'
      }
    },
    molecules: {
      title: '分子ライブラリ',
      water: '水分子',
      waterDesc: '水分子は最も基本的な化学物質の一つです',
      categories: {
        organic: '有機分子',
        inorganic: '無機分子',
        common: '一般的な分子'
      },
      details: {
        formula: '化学式',
        structure: '構造',
        properties: '特性',
        applications: '応用'
      }
    },
    about: {
      title: '私たちについて',
      description: 'Three.jsとReactをベースにした3D化学反応可視化システム',
      features: {
        title: 'プロジェクトの特徴',
        visualization: 'リアルタイム3D可視化',
        interaction: 'インタラクティブな分子シミュレーション',
        education: '教育的な反応デモンストレーション'
      },
      team: {
        title: 'チーム',
        description: '情熱的な開発者と化学者のグループ'
      },
      technology: {
        title: '使用技術',
        description: '最新のWeb技術で構築'
      }
    },
    footer: {
      projectName: '化学反応3D可視化',
      projectSubtitle: '化学反応3D',
      description: 'インタラクティブな3D化学反応可視化プラットフォーム',
      quickLinks: {
        title: 'クイックリンク',
        about: '概要',
        contact: 'お問い合わせ',
        help: 'ヘルプ'
      },
      contact: {
        title: 'お問い合わせ',
        email: 'メール：?????@?????.com',
        github: 'GitHub：https://github.com/qwewhy/Chemviz3D-3D_chemical_reaction_visualization'
      }
    },
    organicReaction: {
      dropZoneHint: '.chemxファイルをここにドロップ',
      supportedFormats: '.chemx形式のファイルをサポート',
      controls: 'アニメーション制御',
      play: '再生',
      pause: '一時停止',
      reset: 'リセット',
      export: '.chemxをエクスポート'
    },
    bonds: {
      types: {
        ionic: {
          name: "イオン結合",
          description: "反対の電荷を持つイオン間の静電引力"
        },
        metallic: {
          name: "金属結合",
          description: "金属原子間で電子雲を共有して形成される金属結合"
        },
        covalent: {
          name: "共有結合",
          description: "原子間で電子対を共有して形成される化学結合"
        }
      }
    },
    keyframeEditor: {
      hints: {
        addAtom: "シーンをクリックして原子を追加",
        addBond: "2つの原子をクリックして結合を作成",
        select: "ドラッグで視点を回転、スクロールでズーム、右クリックでカメラ移動"
      }
    },
    keyframePanel: {
      title: "キーフレーム",
      current: "現在: {{current}} / {{total}}",
      saveFrame: "現在のフレームを保存",
      keyframe: "キーフレーム {{number}}",
      export: ".chemxファイルをエクスポート"
    },
    toolbar: {
      animationName: "アニメーション名",
      description: "説明",
      select: "選択",
      addAtom: "原子を追加",
      addBond: "結合を追加",
      breakBond: "結合を切断",
      undo: "元に戻す",
      atomType: "原子タイプ:",
      bondType: "結合タイプ:"
    },
    atoms: {
      H: "水素",
      B: "ホウ素",
      C: "炭素",
      N: "窒素",
      O: "酸素",
      F: "フッ素",
      Na: "ナトリウム",
      Mg: "マグネシウム",
      Al: "アルミニウム",
      Si: "ケイ素",
      P: "リン",
      S: "硫黄",
      Cl: "塩素",
      K: "カリウム",
      Ca: "カルシウム",
      As: "ヒ素",
      Se: "セレン",
      Br: "臭素",
      I: "ヨウ素",
      Pb: "鉛",
      Fe: "鉄",
      Cu: "銅",
      Zn: "亜鉛",
      Hg: "水銀"
    },
    sceneController: {
      bondCreation: {
        title: "結合の作成",
        selectFirst: "最初の原子を選択してください",
        startingAtom: "開始原子",
        selectTarget: "目標原子を選択してください"
      }
    },
    atomPositionEditor: {
      title: "原子位置エディター"
    },
    draggableAtom: {
      startAtom: " 開始原子"
    },
    keyframeEditor: {
      maximumKeyframes: "最大10キーフレームが許可されています",
      hints: {
        select: "ドラッグで視点を回転、スクロールでズーム、右クリックでカメラ移動"
      }   
    }
  }
}; 