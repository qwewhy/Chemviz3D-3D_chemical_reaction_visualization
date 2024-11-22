// 关于页面：项目信息和说明
// About page: Project information and description
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {t('about.title')}
      </h1>
      
      <div className="prose max-w-none">
        <p className="text-lg mb-8">
          {t('about.description')}
        </p>

        {/* 项目特点 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {t('about.features.title')}
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('about.features.visualization')}</li>
            <li>{t('about.features.interaction')}</li>
            <li>{t('about.features.education')}</li>
          </ul>
        </section>

        {/* 团队信息 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {t('about.team.title')}
          </h2>
          <p>{t('about.team.description')}</p>
        </section>

        {/* 技术栈 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            {t('about.technology.title')}
          </h2>
          <p>{t('about.technology.description')}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="p-4 bg-white rounded-lg shadow text-center">React</div>
            <div className="p-4 bg-white rounded-lg shadow text-center">Three.js</div>
            <div className="p-4 bg-white rounded-lg shadow text-center">React Three Fiber</div>
            <div className="p-4 bg-white rounded-lg shadow text-center">Zustand</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 