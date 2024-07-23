import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
// h
function TriggerRendererProp(infox) {

    return (
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="button-tooltip-2" className='info-btn-overlay' > {infox ? (<p>{infox}</p>) : (<p>No hay info disponible.</p>)} </Tooltip>}
        
      >
        {({ ref, ...triggerHandler }) => (
          <Button
            variant="light"
            {...triggerHandler}
            className="d-inline-flex align-items-center"
          >
            <Image
              ref={ref}
              roundedCircle
              src={require('../static/INFO.png')}
            />
          </Button>
        )}
      </OverlayTrigger>
    );
  }
  
  export default TriggerRendererProp;