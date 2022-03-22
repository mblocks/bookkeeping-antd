import { Line } from '@ant-design/plots';

interface ChartsLineDataItem {
  date: string;
  amount: number;
}

export interface ChartsLineProps {
  data: ChartsLineDataItem[];
}

const ChartsLine = ({ data }: ChartsLineProps) => {
  const config = {
    height: 200,
    data,
    padding: 'auto',
    xField: 'date',
    yField: 'amount',
    seriesField: 'type',
    xAxis: {
      type: 'timeCat',
      tickCount: 8,
    },
    color: ({ type }) => {
      return type == 'income' ? '#52c41a' : '#ff4d4f';
    },
  };
  if (!data) {
    return <>no data</>;
  }
  return <Line {...config} />;
};

export default ChartsLine;
