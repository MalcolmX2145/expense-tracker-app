import Header from "../components/Header";
import ExpenditureChart from "../components/dashboard/ExpenditureChart";

const Dashboard = () => {
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10 flex flex-col items-center">
        <Header title="Dashboard" />
      
        {/* CHARTS */}
        <div className='grid grid-col-1 lg:grid-cols-2 gap-8 w-full p-4 sm:p-6 lg:p-8'>
          <div className='lg:col-span-2 w-full'>
            <ExpenditureChart className='w-full h-96' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
