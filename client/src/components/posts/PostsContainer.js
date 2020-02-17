import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../private-route/PrivateRoute';

import PostIndex from './PostIndex';
import PostForm from './PostForm';
import PostShow from './PostShow';

const PostsContainer = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`} component={PostIndex} />
      <PrivateRoute exact path={`${path}/new`} component={PostForm} />
      <Route exact path={`${path}/:id`} component={PostShow} />
    </Switch>
  );
};

export default PostsContainer;
