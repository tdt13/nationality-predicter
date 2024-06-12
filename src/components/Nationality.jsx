import { React, useEffect, useState, useRef } from 'react';

const Nationality = () => {
  // Setting the user name in state from the input field
  // Setting the nationality and probability variables in state

  const [username, setUsername] = useState('');
  const [userNationality, setUserNationality] = useState('');
  const [userProbability, setUserProbability] = useState('');

  // input ref for the focus input field

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Async function to grab the API data and is called by the see nationality button; it uses the value
  // of the state variable username as input; it also
  // shows an error alert to the user if they do not fill
  // the input field but press the button

  const fetchData = async function () {
    try {
      if (username === '') {
        alert('Error! please enter a valid name');
      }
      let response = await fetch(`https://api.nationalize.io?name=${username}`);
      let data = await response.json();
      console.log(data);
      setUserProbability((data.country[0].probability * 100).toFixed(2));
      setUserNationality(data.country[0].country_id);
    } catch (err) {
      console.error('Data failed to retrieve', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 max-w-md w-full flex flex-col gap-5">
        <div>
          <input
            ref={inputRef}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name..."
          />
        </div>
        <button
          type="button"
          onClick={fetchData}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          See your nationality!
        </button>
        <div>
          <p className="text-md font-medium text-gray-700 bg-blue-100 p-4 rounded-lg shadow-sm">
            I am {userProbability} % certain you are from {userNationality}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nationality;
