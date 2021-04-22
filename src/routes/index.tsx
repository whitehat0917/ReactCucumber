import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MarcelRoute from './MarcelRoute';
import MarcelPrivateRoute from './MarcelPrivateRoute';
import routes from './routes';
import { v4 } from 'uuid';

interface IRoutes {
    authorized: boolean
}

const Routes: React.FC<IRoutes> = ({ authorized }) => (
    <Switch>
        {routes.map(route => {
            if (route.private) {
                return <MarcelPrivateRoute 
                            key={v4()}
                            // authorized={authorized} 
                            { ...route } />;
            }

            return <MarcelRoute key={v4()} { ...route } />;
        })}
        <Route 
            exact
            path="/:userName/:collectionUrl"  
            render={(props) => {
                // console.log('props -> ', props);
                return <Redirect to={`collections/${props.match.params.collectionUrl}`} />
            }}/>
    </Switch>
);

export default Routes;