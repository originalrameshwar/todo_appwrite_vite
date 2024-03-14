import React, { useState, useEffect } from 'react'
import { account } from '../appwrite/appwriteConfig'
import { useNavigate, Link } from 'react-router-dom'
import TodoForm from './TodoForm'
import Todos from './Todos'


function Profile() {
  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState()

  useEffect(() => {
    const getData = account.get()
    getData.then(
      function (response) {
        setUserDetails(response)
        //console.log(userDetails);
      },
      function (error) {
        console.log(error);
      }
    )
  }, [])

  const handleLogout = async () => {
    try {
      await account.deleteSession("current")
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      {userDetails && (
        <div className=" min-h-screen w-full items-center justify-center text-center bg-[#020818] h-screen">
          <nav className='py-1 flex text-center items-center justify-between px-10 bg-zinc-600/20 bg-blur-3xl'>

            <h1 className=' text-white/50 font-bold text-2xl'>Hi! <i className='text-cyan-500/90'>{userDetails.name}</i></h1>

            <div>
              <button
                className="bg-slate-900/40 border-red-500 border px-5 py-2 text-white transition-all hover:text-black hover:border-transparent hover:bg-white rounded-xl"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </nav>

          {/* TODO FORM */}
          <div className="items-center justify-center lg:max-w-xl md:max-w-md sm:max-w-sm mx-auto max-w-sm min-w-[390px] min-mx-3 mt-8 p-4 bg-white rounded-md" style={{ background: 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)' }}>
            <TodoForm />
            <Todos />
          </div>
          {/* TODOS BOX */}
        </div>
      )}
    </>
  )
}

export default Profile