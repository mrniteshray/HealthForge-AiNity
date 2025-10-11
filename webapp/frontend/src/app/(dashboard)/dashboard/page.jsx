import DashboardCards from "../../../components/dashboard/DashboardCards";
import Items from "../../../components/dashboard/Items";
import TasksTimetable from "../../../components/dashboard/TasksTimetable";

export default function Dashboard() {
  return (
    <div>
      <Items />
      <DashboardCards />
      <TasksTimetable />
    </div>
  );
}