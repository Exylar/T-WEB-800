import useUser from "contexts/user";
import { Switch, Route, Redirect } from "react-router-dom";

import PublicLayout from "layouts/Public";
import LoggedLayout from "layouts/Logged";

import PublicHome from "pages/public/Home";
import Login from "pages/public/Login";
import Register from "pages/public/Register";

import Trips from "pages/logged/Trips";
import TripPlan from "pages/logged/TripPlan";
import TripTodo from "pages/logged/TripTodo";
import TripExpense from "pages/logged/TripExpense";

const Routes = () => {
  const [ctx] = useUser();

  return (
    <>
      {ctx.user ? (
        <LoggedLayout>
          <Switch>
            <Route exact path="/trips/:uid/plan" component={TripPlan} />
            <Route exact path="/trips/:uid/todo" component={TripTodo} />
            <Route exact path="/trips/:uid/expense" component={TripExpense} />
            <Route exact path="/trips" component={Trips} />
            <Route exact path="/trips/:uid" component={TripPlan} />
            <Redirect to="/trips" />
          </Switch>
        </LoggedLayout>
      ) : (
        <PublicLayout>
          <Switch>
            <Route exact path="/" component={PublicHome} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Redirect to="/" />
          </Switch>
        </PublicLayout>
      )}
    </>
  )
}

export default Routes;