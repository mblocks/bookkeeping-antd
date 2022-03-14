import { Statistic, Table } from 'antd';

const Summary = ({ data }) => {
  return (
    <>
      <Statistic title="Total" value={data.total || 0} />
      <Table
        bordered={false}
        pagination={false}
        size="small"
        columns={[
          {
            title: 'Owner',
            dataIndex: 'owner',
          },
          {
            title: 'Item',
            dataIndex: 'item',
          },
          {
            title: 'Amount',
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
