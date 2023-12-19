import { createProject } from '../../actions/APIActions';
import { useCookie } from '../../hooks/useCookie';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

interface CreateProjectProps {
	handleCloseModal: () => void;
}

function CreateProject(props: CreateProjectProps ) {

  const [token, setToken] = useLocalStorage('vaux-staff-token', JSON.stringify(null));
  const [userId, setUserId] = useLocalStorage('userId', JSON.stringify(null));

  const [ projectTitle, setProjectTitle ] = useState('');
  const navigate = useNavigate();
  const { handleCloseModal } = props;

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    const payload = {
      name: projectTitle, user_id: userId
    }
    const data = await createProject(token, payload);
    let { Error, Id } = data || {};
    if (Id) {
      handleCloseModal();
      routeChange('/studio/projects/' + Id);
    }
    if (Error) {
      console.log(Error);
    }
  }

  const routeChange = (path: string) => {
    navigate(path);
  }

  return (
    <div>
      <div className="flex items-center justify-between py-4 px-6 bg-white border-solid border-b-[1px] border-gray-300">
        <div className="flex flex-col">
          <h3 className="font-bold">Create a Project</h3>
        </div>
        <button onClick={handleCloseModal}>
          <svg data-icon="cross" width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
			<div className="py-4 px-10 my-2">
        <form onSubmit={(event: any) => handleFormSubmit(event)}>
          <div className='mb-3 py-2'>
            <label htmlFor="title" className='text-sm text-black-second font-semibold'>Project Title</label>
            <input id="title" type="text" className='text-sm font-normal border border-gray-300 rounded-md w-full p-2 mt-2 focus-visible:outline-none' onChange={(event: any) => setProjectTitle(event.target.value)} />
          </div>
          <div className='mb-3 px-4 py-2 border-b border-gray-300'></div>
          <div className='mb-3 py-2 float-right'>
            <button type='submit' className='text-white bg-primary border border-solid border-primary px-4 py-2 rounded-xmd font-medium hover:bg-white hover:text-primary'>Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProject