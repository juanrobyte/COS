import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from '../Modal.js';
import useModal from '../hooks/useModal.js'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function BasicExample({planSelected, setPlanSelected}) {

  const [menuVisible, setMenuVisible] = useState(false);
  const [isOpenModal, openModal, closeModal] = useModal(false)
  const [isOpenModal1, openModal1, closeModal1] = useModal(false)
  var cobertx = []
  var providerx = []
  var tarifax = []
  const [cobert, setCobert] = useState([])
  const [provider, setProvider] = useState([])
  const [tarifas, setTarifas] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [fullData, setFullData] = useState([])
  const [viajeros, setViajeros] = useState([])
  const [categorias, setCategorias] = useState([])
  const [destinos, setDestinos] = useState([])
  const [securePlans, setSecurePlans] = useState([])
  const [precioMinimo, setPrecioMinimo] = useState(0)
  const [precioMaximo, setPrecioMaximo] = useState([])
  const [precioMaximoDefault, setPrecioMaximoDefault] = useState()
  const [precioMinimoDefault, setPrecioMinimoDefault] = useState()
  const [precioSelected, setPrecioSelected] = useState()
  const [providerSelected, setProviderSelected] = useState([])
  const [coberturaSelected, setCoberturaSelected] = useState([])
  const [allCoberturas, setAllCoberturas] = useState([])
  const [actualCategory, setActualCategory] = useState(1) 
  let location = useLocation();
  let navigate = useNavigate()
  const data = location.state

  useEffect(() => {

    console.log(data)
    if (data === null) {
      console.log('null')
      navigate('/')
    }
    else {
      console.log(data.data.viajeros.length)
      setSecurePlans(data.data.securePlans)
      setFullData(data.data)
      setViajeros(data.data.viajeros)
      setCategorias(data.data.categorias)
      setDestinos(data.data.destinos2)
      setAllCoberturas(data.data.allCoberturas)
      for (var x in data.data.securePlans) {
        var coberturas = data.data.securePlans[x].coberturas
        var proveedor = data.data.securePlans[x].proveedor
        var tarifa = data.data.securePlans[x].tarifa
        tarifax.push(tarifa.tarifaventa)
        coberturas.forEach(element => {
          if (element.coberturaDetailed[0].filtro === 1) {
            if (cobertx.some(e => e.id === element.coberturaDetailed[0].id)) {
            }
            else {
              cobertx.push(element.coberturaDetailed[0])
            }
          }
        });

        if (providerx.some(e => e.id === proveedor.id)) {
        } else {
          providerx.push(proveedor)
        }





      }
      setCobert(cobertx)
      setProvider(providerx)
      setTarifas(tarifax)
    }

  }, [])
  useEffect(()=>{console.log(planSelected)},[planSelected])

  useEffect(() => {
    setPrecioMaximo(Math.max(...tarifas))
    setPrecioMinimoDefault(Math.min(...tarifas))
    setPrecioMaximoDefault(Math.max(...tarifas))

  }, [tarifas])
  useEffect(() => {
    console.log(securePlans)
  }, [securePlans])
  const handlePrices = (target) => {
    console.log(target)
    if (target === 'lowPrice') {
      console.log('triggered')
      var newPlans = [...securePlans]
      var newOrder = newPlans.sort((p1, p2) => (p1.tarifa.tarifaventa > p2.tarifa.tarifaventa) ? 1 : (p1.tarifa.tarifaventa < p2.tarifa.tarifaventa) ? -1 : 0);

      setSecurePlans(newOrder)
    } else {
      console.log('triggered 2')
      var newPlans = [...securePlans]
      var newOrder = newPlans.sort((p1, p2) => (p1.tarifa.tarifaventa < p2.tarifa.tarifaventa) ? 1 : (p1.tarifa.tarifaventa > p2.tarifa.tarifaventa) ? -1 : 0);

      setSecurePlans(newOrder)
    }
  }

  return (
    <Accordion defaultActiveKey="1">
      <Accordion.Item eventKey="0">
        <Accordion.Header>¡Compara Ahora!</Accordion.Header>
        <Accordion.Body>
        <div className='acordeon-box'>
          <div className='cards-acordeon'>
            {planSelected[0] !== undefined ? 
              (<div className='card-acordeon'>
                <img src={require('../static/CS color.png')} alt='COS logo' className='img-card-acordeon'/>
                <strong>{securePlans[planSelected[0]].tarifa.tarifaventa}</strong>
                <a className='close-boton' onClick={()=>{
                  setPlanSelected((state) => state.filter((item) => item !== planSelected[0]))
                }}><img  src={require('../static/Close.png')} alt='close' className='close-buton1'/> </a>
              </div>)

              : (<div className='card-acordeon2'>
                  <strong>+</strong>
                  <strong>Añadir</strong>
                </div>)}

            {planSelected[1] !== undefined ? 
              (<div className='card-acordeon'>
                <img src={require('../static/CS color.png')} alt='COS logo' className='img-card-acordeon'/>
                <strong>{securePlans[planSelected[1]].tarifa.tarifaventa}</strong>
                <a className='close-boton' onClick={()=>{
                  setPlanSelected((state) => state.filter((item) => item !== planSelected[0]))
                }}><img src={require('../static/Close.png')} alt='close' className='close-buton2'/> </a>
              </div>)

              : (<div className='card-acordeon2'>
                  <strong>+</strong>
                  <strong>Añadir</strong>
                </div>)}
          </div>
          <div className='cards-acordeon'>
            {planSelected[2] !== undefined ? 
              (<div className='card-acordeon'>
                <img src={require('../static/CS color.png')} alt='COS logo' className='img-card-acordeon'/>
                <strong>{securePlans[planSelected[2]].tarifa.tarifaventa}</strong>

                <a className='close-boton' href='#' onClick={()=>{
                  setPlanSelected((state) => state.filter((item) => item !== planSelected[0]))
                }}><img src={require('../static/Close.png')} alt='close' className='close-buton1'/> </a>
              </div>)

              : (<div className='card-acordeon2'>
                  <strong>+</strong>
                  <strong>Añadir</strong>
                </div>)}

            {planSelected[3] !== undefined ? 
              (<div className='card-acordeon'>
                <img src={require('../static/CS color.png')} alt='COS logo' className='img-card-acordeon'/>
                <strong>{securePlans[planSelected[3]].tarifa.tarifaventa}</strong>

                <a className='close-boton' href='#' onClick={()=>{
                  setPlanSelected((state) => state.filter((item) => item !== planSelected[0]))
                }}><img src={require('../static/Close.png')} alt='close' className='close-buton1'/> </a>
              </div>)

              : (<div className='card-acordeon2'>
                  <strong>+</strong>
                  <strong>Añadir</strong>
                </div>)}
          </div>
          {planSelected.length>=2 ? (<a onClick={openModal} className="comparar-boton" >Comparar</a>) : (<a onClick={()=>{alert('introduzca dos o mas')}} className="comparar-boton disabled" >Comparar</a>)}
          <Modal isOpen={isOpenModal} closeModal={closeModal}>
              {planSelected.length >= 2  &&(
                <>
                  <div className='coberturas-botones'>
                    {categorias.map((zz, i )=>{return(
                      <a className='boton-cobertura' onClick={()=>{setActualCategory(zz.id)}} style={ actualCategory === zz.id ? {background:'#008DC7', color:'white', transition:'all 0.3s linear'}: {background:'#F5F7F8', color:'#959999', transition:'all 0.2s linear'} }> {zz.nombre}</a> 
                    )})}
                  </div>
                  <div className='cards'>
                    
                      {planSelected.map( (xy) => {
                        return(
                          <div className='planes-card'>
                            <img draggable={false} src={require('../static/CS color.png')} className='img-card-planes' />
                            <p>{securePlans[xy].plan.nombre}</p>
                            <strong>{securePlans[xy].tarifa.tarifaventa}</strong>
                            <a className='boton-contratar'>Contratar</a>
                          </div>
                        )})}
                  </div>
                  {allCoberturas.map((xz)=>{
                    return(
                      <>
                      {xz.categoria_id === actualCategory && (
                        <>
                          <div className='coberturas-comparar'>
                            <h2>{xz.nombre}</h2>
                          </div>
                          <div className='coberturas-precio-plan'>
                            {planSelected.map((xy)=>{
                              const matchingItem = securePlans[xy].coberturas.find((yy) => yy.coberturaDetailed[0].id === xz.id);
                              return(
                              <>
                                {matchingItem ? (
                                  <p>{matchingItem.alcance}</p>
                                ) : (
                                  <p>No incluida</p>
                                )}

                              </>
                            )})}
                          </div>
                        </>
                      )}
                      </>
                    )
                  })}
                </>
              )}
              
                
          </Modal>
        </div>

        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default BasicExample;

// h