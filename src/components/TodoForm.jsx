import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { databases } from '../appwrite/appwriteConfig';

function TodoForm() {
  const [todo, setTodo] = useState('');

  const collectionID = import.meta.env.VITE_MY_COLLECTION;

  const handleSubmit = (e) => {
    e.preventDefault();
    const promise = databases.createDocument(collectionID, uuidv4(), {
      todo
    });
    setTodo('')

    console.log(promise);
    promise.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );

  };



  return (
    <form onSubmit={handleSubmit} className="my-4">
      <input
        type="text"
        placeholder="Enter Todo"
        value={todo}
        className="px-7 py-2 border-none rounded-md mr-2 text-black w-full text-center"
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button
        className="mt-2 w-full bg-black hover:bg-white hover:text-black transition-all text-white px-4 py-2 rounded-md"
        type='submit'
      >
        Add Todo
      </button>
    </form >
  );
}

export default TodoForm;
