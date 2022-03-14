import React from 'react';
import { Button } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormDatePicker,
  ProFormRadio,
  ProFormDigit,
  ProFormSelect,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

export interface AddDataProps {
  title?: string;
  trigger?: JSX.Element;
  initialValues?: Object;
  onFinish: (formData: Record<string, any>) => Promise<boolean | void>;
}

const AddData = ({ title, onFinish, initialValues, trigger }: AddDataProps) => {
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={title || 'Add Trade'}
      trigger={
        trigger || (
          <Button icon={<PlusOutlined />} type="primary">
            Add
          </Button>
        )
      }
      initialValues={initialValues || { type: 'income', trade_at: new Date() }}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        width: 400,
        onCancel: () => console.log('run'),
      }}
      onFinish={(values) => onFinish({ ...initialValues, ...values })}
    >
      <ProFormRadio.Group
        name="type"
        label="Type"
        radioType="button"
        required
        options={[
          {
            label: 'Income',
            value: 'income',
          },
          {
            label: 'Expense',
            value: 'expense',
          },
        ]}
      />
      <ProFormDatePicker
        required
        name="trade_at"
        width="md"
        label="Trade Date"
      />
      <ProFormText rules={[{ required: true }]} name="item" label="Item" />
      <ProFormDigit label="Amount" name="amount" min={0} />
      <ProFormSelect
        required
        mode="tags"
        request={async () => [
          {
            value: 'chapter',
            label: '盖章后生效',
          },
        ]}
        name="owner"
        label="Owner"
      />
    </ModalForm>
  );
};

export default AddData;
