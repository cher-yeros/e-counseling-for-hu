
function NavbarCopy() {
    return (
        <div style={{height: '100px', margin: '0 !important'}} className="container-fluid bg-light position-relative shadow">
        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5">
            <a href="" className="navbar-brand font-weight-bold text-secondary" 
            style={{fontSize: '50px'}}>
                <img
                style={{height: '5rem'}}
                 className=""  src="assets/images/hu.png"/>
                <span className="text-primary">Hawassa university </span>
            </a>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <a style={{right: '0', position: 'absolute'}} href="" className="btn btn-primary px-4">REGISTER</a>
            </div>
        </nav>
    </div>
    )
  }
  
  export default NavbarCopy