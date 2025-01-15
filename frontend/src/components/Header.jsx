const Header = ({ title }) => {
	return (
	  <header className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
		{/* Added 'w-full' to make it cover the entire width */}
		<div className="w-full py-3 px-4 sm:px-6 lg:px-8">
		  <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
		</div>
	  </header>
	);
  };
  
  export default Header;
  