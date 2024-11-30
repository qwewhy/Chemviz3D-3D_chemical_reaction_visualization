export default {
  translation: {
    nav: {
      home: '홈',
      simulator: '시뮬레이터',
      molecules: '분자 라이브러리',
      about: '소개',
      organicReaction: '애니메이션',
      keyframeEditor: '키프레임 에디터'
    },
    home: {
      title: '화학 반응 3D 시각화',
      subtitle: '인터랙티브 3D 시각화를 통한 화학 반응의 신비 탐구',
      startButton: '체험 시작',
      learnMore: '자세히 보기',
      features: {
        simulation: {
          title: '실시간 시뮬레이션',
          description: '3D 환경에서 실시간으로 화학 반응 체험'
        },
        interaction: {
          title: '인터랙티브 학습',
          description: '분자와 상호작용하며 그 움직임 관찰'
        },
        learning: {
          title: '교육 도구',
          description: '시각적이고 인터랙티브한 경험을 통한 화학 학습'
        }
      }
    },
    simulator: {
      title: '시뮬레이터',
      controls: {
        start: '시뮬레이션 시작',
        stop: '시뮬레이션 정지',
        reset: '초기화',
        temperature: '온도',
        pressure: '압력',
        addWater: '물 분자 추가 (H₂O)',
        addHydrogen: '수소 추가 (H₂)',
        addAmmonia: '암모니아 추가 (NH₃)',
        addAmmoniaHydrate: '암모니아 수화물 추가 (NH₃·H₂O)',
        addChlorine: '염소 추가 (Cl₂)',
        addHypochlorousAcid: '차아염소산 추가 (HClO)',
        addHydrochloricAcid: '염산 추가 (HCl)',
        addNitrogen: '질소 추가 (N₂)',
        addOxygen: '산소 추가 (O₂)',
        addHydrogenPeroxide: '과산화수소 추가 (H₂O₂)',
        moleculeCount: '분자 수',
        addCarbon: '탄소 추가 (C)',
        addCarbonicAcid: '탄산 추가 (H₂CO₃)',
        addAmmoniumBicarbonate: '탄산수소암모늄 추가 (NH₄HCO₃)'
      }
    },
    molecules: {
      title: '분자 라이브러리',
      water: '물 분자',
      waterDesc: '물 분자는 가장 기본적인 화학 물질 중 하나입니다',
      categories: {
        organic: '유기 분자',
        inorganic: '무기 분자',
        common: '일반 분자'
      },
      details: {
        formula: '화학식',
        structure: '구조',
        properties: '특성',
        applications: '응용'
      }
    },
    about: {
      title: '소개',
      description: 'Three.js와 React 기반의 3D 화학 반응 시각화 시스템',
      features: {
        title: '프로젝트 특징',
        visualization: '실시간 3D 시각화',
        interaction: '인터랙티브 분자 시뮬레이션',
        education: '교육용 반응 시연'
      },
      team: {
        title: '팀 소개',
        description: '열정적인 개발자와 화학자들의 그룹'
      },
      technology: {
        title: '기술 스택',
        description: '최신 웹 기술로 구축'
      }
    },
    footer: {
      projectName: '화학 반응 3D 시각화',
      projectSubtitle: '화학 반응 3D',
      description: '화학 반응을 위한 인터랙티브 3D 시각화 플랫폼',
      quickLinks: {
        title: '빠른 링크',
        about: '소개',
        contact: '연락처',
        help: '도움말'
      },
      contact: {
        title: '연락처',
        email: '이메일: ?????@?????.com',
        github: 'GitHub: https://github.com/qwewhy/Chemviz3D-3D_chemical_reaction_visualization'
      }
    },
    organicReaction: {
      dropZoneHint: '.chemx 파일을 여기에 드롭하세요',
      supportedFormats: '.chemx 형식 파일 지원',
      controls: '애니메이션 제어',
      play: '재생',
      pause: '일시정지',
      reset: '초기화',
      export: '.chemx 내보내기'
    },
    bonds: {
      types: {
        ionic: {
          name: "이온 결합",
          description: "반대 전하를 가진 이온 사이의 정전기적 인력"
        },
        metallic: {
          name: "금속 결합",
          description: "금속 원자 간 전자 구름을 공유하여 형성되는 금속 결합"
        },
        covalent: {
          name: "공유 결합",
          description: "원자 간 전자쌍을 공유하여 형성되는 화학 결합"
        }
      }
    },
    keyframeEditor: {
      hints: {
        addAtom: "장면을 클릭하여 원자 추가",
        addBond: "두 원자를 클릭하여 결합 생성",
        select: "드래그로 시점 회전, 스크롤로 확대/축소, 우클릭 후 드래그로 카메라 이동"
      }
    },
    keyframePanel: {
      title: "키프레임",
      current: "현재: {{current}} / {{total}}",
      saveFrame: "현재 프레임 저장",
      keyframe: "키프레임 {{number}}",
      export: ".chemx 파일 내보내기"
    },
    toolbar: {
      animationName: "애니메이션 이름",
      description: "설명",
      select: "선택",
      addAtom: "원자 추가",
      addBond: "결합 추가",
      breakBond: "결합 해제",
      undo: "실행 취소",
      atomType: "원자 유형:",
      bondType: "결합 유형:"
    },
    atoms: {
      H: "수소",
      B: "붕소",
      C: "탄소",
      N: "질소",
      O: "산소",
      F: "플루오린",
      Na: "나트륨",
      Mg: "마그네슘",
      Al: "알루미늄",
      Si: "규소",
      P: "인",
      S: "황",
      Cl: "염소",
      K: "칼륨",
      Ca: "칼슘",
      As: "비소",
      Se: "셀레늄",
      Br: "브롬",
      I: "요오드",
      Pb: "납",
      Fe: "철",
      Cu: "구리",
      Zn: "아연",
      Hg: "수은"
    },
    sceneController: {
      bondCreation: {
        title: "결합 생성",
        selectFirst: "첫 번째 원자를 선택하세요",
        startingAtom: "시작 원자",
        selectTarget: "대상 원자를 선택하세요"
      }
    },
    atomPositionEditor: {
      title: "원자 위치 편집기"
    },
    draggableAtom: {
      startAtom: " 시작 원자"
    },
    keyframeEditor: {
      maximumKeyframes: "최대 10 키프레임 허용",
      hints: {
        select: "드래그로 시점 회전, 스크롤로 확대/축소, 우클릭 후 드래그로 카메라 이동"
      }     
    }
  }
}; 