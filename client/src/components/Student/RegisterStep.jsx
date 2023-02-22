import RegisterPage from './RegisterPage'
import SelectType from './SelectType'
import './stepper.css'
function Stepper() {
  return (<div className="bs-stepper">
  <div className="bs-stepper-header" role="tablist">
    
    <div className="step" data-target="#register-part">
      <button type="button" className="step-trigger" role="tab" aria-controls="register-part" id="register-part-trigger">
        <span className="bs-stepper-label">Regster</span>
      </button>
    </div>
    <div className="line"></div>
    <div className="step" data-target="#select-type-part">
      <button type="button" className="step-trigger" role="tab" aria-controls="select-type-part" id="select-type-part-trigger">
        <span className="bs-stepper-label">Select Type</span>
      </button>
    </div>
  </div>
  <div className="bs-stepper-content">
    
    <div id="register-part" className="content" role="tabpanel" aria-labelledby="register-part-trigger"></div>
    <div id="select-type-part" className="content" role="tabpanel" aria-labelledby="select-type-part-trigger"><SelectType/></div>
  </div>
</div>)
}

export default Stepper