import { Statistic, Table } from 'antd';
import { useIntl } from 'umi';

const Summary = ({ data }) => {
  const intl = useIntl();
  return (
    <>
      <Statistic
        title={intl.formatMessage({ id: 'bookkeeping.metas.total' })}
        value={Number(data.total).toFixed(2) || 0}
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
            render: (v) => Number(v).toFixed(2),
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
