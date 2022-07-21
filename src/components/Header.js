import {Route, Switch, Link } from 'react-router-dom';

export function Header() {
    return(
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="container-fluid p-2 px-5">
                <a className="navbar-brand" href="/">Post App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/*<div className="collapse navbar-collapse" id="collapsibleNavbar">*/}
                    {/*<ul className="navbar-nav ms-auto">*/}
                        {/*<li className="nav-item">*/}
                            {/*<Link className="nav-link" to="/sign-in">Login</Link>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                            {/*<Link className="nav-link" to="/">Sign up</Link>*/}
                        {/*</li>*/}
                    {/*</ul>*/}
                {/*</div>*/}
            </div>
        </nav>
    )
}