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
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };
  if (!data) {
    return <>no data</>;
  }
  return <Line {...config} />;
};

export default ChartsLine;
