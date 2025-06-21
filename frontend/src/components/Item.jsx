import { Link } from "react-router-dom"


const GetItems = ({ items }) => {

 
    
  return (
    <div className="container  mx-auto   px-4 py-8">

      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4  gap-6">
        {items.map((item) => (
          <div 
            className="group  bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
            key={item._id}
          >
           
            <div className="relative overflow-hidden">
              <img 
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" 
                src={item.coverImage} 
                alt={item.name}
                loading="lazy"
              />
            
              
            </div>

       
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">{item.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              
            
            
              
              <div className="mt-3 flex justify-between items-center">
                <button  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  <a
  href={`/item/${item._id}/${item.name}/${item.type}`}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-500 hover:underline"
>
 View Details
</a>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GetItems