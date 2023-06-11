import Breadcrumb from '../../components/Breadcrumb';
import CreateUser from '../../components/CreateUser';
import DefaultLayout from '../../layout/DefaultLayout';

const CreateUsers = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create User" />
        <CreateUser />
    </DefaultLayout>
  );
};

export default CreateUsers;