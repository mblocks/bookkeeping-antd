import mockjs from 'mockjs';
import { Request, Response } from 'express';

const summary = {
  total: 100000,
  data: [
    { owner: 'jack', category: 'boat', amount: 1000 },
    { owner: 'tom', category: 'car', amount: 2000 },
    { owner: 'runny', category: 'food', amount: 4000 },
    { owner: 'lee', category: 'something', amount: 50 },
  ],
  trend: [
    { amount: 200, month: '2021-01', type: 'income' },
    { amount: 200, month: '2021-02', type: 'income' },
    { amount: 340, month: '2021-03', type: 'income' },
    { amount: 400, month: '2021-04', type: 'income' },
    { amount: 500, month: '2021-05', type: 'income' },
    { amount: 500, month: '2021-06', type: 'income' },
    { amount: 400, month: '2021-07', type: 'income' },
    { amount: 300, month: '2021-08', type: 'income' },
    { amount: 600, month: '2021-09', type: 'income' },
    { amount: 600, month: '2021-10', type: 'income' },
    { amount: 600, month: '2021-11', type: 'income' },
    { amount: 620, month: '2021-12', type: 'income' },
    { amount: 100, month: '2021-01', type: 'expense' },
    { amount: 400, month: '2021-02', type: 'expense' },
    { amount: 540, month: '2021-03', type: 'expense' },
    { amount: 600, month: '2021-04', type: 'expense' },
    { amount: 700, month: '2021-05', type: 'expense' },
    { amount: 700, month: '2021-06', type: 'expense' },
    { amount: 600, month: '2021-07', type: 'expense' },
    { amount: 500, month: '2021-08', type: 'expense' },
    { amount: 800, month: '2021-09', type: 'expense' },
    { amount: 800, month: '2021-10', type: 'expense' },
    { amount: 800, month: '2021-11', type: 'expense' },
    { amount: 820, month: '2021-12', type: 'expense' },
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
  'GET /api/bookkeeping/owners': (req: Request, res: Response) => {
    res.send(['jack', 'tom', 'runny', 'lee']);
  },
  'GET /api/bookkeeping': (req: Request, res: Response) => {
    const pageSize = req.query.page_size || 10;
    const mock = mockjs.mock({
      total: 100,
      ['data|' + pageSize]: [
        {
          id: '@integer(1, 900000)',
          month: '@date("yyyyMM")',
          category: '@name',
          item: '@name',
          owner: '@name',
          trade_at: '@datetime("yyyy-MM-dd")',
          data_created_at: '@datetime("yyyy-MM-dd HH:mm")',
          data_updated_at: '@datetime("yyyy-MM-dd HH:mm")',
          'type|1': ['income', 'expense'],
          'amount|1-4000': 100,
        },
      ],
    });
    res.send(mock);
  },
  'POST /api/bookkeeping/:id/delete': (req: Request, res: Response) => {
    res.send({ result: true });
  },
  'POST /api/bookkeeping/import': (req: Request, res: Response) => {
    res.send({ result: true });
  },
  'POST /api/bookkeeping/:id': (req: Request, res: Response) => {
    res.send({ result: true });
  },
  'POST /api/bookkeeping': (req: Request, res: Response) => {
    res.send({ result: true });
  },
};
