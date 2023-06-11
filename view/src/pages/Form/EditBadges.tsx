import { useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import EditBadge from '../../components/EditBadge';
import DefaultLayout from '../../layout/DefaultLayout';
import { useLocation } from 'react-router-dom';


const EditBadges = () => {
    const location = useLocation();
    useEffect(() => {
        console.log('location', location.state);
    }, []);
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit Badge" />
            <EditBadge badge={location.state.badge}/>
        </DefaultLayout>
    );
};

export default EditBadges;