import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from'./logo.png';

const HeaderLoggedOut = () =>
{
	return (
		<header className="mb-2">
		<nav className='navbar'>
			<div className="flex" style={{ width: '100%' }}>
				<div className="navbar-title">
					<Link to='/home' alt='Home' title='Home'>
						<img src={logo} alt='logo' className='logo'/><span> </span>
					</Link>
					<NavLink to='/home' alt='Home' title='Home'>
						BeeTogether
					</NavLink>
				</div>
				<div>
					<ul>
						<li>
							<NavLink to='/about' alt='About' title='About'>
								<i className="fas fa-question-circle color-primary"></i> About
							</NavLink>
						</li>
					</ul>
				</div>
				<div>
					<ul>
						<li><NavLink to='/login' alt='Login' title='Login'><i className="fas fa-key color-primary"></i> Login</NavLink></li>
						<li><NavLink to='/register' alt='Register' title='Register'><i className="fas fa-edit color-primary"></i> Register</NavLink></li>
					</ul>
				</div>
			</div>
		</nav>
		</header>
	)
}

export default HeaderLoggedOut;