import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { usePageData } from './PageData';
 
const MetaHead: FC = () => {
  const { pageTitle, pageDescription } = usePageData();
 
  return (
    <Helmet>
      <title>{pageTitle ? `${pageTitle} | Feed My Cycle` : 'Feed My Cycle'}</title>
      {pageDescription && <meta name="description" content={pageDescription} />}
    </Helmet>
  );
};
 
export { MetaHead };
 
 