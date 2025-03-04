import DATA from "../sample.json";

const availableStatusData = DATA.reduce((acc, item) => {
  if (item.status === "Available") {
    acc.push(item.name);
  }

  return acc;
}, []);

export default function DatagridActions({
  toggleAllRows,
  openModal,
  selectedItems,
}) {
  const selectedCount = selectedItems?.length ?? 0;
  const isIndeterminate = selectedCount > 0 && selectedCount < DATA.length;
  const isAllRowsSelected = selectedCount > 0 && selectedCount === DATA.length;

  // Checking if all selected rows have status as 'Available'
  const disableDownload =
    selectedCount === 0 ||
    !selectedItems?.every((name) => availableStatusData.includes(name));

  // Logic to toggle All rows selection with Select All checkbox
  const toggleAllRowsSelection = () => {
    if (isAllRowsSelected) {
      toggleAllRows({});
    } else {
      const allSelectedRow = DATA.reduce((acc, item) => {
        acc[item.name] = true;
        return acc;
      }, {});

      toggleAllRows(allSelectedRow);
    }
  };

  return (
    <div className="table-actions">
      <div className="rows-selection">
        <input
          id="rowsSelection"
          type="checkbox"
          className="table-checkbox"
          ref={(el) => {
            if (el) {
              el.indeterminate = isIndeterminate;
            }
          }}
          checked={isAllRowsSelected}
          onChange={toggleAllRowsSelection}
        />
        <label htmlFor="rowsSelection">
          {selectedCount > 0 ? selectedCount : "None"} Selected
        </label>
      </div>
      <button
        className="download-btn"
        disabled={disableDownload}
        onClick={openModal}
      >
        <div className="download-icon"></div>
        Download Selected
      </button>
    </div>
  );
}
