import { Button } from "antd";
import type { TableRow } from "../types/table";
import { useTableStore } from "../../../store/useTableStore";

const MobileCards = ({ rows }: { rows: TableRow[] }) => {
  const { setViewRow, setEditingRow, requestDelete } = useTableStore();

  return (
    <div className="mobile-cards">
      {rows.map((row) => (
        <div key={row.id} className="mobile-card">
          <p><strong>Order:</strong> {row.orderNumber}</p>
          <p><strong>Email:</strong> {row.email}</p>
          <p><strong>Date:</strong> {row.purchaseDate}</p>
          <p><strong>Method:</strong> {row.shoppingMethod}</p>

          <div className="card-actions">
            <Button size="small" onClick={() => setViewRow(row)}>View</Button>
            <Button size="small" onClick={() => setEditingRow(row)}>Edit</Button>
            <Button danger size="small" onClick={() => requestDelete(row.id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MobileCards;