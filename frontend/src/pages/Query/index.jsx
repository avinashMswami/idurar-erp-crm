import dayjs from 'dayjs';
import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { useDate } from '@/settings';
import QueryDataTableModule from '@/modules/QueryModule/QueryDataTableModule';

export default function Query() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'query';

  const deleteModalLabels = ['customer.name', 'description'];

  const dataTableColumns = [
    {
      title: translate('Customer'),
      dataIndex: ['customer', 'name'],
    },
    {
      title: translate('Description'),
      dataIndex: 'description',
    },
    {
      title: translate('Created At'),
      dataIndex: 'createdAt',
      render: (date) => dayjs(date).format(dateFormat),
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => <Tag color={status === 'Closed' ? 'red' : 'green'}>{status}</Tag>,
    },
    {
      title: translate('Resolution'),
      dataIndex: 'resolution',
      render: (text) => text?.length > 50 ? `${text.substring(0, 50)}...` : text,
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('query'),
    DATATABLE_TITLE: translate('query_list'),
    ADD_NEW_ENTITY: translate('add_new_query'),
    ENTITY_NAME: translate('query'),
    RECORD_ENTITY: translate('record_note'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
    deleteModalLabels,
  };

  return <QueryDataTableModule config={config} />;
}
