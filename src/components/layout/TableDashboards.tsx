interface TableDashboardsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddClick?: () => void;
}

const TableDashboards = ({
  searchTerm,
  onSearchChange,
  onAddClick,
}: TableDashboardsProps) => {
  return (
    <div className="table-dashboards">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div>
        <button onClick={onAddClick}>Add</button>
      </div>
    </div>
  );
};

export default TableDashboards;
