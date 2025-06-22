import { useEffect, useState } from 'react';
import { PageHeader } from '@ant-design/pro-layout';
import {
  Descriptions,
  Tag,
  Button,
  Divider,
  List,
  Input,
  message,
  Popconfirm,
} from 'antd';
import {
  EditOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useLanguage from '@/locale/useLanguage';
import { erp } from '@/redux/erp/actions';
import axios from 'axios';

const ReadQueryItem = ({ config, selectedItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const translate = useLanguage();

  const { entity, ENTITY_NAME } = config;

  const [query, setQuery] = useState(null);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    setQuery(selectedItem);
  }, [selectedItem]);

  const refresh = async () => {
    try {
        console.log("called?: ");
        
      const res = await axios.get(`/queries/${selectedItem._id}`);
      console.log("res from referesh",res,res.data);
      setQuery(res.data.result);
    } catch (err) {
      message.error(translate('Failed to refresh query'));
    }
  };

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    try {
      await axios.post(`/queries/${query._id}/notes`, { text: noteText });
      message.success(translate('Note added'));
      setNoteText('');
      refresh();
    } catch {
      message.error(translate('Failed to add note'));
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`/queries/${query._id}/notes/${noteId}`);
      message.success(translate('Note deleted'));
      refresh();
    } catch {
      message.error(translate('Failed to delete note'));
    }
  };

  if (!query) return null;

  return (
    <>
      <PageHeader
        onBack={() => navigate(`/${entity.toLowerCase()}`)}
        title={`${ENTITY_NAME}`}
        ghost={false}
        tags={[<Tag key="status">{translate(query.status)}</Tag>]}
        extra={[
          <Button
            key="close"
            onClick={() => navigate(`/${entity.toLowerCase()}`)}
            icon={<CloseCircleOutlined />}
          >
            {translate('Close')}
          </Button>,
          <Button
            key="edit"
            onClick={() => {
              dispatch(
                erp.currentAction({
                  actionType: 'update',
                  data: query,
                })
              );
              navigate(`/${entity.toLowerCase()}/update/${query._id}`);
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            {translate('Edit')}
          </Button>,
        ]}
        style={{ padding: '20px 0px' }}
      />

      <Divider />

      <Descriptions title={translate('Query Details')} bordered>
        <Descriptions.Item label={translate('Customer')} span={3}>
          {query.customer?.name}
        </Descriptions.Item>
        <Descriptions.Item label={translate('Description')} span={3}>
          {query.description}
        </Descriptions.Item>
        <Descriptions.Item label={translate('Resolution')} span={3}>
          {query.resolution || '-'}
        </Descriptions.Item>
        <Descriptions.Item label={translate('Status')} span={3}>
          <Tag>{translate(query.status)}</Tag>
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <h3>{translate('Notes')}</h3>

      <Input.TextArea
        rows={3}
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder={translate('Write a note...')}
      />
      <Button type="primary" onClick={handleAddNote} style={{ marginTop: 8 }}>
        {translate('Add Note')}
      </Button>

      <List
        bordered
        dataSource={query.notes}
        renderItem={(note) => (
          <List.Item
            actions={[
              <Popconfirm
                title={translate('Are you sure to delete this note?')}
                onConfirm={() => handleDeleteNote(note._id)}
              >
                <Button type="link" danger>
                  {translate('Delete')}
                </Button>
              </Popconfirm>,
            ]}
          >
            <div>
              <p style={{ marginBottom: 5 }}>{note.text}</p>
              <small>{new Date(note.created).toLocaleString()}</small>
            </div>
          </List.Item>
        )}
        locale={{ emptyText: translate('No notes available') }}
        style={{ marginTop: 16 }}
      />
    </>
  );
};

export default ReadQueryItem;