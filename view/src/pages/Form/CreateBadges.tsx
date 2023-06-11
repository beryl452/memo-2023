import Breadcrumb from '../../components/Breadcrumb';
import CreateBadge from '../../components/CreateBadge';
import DefaultLayout from '../../layout/DefaultLayout';

const CreateBadges = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Badge" />
        <CreateBadge /> 
    </DefaultLayout>
  );
};

export default CreateBadges;