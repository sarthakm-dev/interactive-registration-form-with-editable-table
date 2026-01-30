import { Table as AntTable, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRow } from '../types/table';
import { useTableStore } from '../../../store/useTableStore';
import { useIsMobile } from '../../../store/useMobile';
import MobileCards from './MobileCard';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnType, FilterDropdownProps } from 'antd/es/table/interface';
import type { InputRef } from 'antd';
import { useRef } from 'react';

const Table = () => {
  const { rows, setViewRow, requestDelete } = useTableStore();
  
  const setEditingRow = useTableStore((s) => s.setEditingRow);
  const isMobile = useIsMobile();
  const searchInput = useRef<InputRef | null>(null);

  const getColumnSearchProps = (dataIndex: keyof TableRow): ColumnType<TableRow> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${String(dataIndex)}`}
          value={selectedKeys[0] as string}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button type="primary" size="small" onClick={() => confirm()} icon={<SearchOutlined />}>
            Search
          </Button>
          <Button size="small" onClick={() => clearFilters?.()}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>{
      const recordValue = record[dataIndex];
      console.log(recordValue);
      if(!recordValue) return false;
      return recordValue.toString().toLowerCase().includes(String(value).toLocaleLowerCase().trim());
    }
  });
  const columns: ColumnsType<TableRow> = [
    {
      title: '#',
      render: (_v, _r, index) => index + 1,
    },
    {
      title: 'Order',
      dataIndex: 'orderNumber',
      align: 'center',
      ...getColumnSearchProps('orderNumber'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Purchase Date',
      dataIndex: 'purchaseDate',
      align: 'center',
    },
    {
      title: 'Method',
      dataIndex: 'shoppingMethod',
      filters: [
        { text: 'Online', value: 'online' },
        { text: 'Offline', value: 'offline' },
      ],
      align: 'center',
      onFilter: (value, record) => record.shoppingMethod.toLowerCase().includes(String(value).toLowerCase()),
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => setViewRow(record)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 5c-7.63 0-9.93 6.62-9.95 6.68-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68s9.93-6.62 9.95-6.68c.07-.21.07-.43 0-.63C21.93 11.61 19.63 5 12 5m0 12c-5.35 0-7.42-3.84-7.93-5 .5-1.16 2.58-5 7.93-5s7.42 3.85 7.93 5c-.5 1.16-2.58 5-7.93 5"></path>
              <path d="M13.5 12c-.83 0-1.5-.67-1.5-1.5 0-.6.36-1.12.87-1.35-.28-.09-.56-.15-.87-.15-1.64 0-3 1.36-3 3s1.36 3 3 3 3-1.36 3-3c0-.3-.06-.59-.15-.87-.24.51-.75.87-1.35.87"></path>
            </svg>
          </Button>
          <Button
            onClick={() => {
              setEditingRow(record);
              
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="m17.71 7.29-3-3a.996.996 0 0 0-1.41 0l-11.01 11A1 1 0 0 0 2 16v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l11-11a.996.996 0 0 0 0-1.41ZM5.59 18H4v-1.59l7.5-7.5 1.59 1.59zm8.91-8.91L12.91 7.5 14 6.41 15.59 8zM11 18h11v2H11z"></path>
            </svg>
          </Button>
          <Button danger onClick={() => requestDelete(record.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path>
              <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
            </svg>
          </Button>
        </Space>
      ),
      align: 'center',
    },
  ];
  if (isMobile) {
    return <MobileCards rows={rows} />;
  }
  return (
    <AntTable
      rowKey="id"
      columns={columns}
      dataSource={rows}
      pagination={{ pageSize: 5 }}
      locale={{ emptyText: 'No records' }}
    />
  );
};

export default Table;