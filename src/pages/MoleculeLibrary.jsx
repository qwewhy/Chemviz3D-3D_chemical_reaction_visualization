/**
 * @file MoleculeLibrary.jsx
 * @author [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 */

// 分子库页面：展示可用的分子模型
// Molecule Library page: Display available molecule models
import { useTranslation } from 'react-i18next';
import Panel from '../components/ui/Panel';

const MoleculeLibrary = () => {
  const { t } = useTranslation();

  const molecules = [
    {
      id: 'h2o',
      formula: 'H2O',
      name: t('molecules.water'),
      description: t('molecules.waterDesc'),
      category: 'common'
    },
    // 可以添加更多分子
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {t('molecules.title')}
      </h1>
      
      {/* 分子类别 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Panel title={t('molecules.categories.organic')}>
          {/* 有机分子列表 */}
        </Panel>
        <Panel title={t('molecules.categories.inorganic')}>
          {/* 无机分子列表 */}
        </Panel>
        <Panel title={t('molecules.categories.common')}>
          {molecules
            .filter(m => m.category === 'common')
            .map(molecule => (
              <div key={molecule.id} className="bg-white p-4 rounded-lg shadow mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  {molecule.name} ({molecule.formula})
                </h2>
                <p className="text-gray-600">{molecule.description}</p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">{t('molecules.details.formula')}:</span> {molecule.formula}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{t('molecules.details.structure')}:</span>
                    {/* 这里可以添加分子结构图 */}
                  </div>
                </div>
              </div>
            ))}
        </Panel>
      </div>
    </div>
  );
};

export default MoleculeLibrary; 