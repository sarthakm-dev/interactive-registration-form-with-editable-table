import { Modal, Table, Typography, Divider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Props } from '../types/rating-modal-prop';

const { Text } = Typography;



const RatingsModal: React.FC<Props> = ({ row, onClose }) => {
  const dataSource = Object.entries(row.ratings).map(([category, value]) => ({
    key: category,
    category: category.replace(/-/g, ' '),
    rating: value === 0 ? 'N/A' : value,
  }));

  const columns: ColumnsType<{ key: string; category: string; rating: string | number }> = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
  ];

  return (
    <Modal
      open
      title="Ratings Details"
      onCancel={onClose}
      footer={null}
      width={700}
    >
      {/* Ratings Table */}
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        size="middle"
      />

      {/* Optional text sections */}
      {(row.whatDidYouLike || row.whatToImprove || row.additionalComment) && (
        <>
          <Divider />

          {row.whatDidYouLike && (
            <div className="textarea-block">
              <Text strong>What did you like?</Text>
              <p>{row.whatDidYouLike}</p>
            </div>
          )}

          {row.whatToImprove && (
            <div className="textarea-block">
              <Text strong>What to improve?</Text>
              <p>{row.whatToImprove}</p>
            </div>
          )}

          {row.additionalComment && (
            <div className="textarea-block">
              <Text strong>Additional comments</Text>
              <p>{row.additionalComment}</p>
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default RatingsModal;