
import '../style/App.css';
import AdminPage from '../pages/AdminPage';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import MyBookings from '../pages/MyBookings';
import { Route, Switch, Link } from 'react-router-dom'
import ConfirmBooking from '../pages/ConfirmBooking';
import SignInPage from '../pages/SignInPage';
import ChooseSeats from '../pages/ChooseSeats';
import Tagline from '../pages/Tagline';
import StepperPage from '../components/StepperPage';
import Reservation from '../pages/Reservation';
import SignUp from '../components/SignUp';
import PassengerCounter from '../components/PassengerCounter'

import ProfileDropdown from '../components/ProflieDropdown'

function App() {
  return (
    <div className="App">

      <Switch>
      <Route exact path="/" >
        <Tagline/>
      </Route>
      <Route path="/bookings" >
        <MyBookings/>
      </Route>
      <Route path="/admin" >
        <AdminPage/>
      </Route>
      <Route path="/profile" >
        <Profile/>
      </Route>
      <Route path="/confirm" >
        <ConfirmBooking/>
      </Route>
      <Route path="/signin" >
        <SignInPage/>
      </Route>
      <Route path="/seats" >
        <ChooseSeats/>
      </Route>
      <Route path="/search" >
        <Home/>
      </Route>
      <Route path="/reserve" >
        <Reservation/>
      </Route>
      <Route path="/signUp" >
        <SignUp/>
      </Route>
      </Switch>


    </div>
  );
}

export default App;
