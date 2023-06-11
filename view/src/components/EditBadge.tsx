import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Props = {
    badge: any,
};

function EditBadge(props: Props) {
    const navigate = useNavigate();
    const [users, setUsers] = React.useState([]);

    const [badges, setBadges] = React.useState({
        id: props.badge.id,
        serialNumber: props.badge.serial_number,
        userId: props.badge.user[0] ? props.badge.user[0].id : '',
    });

    const onChange = (e: any) => {
        setBadges({ ...badges, [e.target.name]: e.target.value });
    };
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
        e.preventDefault();
        http.put(`api/badge/update/${badges.id}`, {
            serial_number: badges.serialNumber,
            user_id: badges.userId,
        }).then((response) => {
            console.log('response', response);
            navigate('/badges');

        }).catch((error) => {
            setErrors(
                error.response.data.errors
            );
            console.log(error);
        });
    };
    useEffect(() => {
        getUsers();
        // Mettre dans badges.userIdRef.current?.value la valeur de l'id de l'utilisateur
        console.log('badgeEdit', props.badge);
        //    console.log('badgeEdit', props.badge.user_id);
        //    setBadges({
        //         ...badges,
        //         userIdRef: React.createRef<HTMLSelectElement>(props.badge.user[0].id),
        //         serialNumberRef: React.useRef<HTMLInputElement>(props.badge.serial_number),
        //         });
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
                        htmlFor="serialNumber"
                        className="mb-3 block text-black dark:text-white"
                    >
                        Card Number
                    </label>
                    <input
                        type="text"
                        name="serialNumber"
                        id="serialNumber"
                        placeholder="serial Number"
                        autoComplete="serialNumber"
                        value={badges.serialNumber}
                        onChange={onChange}
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
                        htmlFor="userId"
                        className="mb-3 block text-black dark:text-white"
                    >
                        User
                    </label>
                    <select
                        name="userId"
                        id='userId'
                        value={badges.userId}
                        required
                        onChange={onChange}
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
                            <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
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
                    Edit Agent
                </button>
            </form>
        </div>
    );
}
export default EditBadge;