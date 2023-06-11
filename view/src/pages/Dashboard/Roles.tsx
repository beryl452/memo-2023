import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import ChartTwo from '../../components/ChartTwo.tsx';
import ChatCard from '../../components/ChatCard.tsx';
import MapOne from '../../components/MapOne.tsx';
import TableRole from '../../components/TableRole.tsx';
import TableOne from '../../components/TableRole.tsx';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import SignIn from '../Authentication/SignIn.tsx';

const Roles = () => {
  return (
    <DefaultLayout>
      <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <TableRole />
      </div>
    </DefaultLayout>
  );
};

export default Roles;
