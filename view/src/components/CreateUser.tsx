import React, { useEffect } from 'react';
import axios from 'axios';

function CreateUser() {
    const [roles, setRoles] = React.useState([]);

    const [users, setUsers] = React.useState({
        serialNumberRef: React.useRef<HTMLInputElement>(null),
        firstnameRef: React.useRef<HTMLInputElement>(null),
        emailRef: React.useRef<HTMLInputElement>(null),
        lastnameRef: React.useRef<HTMLInputElement>(null),
        usernameRef: React.useRef<HTMLInputElement>(null),
        passwordRef: React.useRef<HTMLInputElement>(null),
        passwordConfirmationRef: React.useRef<HTMLInputElement>(null),
        roleRef: React.useRef<HTMLSelectElement>(null),
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
        firstname: '',
        email: '',
        lastname: '',
        username: '',
        password: '',
        password_confirmation: '',
        role_id: '',
        serial_number: ''
    });

    async function getRoles() {
        await http
            .get('/api/role/')
            .then((response) => {
                setRoles(response.data.Role.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSubmit = async (e: any) => {
        console.log('Submit', {
            serial_number: users.serialNumberRef.current?.value,
            firstname: users.firstnameRef.current?.value,
            email: users.emailRef.current?.value,
            lastname: users.lastnameRef.current?.value,
            username: users.usernameRef.current?.value,
            password: users.passwordRef.current?.value,
            password_confirmation: users.passwordConfirmationRef.current?.value,
            role_id: users.roleRef.current?.value
        });
        e.preventDefault();
        http.post('api/user/create', {
            serial_number: users.serialNumberRef.current?.value,
            firstname: users.firstnameRef.current?.value,
            email: users.emailRef.current?.value,
            lastname: users.lastnameRef.current?.value,
            username: users.usernameRef.current?.value,
            password: users.passwordRef.current?.value,
            password_confirmation: users.passwordConfirmationRef.current?.value,
            role_id: users.roleRef.current?.value
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
        getRoles();
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
                        htmlFor="username"
                        className="mb-3 block text-black dark:text-white"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        autoComplete="username"
                        ref={users.usernameRef}
                        required
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {
                        errors.username && (
                            <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                {errors.username}
                            </p>)
                    }
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="mb-3 block text-black dark:text-white"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="*********"
                        autoComplete="password"
                        ref={users.passwordRef}
                        required
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {
                        errors.password && (
                            <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                {errors.password}
                            </p>)
                    }
                </div>
                <div>
                    <label
                        htmlFor="firstname"
                        className="mb-3 block text-black dark:text-white"
                    >
                        Firstname
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="firstname"
                        autoComplete="firstname"
                        ref={users.firstnameRef}
                        required
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {
                        errors.firstname && (
                            <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                {errors.firstname}
                            </p>)
                    }
                </div>
                <div>
                    <label
                        htmlFor="password_confirmation"
                        className="mb-3 block text-black dark:text-white"
                    >
                        Password Confirmation
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        placeholder="*********"
                        autoComplete="password_confirmation"
                        ref={users.passwordConfirmationRef}
                        required
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {
                        errors.password_confirmation && (
                            <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                {errors.password_confirmation}
                            </p>)
                    }
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="mb-3 block text-black dark:text-white"
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="email"
                        autoComplete="email"
                        ref={users.emailRef}
                        required
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {
                        errors.email && (
                            <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                {errors.email}
                            </p>)
                    }
                </div>
                <div>
                    <label
                        htmlFor="lastname"
                        className="mb-3 block text-black dark:text-white"
                    >
                        Lastname
                    </label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="lastname"
                        autoComplete="lastname"
                        ref={users.lastnameRef}
                        required
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {
                        errors.lastname && (
                            <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                {errors.lastname}
                            </p>)
                    }
                </div>
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
                        ref={users.serialNumberRef}
                        required
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {
                        errors.serial_number && (
                            <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                {errors.serial_number}
                            </p>)
                    }
                </div>
                <div>
                    <label
                        htmlFor="role_id"
                        className="mb-3 block text-black dark:text-white"
                    >
                        Role
                    </label>
                    <select
                        name="role_id"
                        id='role_id'
                        ref={users.roleRef}
                        required
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="">Select Person</option>
                        {roles.map((role: any) => (
                            <option key={role.id} value={role.id}
                            >
                                {role.name}
                            </option>
                        ))}
                    </select>
                    {
                        errors.role_id && (
                            <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                {errors.role_id}
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
                    Create User
                </button>
            </form>
        </div>
    );
}
export default CreateUser;