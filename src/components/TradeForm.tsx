import React, { useState } from 'react';
import { useIntl } from 'umi';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDatePicker,
  ProFormRadio,
  ProFormDigit,
  ProFormSelect,
} from '@ant-design/pro-form';
import { queryBookkeepingStatistics } from '@/services';

export interface TradeFormProps {
  title?: string;
  trigger?: JSX.Element;
  initialValues?: Object;
  visible?: boolean;
  onCancel: () => void;
  onFinish: (formData: Record<string, any>) => Promise<boolean | void>;
}

const TradeForm = ({
  title,
  onCancel,
  onFinish,
  initialValues,
  visible,
}: TradeFormProps) => {
  const intl = useIntl();
  const [form] = ProForm.useForm();
  const [statistics, setStatistics] = useState({ owner: [], category: [] });
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={
        title ||
        intl.formatMessage({
          id: `bookkeeping.actions.${
            initialValues && initialValues.id ? 'edit' : 'add'
          }`,
        })
      }
      visible={visible}
      form={form}
      onVisibleChange={(v) => {
        if (v) {
          queryBookkeepingStatistics(['owner', 'category']).then((res) => {
            setStatistics({
              ...res,
              category: res.category ? res.category.filter((v) => v.name) : [],
            });
          });
          form.resetFields();
          form.setFieldsValue(initialValues);
        }
      }}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      autoFocusFirstInput
      modalProps={{
        width: 400,
        onCancel,
      }}
      onValuesChange={({ owner, category }) => {
        const fix = {};
        if (owner && owner.length > 0) {
          fix.owner = [owner.pop()];
        }
        if (category && category.length > 0) {
          fix.category = [category.pop()];
        }
        form.setFieldsValue(fix);
      }}
      onFinish={(values) =>
        onFinish({
          ...initialValues,
          ...values,
          owner: values.owner.pop(),
          category: values.category.pop(),
        })
      }
    >
      <ProFormRadio.Group
        name="type"
        label={intl.formatMessage({ id: 'bookkeeping.trade.type' })}
        radioType="button"
        fieldProps={{
          buttonStyle: 'solid',
        }}
        rules={[{ required: true }]}
        options={[
          {
            label: intl.formatMessage({ id: 'bookkeeping.trade.type.income' }),
            value: 'income',
          },
          {
            label: intl.formatMessage({ id: 'bookkeeping.trade.type.expense' }),
            value: 'expense',
          },
        ]}
      />
      <ProFormDatePicker
        rules={[{ required: true }]}
        name="trade_at"
        width="md"
        label={intl.formatMessage({ id: 'bookkeeping.trade.date' })}
        dataFormat="YYYY-MM-DD"
      />
      <ProFormSelect
        mode="tags"
        name="category"
        label={intl.formatMessage({ id: 'bookkeeping.trade.category' })}
        options={statistics.category.map((v) => ({
          label: v.name,
          value: v.name,
        }))}
      />
      <ProFormText
        rules={[{ required: true }]}
        name="item"
        label={intl.formatMessage({ id: 'bookkeeping.trade.item' })}
      />
      <ProFormDigit
        label={intl.formatMessage({ id: 'bookkeeping.trade.amount' })}
        name="amount"
        min={0}
        rules={[{ required: true }]}
      />
      <ProFormSelect
        rules={[{ required: true }]}
        mode="tags"
        name="owner"
        label={intl.formatMessage({ id: 'bookkeeping.trade.owner' })}
        options={statistics.owner.map((v) => ({
          label: v.name,
          value: v.name,
        }))}
      />
    </ModalForm>
  );
};

export default TradeForm;
