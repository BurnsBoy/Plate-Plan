import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Plans from '../pages/Plans'
import About from '../pages/About'

interface RouteType{
    path: string,
    component: () => JSX.Element,
    name: string
    protected: boolean
}

const routes: RouteType[] = [
    {
      path: "",
      component: Dashboard,
      name: "Dashboard",
      protected: false
    },
    {
      path: "/plans",
      component: Plans,
      name: "Plans",
      protected: true
    },
    {
      path: "/about",
      component: About,
      name: "About",
      protected: false
    },
  ]

  export default routes