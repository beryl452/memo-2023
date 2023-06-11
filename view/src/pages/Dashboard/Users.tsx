import TableUsers from '../../components/TableUsers.tsx';
import DefaultLayout from '../../layout/DefaultLayout.tsx';

const Users = () => {
    return (
        <DefaultLayout>
            <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <TableUsers />
            </div>
        </DefaultLayout>
    );
};

export default Users;