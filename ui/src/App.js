import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ThemeProvider from './Context/ThemeContext';
import { AuthContext } from './Context/AuthContext';
import SinglePost from './SinglePages/SinglePost';

const Start = React.lazy(() => import("./Pages/Start"))
const Home = React.lazy(() => import("./Pages/Home"))
const Profile = React.lazy(() => import("./Profiles/Profile"))

function App(props) {
    const { user } = React.useContext( AuthContext );
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <ThemeProvider>
             <Router>
              <Switch>
                <Route exact path="/" component={Start}/>
                <Route exact path={`/${user.firstName}'s_App/:pageRender`} component={Home} />
                <Route exact path="/Post/:id" component={SinglePost} />
                <Route exact path="/Profile/:username" component={Profile} />
              </Switch>
             </Router>
            </ThemeProvider>
         </React.Suspense>
    );
}

export default App;