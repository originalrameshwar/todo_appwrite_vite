import React, { useState, useEffect } from 'react'
import { databases } from '../appwrite/appwriteConfig'

function Todos() {
  const [todos, setTodos] = useState()
  const [loader, setLoader] = useState(false)
  const collectionID = import.meta.env.VITE_MY_COLLECTION;

  useEffect(() => {
    setLoader(true)
    const getTodos = databases.listDocuments(collectionID)

    getTodos.then(
      function (response) {
        setTodos(response.documents)
      },
      function (error) {
        console.log(error);
      }
    )
    setLoader(false)
  }, [todos])

  const deleteTodo = (id) => {
    const promise = databases.deleteDocument(collectionID, id)
    promise.then(
      function (response) {
        console.log(response);  // TODO: create a notification burger 
      },
      function (error) {
        console.log(error); // TODO: create a notification burger 
      }
    )
  }


  return (
    <div className="max-w-7xl mx-auto max-h-72 sm:max-h-96 min-h-0  overflow-auto">
      <p className="text-xl font-bold mb-2 text-white">Todo List</p>
      {loader ? (
        <p>Loading ...</p>
      ) : (

        <ul>
          {todos && todos.map(item => (
            <li key={item.$id} className="flex items-center justify-between mb-2 rounded-sm hover:bg-white/80 hover:text-black transition-all text-white bg-black/40 py-2 px-5">
                <p className=" text-wrap max-w-fit leading-relaxed">{item.todo}</p>
                {/* <div className='w-[70px] '> */}
                <button
                  className="text-red-500 ml-2 py-1"
                  onClick={() => deleteTodo(item.$id)}
                >
                  ❌
                </button>
                {/* <button
                  className="text-red-500 ml-2 py-1"
                  onClick=''
                >
                  ✏️
                </button> */}
              {/* </div> */}
                {/*  */}
                
            </li>
          ))}

        </ul>
      )}
    </div>
  )
}

export default Todos