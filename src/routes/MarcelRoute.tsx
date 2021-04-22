import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';

const MarcelRoute = ({ component: Component, onLoad, computedMatch, ...rest }) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (typeof onLoad !== 'undefined') {
            dispatch(onLoad(computedMatch));
        }
    }, [dispatch]);

    if (Component) {
        return <Route { ...rest } render={props => 
            <Component { ...props } />
        } />
    }

    return null;
}

export default MarcelRoute;