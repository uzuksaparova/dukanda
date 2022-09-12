import React, { lazy, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.scss';
import Loading from './components/Loading';

const DukandaVersionControl = lazy(() =>
    import('./components/dukandaVersionControl/DukandaVersionControl')
);
const ScalingSystems = lazy(() =>
    import('./components/scalingSystems/ScalingSystems')
);
const GroupItem = lazy(() => import('./components/groupItem/GroupItem'));
const QrDevicesItem = lazy(() =>
    import('./components/qrDevicesItem/QrDevicesItem')
);
const QrDevices = lazy(() => import('./components/qrDevices/QrDevices'));
const Groups = lazy(() => import('./components/groups/Groups'));

const AdminPage = lazy(() => import('./components/AdminPage'));
const AdminBrands = lazy(() => import('./components/brands/AdminBrands'));
const Signin = lazy(() => import('./components/signin/Signin'));
const Sidebar = lazy(() => import('./components/sidebar/Sidebar'));
const Card = lazy(() => import('./components/card/Card'));
const BrandItem = lazy(() => import('./components/brandItem/BrandItem'));

const SyncScheduleHistory = lazy(() =>
    import('./components/syncScheduleHistory/SyncScheduleHistory')
);

const AdminClientsItem = lazy(() =>
    import('./components/adminClientsItem/AdminClientsItem')
);

const EmployeeItem = lazy(() =>
    import('./components/employeeItem/EmployeeItem')
);

const SyncScheduleItem = lazy(() =>
    import('./components/syncScheduleItem/SyncScheduleItem')
);

const SyncSchedule = lazy(() =>
    import('./components/sync/schedule/SyncSchedule')
);
const SyncManual = lazy(() => import('./components/sync/manual/SyncManual'));
const DivisionItem = lazy(() =>
    import('./components/divisionItem/DivisionItem')
);

const AdminProducts = lazy(() =>
    import('./components/adminProducts/AdminProducts')
);

const NotFoundRoute = lazy(() =>
    import('./components/notFoundRoute/NotFoundRoute')
);

const AdminEmployees = lazy(() =>
    import('./components/employees/AdminEmployees')
);

const AdminDivisions = lazy(() =>
    import('./components/divisions/AdminDivisions')
);

const AdminClients = lazy(() =>
    import('./components/adminClients/AdminClients')
);

const AdminUnits = lazy(() => import('./components/adminUnits/AdminUnits'));

const UnitItem = lazy(() => import('./components/unitItem/UnitItem'));

const App = () => {
    return (
        <Router>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route path="/" component={Signin} exact />
                    {Cookies.get('admin_token') ? (
                        <>
                            <Sidebar />
                            <Route
                                path="/welcomePage"
                                component={AdminPage}
                                exact
                            />
                            <Route
                                path="/groups/mainGroups"
                                component={Groups}
                                exact
                            />
                            <Route
                                path="/groups/mainGroups/:id"
                                component={GroupItem}
                                exact
                            />
                            <Route
                                path="/groups/subgroups"
                                component={Groups}
                                exact
                            />
                            <Route
                                path="/groups/subgroups/:id"
                                component={GroupItem}
                                exact
                            />
                            <Route
                                path="/brands"
                                component={AdminBrands}
                                exact
                            />
                            <Route
                                path="/brands/:id"
                                component={BrandItem}
                                exact
                            />
                            <Route
                                path="/products"
                                component={AdminProducts}
                                exact
                            />
                            <Route
                                path={'/products/:id'}
                                component={Card}
                                exact
                            />
                            <Route
                                path="/divisions"
                                component={AdminDivisions}
                                exact
                            />
                            <Route
                                path="/clients"
                                component={AdminClients}
                                exact
                            />

                            <Route
                                path={'/clients/:id'}
                                component={AdminClientsItem}
                                exact
                            />

                            <Route
                                path="/qrDevices"
                                component={QrDevices}
                                exact
                            />
                            <Route
                                path={'/qrDevices/:id'}
                                component={QrDevicesItem}
                                exact
                            />
                            <Route
                                path={'/divisions/:id'}
                                component={DivisionItem}
                                exact
                            />
                            <Route path="/units" component={AdminUnits} exact />
                            <Route
                                path="/units/:id"
                                component={UnitItem}
                                exact
                            />
                            <Route
                                path="/employees"
                                component={AdminEmployees}
                                exact
                            />
                            <Route
                                path={'/employees/:id'}
                                component={EmployeeItem}
                                exact
                            />

                            <Route
                                path="/syncs/sschedules"
                                component={SyncSchedule}
                                exact
                            />
                            <Route
                                path="/syncs/smanual"
                                component={SyncManual}
                                exact
                            />
                            <Route
                                path="/syncs/sschedules/:id"
                                component={SyncScheduleItem}
                                exact
                            />

                            <Route
                                path="/syncs/sschedules/histories/:id"
                                component={SyncScheduleHistory}
                                exact
                            />
                            <Route
                                path="/syncs/shistories"
                                component={SyncScheduleHistory}
                                exact
                            />
                            <Route
                                path="/dukandaVersionControl"
                                component={DukandaVersionControl}
                                exact
                            />
                            <Route
                                path="/scalingSystems"
                                component={ScalingSystems}
                                exact
                            />

                            <Route
                                path="*"
                                to="/notFoundRoute"
                                component={NotFoundRoute}
                            />
                        </>
                    ) : (
                        <Redirect to={{ pathname: '/' }} exact />
                    )}
                </Switch>
            </Suspense>
        </Router>
    );
};

export default App;
