// components/ProjectHeader.tsx
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Navigate, useNavigate } from 'react-router-dom';


const ProjectHeader = ({id, title}) => {
  const navigate= useNavigate();
    return (
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-gray-500 text-sm">Project ID: {id}</p>
        </div>
        <div className="flex gap-2 mb-4">
          <button 
          onClick={()=>navigate('/projects')}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md">
            <AiOutlineArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>
      </div>
    );
  };
  
  export default ProjectHeader;
  