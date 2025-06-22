import { useEffect } from 'react';
import dayjs from 'dayjs';
import { Form, Input, Select, Row, Col, DatePicker, Button } from 'antd';
import useLanguage from '@/locale/useLanguage';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { useDate } from '@/settings';
import { PlusOutlined } from '@ant-design/icons';

export default function QueryForm({ current = null }) {
  const translate = useLanguage();
  const { dateFormat } = useDate();

  useEffect(() => {
    // Add logic if you want to handle current query data
  }, [current]);

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col span={12}>
          <Form.Item
            name="customer"
            label={translate('Customer')}
            rules={[{ required: true, message: translate('Please select a customer') }]}
          >
            <AutoCompleteAsync
              entity={'client'} // or 'customer' based on your actual schema
              displayLabels={['name']}
              searchFields={'name'}
              redirectLabel={translate('Add New Customer')}
              withRedirect
              urlToRedirect={'/customer'}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="description"
            label={translate('Description')}
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="status"
            label={translate('Status')}
            initialValue={'Open'}
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 'Open', label: translate('Open') },
                { value: 'InProgress', label: translate('In Progress') },
                { value: 'Closed', label: translate('Closed') },
              ]}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="resolution"
            label={`${translate('Resolution')} (max 100 chars)`}
            rules={[
              { required: false },
              {
                max: 100,
                message: translate('Resolution must be at most 100 characters'),
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={6}>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
              {translate('Save')}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}