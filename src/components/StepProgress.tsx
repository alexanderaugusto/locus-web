import React, { useState } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Button } from './index'

type StepProps = {
  label: string
  content: () => JSX.Element
}

type StepProgressProps = {
  steps: Array<StepProps>
  initialStep?: number
  onSubmit: () => void
}

const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  initialStep = 0,
  onSubmit
}) => {
  const [activeStep, setActiveStep] = useState(initialStep)

  function previousStep() {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  function nextStep() {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1)
    }
  }

  function isActiveStep(step: number) {
    return activeStep === step
  }

  function isCompleteStep(step: number) {
    return step < activeStep
  }

  return (
    <div className="step-progress">
      <ul className="steps-container">
        {steps.map((item, index) => {
          return (
            <>
              <li
                key={index}
                className={
                  'step ' +
                  (isActiveStep(index) ? 'active-step ' : '') +
                  (isCompleteStep(index) ? 'complete-step' : '')
                }
              >
                <div className="step-circle">
                  <div className="step-number">
                    {isCompleteStep(index) ? (
                      <Icon id="icon" icon={faCheck} />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index + 1 !== steps.length && <div className="step-line" />}
                </div>
                <label className="step-label">{item.label}</label>
              </li>
            </>
          )
        })}
      </ul>
      <div className="steps-content">{steps[activeStep].content()}</div>
      <div className={'steps-action ' + (activeStep === 0 ? 'step-0' : '')}>
        {activeStep !== 0 && <Button onClick={previousStep}>Anterior</Button>}
        {activeStep < steps.length ? (
          <Button onClick={nextStep}>Próximo</Button>
        ) : (
          <Button onClick={onSubmit}>Finalizar</Button>
        )}
      </div>
    </div>
  )
}

export default StepProgress
