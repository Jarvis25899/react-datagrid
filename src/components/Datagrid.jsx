import { useState } from "react";
import DATA from "../sample.json";
import "./Datagrid.css";
import Modal from "./Modal";
import DatagridActions from "./DatagridActions";

export default function Datagrid() {
  const [selectedRows, setSelectedRows] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const selectedItems = Object.keys(selectedRows)?.filter(
    (name) => selectedRows[name]
  );

  const downloadedData = DATA.filter((item) =>
    selectedItems.includes(item.name)
  );

  const handleSelection = (rowKey) => {
    setSelectedRows((currRows) => ({
      ...currRows,
      [rowKey]: !currRows[rowKey],
    }));
  };

  const onCloseModal = () => setModalOpen(false);

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={onCloseModal}
        downloadedData={downloadedData}
      ></Modal>
      <div className="card">
        <div className="card-content">
          <div className="card-title">Datagrid</div>
          <div className="table-container">
            <table className="table-content">
              <thead>
                <tr>
                  <th colSpan={5}>
                    <DatagridActions
                      selectedRows={selectedRows}
                      onSelectRow={setSelectedRows}
                      openModal={() => setModalOpen(true)}
                    />
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Device</th>
                  <th>Path</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {DATA.map((row) => (
                  <tr key={row.name}>
                    <td>
                      <input
                        type="checkbox"
                        className="table-checkbox"
                        checked={!!selectedRows[row.name]}
                        onChange={() => handleSelection(row.name)}
                      />
                    </td>
                    <td className="name-cell">{row.name}</td>
                    <td>{row.device}</td>
                    <td className="path-cell">{row.path}</td>
                    <td className="status-cell">
                      {row.status === "Available" && (
                        <div className="dot-indicator"></div>
                      )}
                      {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
