import { Statistic, Table } from 'antd';
import { useIntl } from 'umi';

const Summary = ({ data }) => {
  const intl = useIntl();
  return (
    <>
      <Statistic
        title={intl.formatMessage({ id: 'bookkeeping.metas.total' })}
        value={data.total || 0}
      />
      <Table
        bordered={false}
        pagination={false}
        size="small"
        columns={[
          {
            title: intl.formatMessage({ id: 'bookkeeping.trade.owner' }),
            dataIndex: 'owner',
          },
          {
            title: intl.formatMessage({ id: 'bookkeeping.trade.category' }),
            dataIndex: 'category',
          },
          {
            title: intl.formatMessage({ id: 'bookkeeping.trade.amount' }),
            dataIndex: 'amount',
          },
        ]}
        dataSource={
          (data.data && data.data.map((v, key) => ({ ...v, key }))) || []
        }
      />
    </>
  );
};

export default Summary;
