import React, { useState, useEffect } from 'react';
import { useLocation, useIntl } from 'umi';
import { Button, Row, Col, Card, Typography, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { LightFilter, ProFormDateRangePicker } from '@ant-design/pro-form';
import ChartsLine from '@/components/Charts/Line';
import Summary from '@/components/Summary';
import ImportData from '@/components/ImportData';
import AddData from '@/components/AddData';
import {
  queryBookkeeping,
  queryBookkeepingSummary,
  createBookkeeping,
  updateBookkeeping,
  removeBookkeeping,
} from '@/services';
import styles from './styles.less';

const { Text } = Typography;

export type TableListItem = {
  key: number;
  month: string;
  name: string;
  owner: string;
  amount: number;
  type: string;
  createdAt: number;
};

export default () => {
  const location = useLocation();
  const intl = useIntl();
  const [queryParams, setQueryParams] = useState(location.query);
  const [summary, setSummary] = useState({});
  const handleBookkeepingChange = async (values) => {
    const { result, ...res } = values.id
      ? await updateBookkeeping(values)
      : await createBookkeeping(values);
    if (result) {
      message.success('提交成功');
      setQueryParams({ ...queryParams, timeStamp: Date.now() });
      setSummary(res.summary);
    }
    return true;
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'bookkeeping.trade.month' }),
      dataIndex: 'month',
      hideInSearch: true,
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'bookkeeping.trade.item' }),
      dataIndex: 'item',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'bookkeeping.trade.amount' }),
      dataIndex: 'amount',
      hideInSearch: true,
      render: (value, { type }) => (
        <Text type={type == 'income' ? 'success' : 'danger'}>
          {type == 'income' ? '+' : '-'}
          {value}
        </Text>
      ),
    },
    {
      title: intl.formatMessage({ id: 'bookkeeping.trade.owner' }),
      dataIndex: 'owner',
      render: (value) => value,
    },
    {
      title: intl.formatMessage({ id: 'bookkeeping.trade.createdAt' }),
      hideInSearch: true,
      key: 'created_at',
      dataIndex: 'created_at',
      valueType: 'date',
      width: 120,
      render: (value) => <Text type="secondary">{value}</Text>,
    },
    {
      title: intl.formatMessage({ id: 'bookkeeping.trade.option' }),
      width: '80px',
      key: 'option',
      align: 'center',
      valueType: 'option',
      render: (_, values) => (
        <TableDropdown
          menus={[
            {
              key: 'delete',
              name: 'Delete',
              onClick: async () => {
                const { result } = await removeBookkeeping(values);
                if (result) {
                  message.success('Deleted success!');
                  setQueryParams({ ...queryParams, timeStamp: Date.now() });
                }
              },
            },
            {
              name: 'sd',
              key: 'ds',
              renderItem: () => (
                <AddData
                  initialValues={values}
                  trigger={<span>Edit</span>}
                  onFinish={handleBookkeepingChange}
                />
              ),
            },
          ]}
        />
      ),
    },
  ];
  useEffect(() => {
    queryBookkeepingSummary().then((res) => setSummary(res));
  }, []);
  return (
    <div className={styles.bookkeeping}>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card bordered={false}>
            <ChartsLine data={summary.trend} />
          </Card>
        </Col>
        <Col span={12}>
          <Summary data={summary} />
        </Col>
        <Col span={24}>
          <ProTable<TableListItem>
            columns={columns}
            params={queryParams}
            request={(params, sorter, filter) => {
              return queryBookkeeping({
                ...params,
                page: params.current,
                page_size: params.pageSize,
              });
            }}
            rowKey="id"
            pagination={{
              //showQuickJumper: true,
              pageSize: 10,
            }}
            toolbar={{
              settings: [],
              search: (
                <LightFilter
                  onFinish={async ({ tradeRange, ...values }) => {
                    const [trade_start, trade_end] = tradeRange || [];
                    setQueryParams({
                      ...queryParams,
                      ...values,
                      trade_start,
                      trade_end,
                      page: 1,
                    });
                  }}
                >
                  <ProFormDateRangePicker
                    name="tradeRange"
                    label={intl.formatMessage({
                      id: 'bookkeeping.filter.tradeDate',
                    })}
                  />
                </LightFilter>
              ),

              actions: [
                <AddData onFinish={handleBookkeepingChange} />,
                <Button
                  icon={<DownloadOutlined />}
                  type="primary"
                  ghost
                  href="/api/bookkeeping/export"
                >
                  {intl.formatMessage({ id: 'bookkeeping.actions.export' })}
                </Button>,
                <ImportData />,
              ],
            }}
            search={false}
            dateFormatter="string"
          />
        </Col>
      </Row>
    </div>
  );
};
