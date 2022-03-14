import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ImportBookkeeping } from '@/services';

const props = {
  showUploadList: false,
  customRequest: ({ file, onSuccess }) => {
    const formData = new FormData();
    formData.append('file', file);
    ImportBookkeeping(formData)
      .then((response) => {
        onSuccess(response, file);
        message.success('Import Success!');
      })
      .catch((e) => {
        console.error(e);
      });
  },
};

const ImportData = () => {
  return (
    <Upload {...props}>
      <Button type="primary" ghost icon={<UploadOutlined />}>
        Import
      </Button>
    </Upload>
  );
};

export default ImportData;
