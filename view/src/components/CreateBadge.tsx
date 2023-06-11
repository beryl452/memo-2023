import React, { useEffect } from 'react';
import axios from 'axios';

function CreateBadge() {
  const [users, setUsers] = React.useState([]);

  const [badges, setBadges] = React.useState({
    serialNumberRef: React.useRef<HTMLInputElement>(null),
    userIdRef: React.useRef<HTMLSelectElement>(null),
  });

  const http = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem('auth') || '{}'
      ).token}`,
    },
    withCredentials: true,
  });

  const [errors, setErrors] = React.useState({
      serial_number: '',
      user_id: '',
  });

  async function getUsers() {
    await http
      .get('/api/user/users/allUsers')
      .then((response) => {
        console.log('users', response);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
 
  const handleSubmit = async (e: any) => {
    console.log('Submit', {
      serial_number: badges.serialNumberRef.current?.value,
      user_id: badges.userIdRef.current?.value,
    });
    e.preventDefault();
    http.post('api/badge/create',{
      serial_number: badges.serialNumberRef.current?.value,
      user_id: badges.userIdRef.current?.value,
    })
    .then((response) => {
      console.log('response', response);
    })
    .catch((error) => {
      setErrors(
        error.response.data.errors
      )
      console.log(error);
    });
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="rounded-lg border border-stroke bg-white py-4 px-6.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mb-4 grid gap-4 sm:grid-cols-2 "
      >
        <div>
          <label
            htmlFor="serial_number"
            className="mb-3 block text-black dark:text-white"
          >
            Card Number
          </label>
          <input
            type="text"
            name="serial_number"
            id="serial_number"
            placeholder="serial_number"
            autoComplete="serial_number"
            ref={badges.serialNumberRef}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {
            errors.serial_number && (
              <p  className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                {errors.serial_number}
              </p>)
          }
        </div>
        <div>
          <label
            htmlFor="user_id"
            className="mb-3 block text-black dark:text-white"
          >
            User
          </label>
          <select
            name="user_id"
            id='user_id'
            ref={badges.userIdRef}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="">Select Person</option>
            {users.map((user: any) => (
              <option key={user.id} value={user.id}
              >
                {user.firstname} {user.lastname}
              </option>
            ))}
          </select>
          {
            errors.user_id && (
              <p  className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                {errors.user_id}
              </p>)
          }
        </div>
        <button
          className="flex items-center mt-6 w-60 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
          type="submit"
          onClick={() => {
            // handleSubmit;
            // navigate('/agents');
          }}
        >
          Create Agent
        </button>
      </form>
    </div>
  );
}
export default CreateBadge;