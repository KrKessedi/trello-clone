import { Routes, Route } from 'react-router-dom'
import Dashboard from './Home/Dashboard'
import Cart from './pages/Cart/Cart'
import Navbar from './components/Navbar'

const MainRoutes = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route index element={<Dashboard />} />
				<Route path='/cart' element={<Cart />} />
			</Routes>
		</>
	)
}

export default MainRoutes
