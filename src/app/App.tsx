import '../App.css';
import Form from '../features/survey/components/Form';
import Table from '../features/survey/components/Table';
import RatingsModal from '../features/survey/components/RatingsModal';
import ThemeToggle from '../shared/components/ThemeToggle';
import { ConfigProvider, Modal, Button,theme as t } from 'antd';
import { useTableStore } from '../store/useTableStore';
import { useUIStore } from '../store/useUIStore';
import { useEffect } from 'react';
function App() {
  const { viewRow, setViewRow, deleteTarget, confirmDelete, setDeleteTarget } = useTableStore();
  const { showSuccess, closeSuccess, successType, showError, errorMessage, closeError } =
    useUIStore();
  const { isFormOpen, openForm, closeForm } = useUIStore();
  const {  setEditingRow } = useTableStore();
  const theme = useUIStore((s) => s.theme);
  const themeMode = useUIStore((s) => s.theme);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return (
    <ConfigProvider
      theme={{
        components: {
          Radio: { colorPrimary: 'green' },
          Button: { colorPrimary: 'green' },
        },
        algorithm: themeMode === 'dark' ? t.darkAlgorithm : t.defaultAlgorithm,
      }}
    >
      <div className="app-container">
        
        
        <Table />
        <Button
          type="primary"
          className="floating-add-btn"
          onClick={() => {
            setEditingRow(null);
            openForm();
          }}
        >
          +
        </Button>
        <Modal
        title="Feedback Form"
        open={isFormOpen}
        footer={null}
        onCancel={closeForm}
        destroyOnClose
      >
        <Form />
      </Modal>

        {viewRow && <RatingsModal row={viewRow} onClose={() => setViewRow(null)} />}

        <Modal
          title="Success"
          open={showSuccess}
          onCancel={closeSuccess}
          footer={[
            <Button key="ok" type="primary" onClick={closeSuccess}>
              Ok
            </Button>,
          ]}
        >
          <p>
            {successType === 'create'
              ? 'Your feedback has been submitted successfully.'
              : 'Form has been updated successfully'}
          </p>
        </Modal>

        <Modal
          title="Duplicate Entry"
          open={showError}
          onCancel={closeError}
          footer={[
            <Button key="ok" type="primary" danger onClick={closeError}>
              Ok
            </Button>,
          ]}
        >
          <p>{errorMessage}</p>
        </Modal>

        <Modal
          title="Confirm Delete"
          open={Boolean(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
          footer={[
            <Button key="cancel" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>,
            <Button key="delete" danger type="primary" onClick={confirmDelete}>
              Delete
            </Button>,
          ]}
        >
          <p>Are you sure you want to delete this record?</p>
        </Modal>
        <ThemeToggle />
      </div>
    </ConfigProvider>
  );
}

export default App;
