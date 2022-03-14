import mockjs from 'mockjs';
import { Request, Response } from 'express';

const summary = {
  total: 100000,
  data: [
    { owner: 'jack', item: 'boat', amount: 1000 },
    { owner: 'tom', item: 'car', amount: 2000 },
    { owner: 'runny', item: 'food', amount: 4000 },
    { owner: 'lee', item: 'something', amount: 50 },
  ],
  trend: [
    { date: '2022-01-01', amount: 200 },
    { date: '2022-02-01', amount: 200 },
    { date: '2022-03-01', amount: 340 },
    { date: '2022-04-01', amount: 400 },
    { date: '2022-05-01', amount: 500 },
    { date: '2022-06-01', amount: 500 },
    { date: '2022-07-01', amount: 400 },
    { date: '2022-08-01', amount: 300 },
    { date: '2022-09-01', amount: 600 },
    { date: '2022-10-01', amount: 600 },
    { date: '2022-11-01', amount: 600 },
    { date: '2022-12-01', amount: 620 },
  ],
};
export default {
  'GET /api/bookkeeping/export': (req: Request, res: Response) => {
    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.setHeader('Content-type', 'text/html; charset=utf-8');
    res.send('mock export data');
  },
  'GET /api/bookkeeping/summary': (req: Request, res: Response) => {
    res.send(summary);
  },
  'GET /api/bookkeeping': (req: Request, res: Response) => {
    const pageSize = req.query.page_size || 10;
    const mock = mockjs.mock({
      total: 100,
      ['data|' + pageSize]: [
        {
          id: '@integer(1, 900000)',
          month: '@date("yyyyMM")',
          item: '@name',
          'owner|1-1': ['@name'],
          trade_at: '@datetime("yyyy-MM-dd")',
          created_at: '@datetime("yyyy-MM-dd HH:mm")',
          updated_at: '@datetime("yyyy-MM-dd HH:mm")',
          'type|1': ['income', 'expense'],
          'amount|1-4000': 100,
        },
      ],
    });
    res.send(mock);
  },
  'POST /api/bookkeeping/:id/delete': (req: Request, res: Response) => {
    res.send({ result: true, summary });
  },
  'POST /api/bookkeeping/import': (req: Request, res: Response) => {
    res.send({ result: true, summary });
  },
  'POST /api/bookkeeping/:id': (req: Request, res: Response) => {
    res.send({ result: true, summary });
  },
  'POST /api/bookkeeping': (req: Request, res: Response) => {
    res.send({ result: true, summary });
  },
};
