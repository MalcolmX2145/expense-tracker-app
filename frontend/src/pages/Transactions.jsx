import ExpenditureTable from "../components/transactions/ExpenditureTable"
import Header from "../components/Header"


const Transactions = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
    <Header title="Transactions"/>

    <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        

        <ExpenditureTable />

      </main>
    </div>

  )
}

export default Transactions