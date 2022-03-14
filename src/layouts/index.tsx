import { useIntl } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

const DefaultLayout = ({ children }) => {
  const intl = useIntl();
  return (
    <PageContainer title={intl.formatMessage({ id: 'bookkeeping.title' })}>
      {children}
    </PageContainer>
  );
};

export default DefaultLayout;
