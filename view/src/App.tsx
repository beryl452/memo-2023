import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import Roles from './pages/Dashboard/Roles';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Abilities from './pages/Dashboard/Abilities';
import Badges from './pages/Dashboard/Badges';
import CreateBadges from './pages/Form/CreateBadges';
import EditBadges from './pages/Form/EditBadges';
import Users from './pages/Dashboard/Users';
import CreateUser from './components/CreateUser';
import CreateUsers from './pages/Form/CreateUsers';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (
    <>
      <Routes>
      <Route path="/users" element={<Users />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/badges" element={<Badges />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/badge/create" element={<CreateBadges />} />
        <Route path="/user/create" element={<CreateUsers />} />
        <Route path="/badge/:badgeId/edit" element={<EditBadges/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forms/form-elements" element={<FormElements />} />
        <Route path="/forms/form-layout" element={<FormLayout />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/ui/alerts" element={<Alerts />} />
        <Route path="/ui/buttons" element={<Buttons />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route
          path="/role/:roleId/abilities"
          element={
            <Abilities />
          }
        />
      </Routes>
    </>
  );
}

export default App;
