import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router";
import authStore from "../../stores/auth";

interface Props {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<Props> = ({ exact, path, component }) => {
  const history = useHistory();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (!authStore.loading && authStore.user) {
      setLogged(true);
    }

    if (!authStore.loading && !authStore.user) {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStore.loading]);

  if (logged) return <Route exact={exact} path={path} component={component} />;
  else return null;
};

export default observer(PrivateRoute);
