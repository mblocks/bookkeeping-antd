import { useIntl } from 'umi';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ImportBookkeeping } from '@/services';

const ImportData = (props) => {
  const intl = useIntl();
  const config = {
    showUploadList: false,
    customRequest: ({ file, onSuccess }) => {
      const formData = new FormData();
      formData.append('file', file);
      ImportBookkeeping(formData)
        .then((response) => {
          onSuccess(response, file);
          if (response.result) {
            props.onSuccess(response);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },
  };
  return (
    <Upload {...config}>
      <Button type="primary" ghost icon={<UploadOutlined />}>
        {intl.formatMessage({ id: 'bookkeeping.actions.import' })}
      </Button>
    </Upload>
  );
};

export default ImportData;
