import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MessengerProvider from './Context/MessengerContext';
import ThemeProvider from './Context/ThemeContext';
import { AuthContext } from './Context/AuthContext';
import SinglePost from './SinglePages/SinglePost';

const Start = React.lazy(() => import("./Pages/Start"));
const Home = React.lazy(() => import("./Pages/Home"));
const Profile = React.lazy(() => import("./Profiles/Profile"));
const Messenger = React.lazy(() => import("./Messenger/Messenger"));
const Notifications = React.lazy(() => import("./Pages/Notifications"))


function App(props) {
    const { user } = React.useContext( AuthContext );
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <ThemeProvider>
              <MessengerProvider>
                <Router>
                  <Switch>
                    <Route exact path="/" component={Start}/>
                    <Route exact path={`/${user.firstName}'s_App/:pageRender`} component={Home} />
                    <Route exact path="/Post/:id" component={SinglePost} />
                    <Route exact path="/Profile/:username" component={Profile} />
                    <Route exact path="/MessengerYoumi/:chatRoom_KEY" component={Messenger} />
                    <Route exact path="/Notifications" component={Notifications} />
                  </Switch>
                </Router>
              </MessengerProvider>
            </ThemeProvider>
         </React.Suspense>
    );
}

export default App;