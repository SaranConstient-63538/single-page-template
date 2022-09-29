
const MainPage = React.lazy(()=> import('./components/MainPage'))

const routers =[
    { path:'/', exact:true,name:Home},
    {path:'/dashboard', name: 'Dashboard', element:MainPage}
]
export default routers;