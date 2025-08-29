import StatCard from "../../components/StateCard/StatCard";

const AdminDashboard = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Users" value="120" />
        <StatCard title="Categories" value="15" />
        <StatCard title="Items" value="240" />
        <StatCard title="Orders" value="98" />
      </div>
    </div>
  );
};
export default AdminDashboard;
