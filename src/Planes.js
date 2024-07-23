import './App.css';
import logo from "./static/icon.png"
import logo_iso from "./static/CS alternativo2 blanco.png"
import login from "./static/login3.svg"
import { useState, useEffect, useRef } from 'react'
import "./navb.css";
import { useLocation, useNavigate } from 'react-router-dom';
import "./terms.css"
import Footer from './components/Footer';
import "./Planes.css"
import Select from 'react-select';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Modal from './Modal.js';
import useModal from './hooks/useModal'
import { AccessTimeSharp, X } from '@mui/icons-material';
import Navbar from './components/Navbar.js';
import TriggerRendererProp from './components/overlay.js';
import Acordeon from './components/Acordeon.js'
import MediaQuery from 'react-responsive'

const options = [
  { value: 'highPrice', label: 'Precio: mayor a menor' },
  { value: 'lowPrice', label: 'Precio: menor a mayor' },
]

function Planes() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isOpenModal, openModal, closeModal] = useModal(false)
  const [isOpenModal1, openBeneficios, closeBeneficios] = useModal(false)
  const [isOpenModal2, openLoque, closeLoque] = useModal(false)
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
  const [planSelected, setPlanSelected] = useState([])
  const [planSelection, setPlanSelection] = useState({ loading: true })
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
  useEffect(() => { console.log(planSelected) }, [planSelected])

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
    <div className='home' id='planes'>

      <Navbar menuVisible={menuVisible} setMenuVisible={setMenuVisible}></Navbar>
      {/* <div className={`App ${isOpen && "openz"}`}>
        <div className='sec-3'>
          <div className={`navb navb2 ${isOpen && "openx"}`} >
            <div className={`navb_items ${isOpen && "open"}`}>
              <div className='logo_iso'>
                <img className='logo_iso_img' src={logo_iso} alt='Isotipo' />
              </div>
              <div className='login'>
                <a href='#' className='a_login'>
                  <img src={login} alt='Login' />
                  <p>Iniciar Sesion</p>
                </a>
              </div>
              <div className="navb_logo">
                <a href="#">
                  <a className={`navb_toggle ${isOpen && "open"}`} onClick={() => { isOpen ? setIsOpen(false) : setIsOpen(true) }}>
                    <span></span>
                    <span></span>
                  </a>
                  <img src={logo} alt="Logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}


      <MediaQuery orientation={'landscape'}>
        <div className='content-info-pasajero'>
          <div className='origen-destino'>
            <strong>{fullData !== null && fullData.origen2}</strong>
            <img src={require('./static/arrow next.png')} alt='next' />
            <strong>{destinos !== null && destinos.map((x) => x + ", ")}</strong>
          </div>
          <div className='fechas'>
            <strong>{fullData !== null && fullData.fechaStart}</strong>
            <img src={require('./static/arrow next.png')} alt='next' />
            <strong>{fullData !== null && fullData.fechaEnd} ({fullData !== null && fullData.daysDiff} días)</strong>
          </div>
          <div className='viajeros'>
            <strong>{viajeros !== null && viajeros.length} viajeros</strong>
            <a href='#' className='editar'><img src={require('./static/Editar boton.png')} alt='editar info pasajeros' className='boton-editar' /></a>
          </div>

        </div>
      </MediaQuery>

      <MediaQuery orientation={'portrait'}>
        <div className='content-info-pasajero'>
          <div className='container-info-pasajero'>
            <div className='origen-destino'>
              <strong>{fullData !== null && fullData.origen2}</strong>
              <img src={require('./static/arrow next mobile.png')} alt='next' />
              <strong>{destinos !== null && destinos.map((x) => x + ", ")}</strong>
            </div>
            <div className='fechas'>
              <strong>{fullData !== null && fullData.fechaStart}</strong>
              <img src={require('./static/arrow next mobile.png')} alt='next' />
              <strong>{fullData !== null && fullData.fechaEnd} ({fullData !== null && fullData.daysDiff} días)</strong>
            </div>
            <div className='viajeros'>
              <strong>{viajeros !== null && viajeros.length} viajeros</strong>
            </div>
          </div>
          <div className='botones-info-pasajeros'>
            <a href='#' className='editar'><img src={require('./static/botoneditarplanes.png')} alt='editar info pasajeros' className='boton-editar' /></a>
            <a href='#' className='filtros'><img src={require('./static/botonfiltrosplanes.png')} alt='editar info pasajeros' className='boton-editar' /></a>
          </div>
        </div>
      </MediaQuery>

      <MediaQuery orientation={'landscape'}>
        <div className='content-planes-filtros'>
          <div className='filtros-comparar'>
            <div className='box-filtros'>
              <h2>Filtros</h2>
              <div className='rango-precio'>
                <strong>Rango de Precios</strong>
                <div className="slider-range">
                  <RangeSlider id="range-slider-gradient" className="margin-lg" step={precioMaximoDefault / 100} value={[precioMinimo, precioMaximo]} min={0} max={precioMaximoDefault} onInput={(e) => { setPrecioMinimo(e[0]); setPrecioMaximo(e[1]) }} />
                </div>
                <div className='precios-input'>
                  <input type='number' className='precio-minimo' value={precioMinimo} placeholder='Min.' onChange={(e) => setPrecioMinimo(e.target.value)} />
                  <input type='number' className='precio-maximo' value={precioMaximo} placeholder='Max.' onChange={(e) => setPrecioMaximo(e.target.value)} />
                </div>
              </div>
              <div className='coberturas-filtro'>
                <strong>Coberturas</strong>
                <div style={{ flexDirection: 'column', justifyContent: 'center', display: 'flex', gap: 50, paddingTop: 20, paddingBottom: 20, paddingLeft: 10, paddingRight: 10 }}>
                  {cobert.map((x) => {
                    return (
                      <div className='cobertura-comparar' key={x.id}>
                        <input type='checkbox' className='cobertura-check' onChange={e => {
                          if (e.target.checked === true) {
                            setCoberturaSelected(oldCobert => [...oldCobert, x.id])
                          } else {
                            setCoberturaSelected(l => l.filter(item => item !== x.id))
                          }
                        }} />
                        <span>{x.nombre}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='compañia-filtro'>
                <strong>Compañía</strong>
                <div style={{ flexDirection: 'column', justifyContent: 'center', display: 'flex', gap: 50, paddingTop: 20, paddingBottom: 20, paddingLeft: 10, paddingRight: 10 }}>
                  {provider.map((x) => {
                    return (
                      <div className='cobertura-comparar'>
                        <input type='checkbox' className='cobertura-check' onChange={e => {
                          if (e.target.checked === true) {
                            setProviderSelected(oldProvider => [...oldProvider, x.id])
                          } else {
                            setProviderSelected(l => l.filter(item => item !== x.id))
                          }
                        }} />
                        <span>{x.nombrecomercial}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className='comparar-section'>
              <div className='box- comparar'>
                <Modal isOpen={isOpenModal} closeModal={closeModal}>
                  {planSelected.length >= 2 && (
                    <>
                      <div className='coberturas-botones'>
                        {categorias.map((zz, i) => {
                          return (
                            <a className='boton-cobertura' onClick={() => { setActualCategory(zz.id) }} style={actualCategory === zz.id ? { background: '#008DC7', color: 'white', transition: 'all 0.3s linear' } : { background: '#EFF8F5', color: '#959999', transition: 'all 0.2s linear' }}> {zz.nombre}</a>
                          )
                        })}
                      </div>
                      <div className='cards'>

                        {planSelected.map((xy) => {
                          return (
                            <div className='planes-card'>
                              <img draggable={false} src={require('./static/CS color.png')} className='img-card-planes' />
                              <p>{securePlans[xy].plan.nombre}</p>
                              <strong>{securePlans[xy].tarifa.tarifaventa}</strong>
                              <a className='boton-contratar'>Contratar</a>
                            </div>
                          )
                        })}
                      </div>
                      {allCoberturas.map((xz) => {
                        return (
                          <>
                            {xz.categoria_id === actualCategory && (
                              <>
                                <div className='coberturas-comparar'>
                                  <h2>{xz.nombre}</h2>
                                </div>
                                <div className='coberturas-precio-plan'>
                                  {planSelected.map((xy) => {
                                    const matchingItem = securePlans[xy].coberturas.find((yy) => yy.coberturaDetailed[0].id === xz.id);
                                    return (
                                      <>
                                        {matchingItem ? (
                                          <p>{matchingItem.alcance}</p>
                                        ) : (
                                          <p>No incluida</p>
                                        )}

                                      </>
                                    )
                                  })}
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
            </div>
          </div>

          <div className='box-planes'>
            {/* <div className='seleccion-plan'>
            <p><strong>Seleccione un plan</strong> {securePlans !== null && securePlans.length} resultados</p>
            <Select
              className='basic-single'
              options={options}
              defaultValue={options[0]}
              onChange={(e) => { handlePrices(e.value) }} />
          </div> */}
            {securePlans !== null && securePlans.map((x, i) => {
              return (
                <>
                  {(providerSelected.length === 0 || providerSelected.includes(x.proveedor.id)) && (coberturaSelected.length === 0 || coberturaSelected.every(v => x.coberturas.some(e => e.coberturaDetailed[0].id === v))) &&
                    (
                      <div className='card-logo-planes' key={x.index}>
                        <div className='sec1-plan-card'>
                          <img draggable={false} src={require('./static/CS color.png')} className='img-card-logo' />
                          {x.plan.recomendado === 1 && (<div className='puntuacion'>
                            <p>{x.plan.razonrecomendado}</p>
                            <img src={require('./static/star.png')} alt='estrella' className='star-img' />
                          </div>)}

                        </div>
                        <div className='card-plan-info'>
                          <p style={{ fontSize: 20, color: 'black', margin: 0 }}><strong>{x.plan.nombre}</strong></p>
                          {x.coberturas.map((y) => {

                            return (
                              <>
                                {y.coberturaDetailed[0].destacada === 1 ? (<div className='contentFocusCover'>
                                  <img src={require('./static/Cobertura Check.png')} alt='cobertura status' className='cobertura-check' />
                                  <p style={{ fontSize: 16, margin: 0 }}>{y.coberturaDetailed[0].nombre}</p>
                                  <p style={{ fontSize: 16, margin: 0 }}><strong>{y.alcance}</strong></p>
                                  {TriggerRendererProp(y.coberturaDetailed[0].informacion)}
                                </div>) : (<></>)}
                              </>
                            )

                          })}
                          <a className='ver-mas-beneficios' onClick={() => { openBeneficios(); setPlanSelection(x) }}><img src={require('./static/Plus.png')} alt='ver mas info' className='plus-img' />Ver más beneficios</a>
                          <Modal isOpen={isOpenModal1} closeModal={closeBeneficios} header={planSelection}>
                            {'plan' in planSelection && (
                              <div className='modalBody'>
                                <div className='coberturas-botones'>
                                  {categorias.map((zz, i) => {
                                    return (
                                      <a className='boton-cobertura' onClick={() => { setActualCategory(zz.id) }} style={actualCategory === zz.id ? { background: '#008DC7', color: 'white', transition: 'all 0.3s linear' } : { background: '#F5F7F8', color: '#959999', transition: 'all 0.2s linear' }}> {zz.nombre}</a>
                                    )
                                  })}
                                </div>

                                {allCoberturas.map((xz) => {
                                  const matchingItem = planSelection.coberturas.find((yy) => yy.coberturaDetailed[0].id === xz.id);
                                  return (
                                    <>
                                      {xz.categoria_id === actualCategory && (
                                        <>
                                          <div className='coberturas-comparar2'>
                                            <h2>{xz.nombre}</h2>
                                            {matchingItem ? (<p className='included'>{matchingItem.alcance}</p>) : (<p className='notIncluded'>No incluida</p>)}
                                          </div>
                                        </>
                                      )}
                                    </>
                                  )
                                })}
                              </div>
                            )}
                          </Modal>

                          <a className='lo-que-debes-saber' onClick={() => { openLoque(); setPlanSelection(x) }}><img src={require('./static/Alert.png')} alt='Lo que debes saber' className='lo-que-img' />Lo que debes saber</a>
                          <Modal isOpen={isOpenModal2} closeModal={closeLoque} headerText={'Lo que debes saber'}>
                            {'plan' in planSelection &&(
                              <>
                                <div className='html-content' dangerouslySetInnerHTML={{__html: planSelection.plan.masinfo}} />
                              </>
                            )}
                          </Modal>
                        </div>
                        <div className='precio-plan'>
                          <strong>USD {x.tarifa.tarifaventa}</strong>
                          <a href='#' className='seleccionar'>Seleccionar</a>
                          <div className='comparar-check'>
                            <input type='checkbox' className='comparar-plan' checked={planSelected.includes(i) ? (true) : (false)} onChange={e => {
                              if (e.target.checked === true) {
                                setPlanSelected(planx => [...planx, i])
                              } else {
                                setPlanSelected(l => l.filter(item => item !== i))
                              }
                            }} />
                            <p>Comparar</p>
                          </div>
                        </div>
                      </div>
                    )}


                </>
              )
            })}
          </div>
        </div>
        <div className='comparar-acordeon'>
          <Acordeon planSelected={planSelected} setPlanSelected={setPlanSelected}></Acordeon>
        </div>
      </MediaQuery>

      <MediaQuery orientation={'portrait'}>
        <div className='content-planes-filtros'>
          <div className='box-planes'>
            {/* <div className='seleccion-plan'>
            <p><strong>Seleccione un plan</strong> {securePlans !== null && securePlans.length} resultados</p>
            <Select
              className='basic-single'
              options={options}
              defaultValue={options[0]}
              onChange={(e) => { handlePrices(e.value) }} />
          </div> */}
            {securePlans !== null && securePlans.map((x, i) => {
              return (
                <>
                  {(providerSelected.length === 0 || providerSelected.includes(x.proveedor.id)) && (coberturaSelected.length === 0 || coberturaSelected.every(v => x.coberturas.some(e => e.coberturaDetailed[0].id === v))) &&
                    (
                      <div className='card-logo-planes' key={x.index}>
                        <div className='sec1-card-planes'>
                          <div className='sec1-plan-card'>
                            <img draggable={false} src={require('./static/CS color.png')} className='img-card-logo' />
                            {x.plan.recomendado === 1 && (<div className='puntuacion'>
                              <p>{x.plan.razonrecomendado}</p>
                              <img src={require('./static/star.png')} alt='estrella' className='star-img' />
                            </div>)}
                          </div>
                          <div className='card-plan-info1'>
                            <p className='nombre-plan' style={{ fontSize: 20, color: 'black', margin: 0 }}>{x.plan.nombre}</p>
                            <p>USD {x.tarifa.tarifaventa}</p>
                          </div>
                        </div>
                        <div className='botones-plan-card'>
                        <div className='precio-plan'>
                            <a href='#' className='seleccionar'>Seleccionar</a>
                          </div>
                        <div className='comparar-check'>
                              <input type='checkbox' className='comparar-plan' checked={planSelected.includes(i) ? (true) : (false)} onChange={e => {
                                if (e.target.checked === true) {
                                  setPlanSelected(planx => [...planx, i])
                                } else {
                                  setPlanSelected(l => l.filter(item => item !== i))
                                }
                              }} />
                              <p>Comparar</p>
                            </div>
                        </div>
                        
                        
                        <div className='card-plan-info'>
                          <p className='nombre-plan' style={{ fontSize: 20, color: 'black', margin: 0 }}><strong>{x.plan.nombre}</strong></p>
                          <strong>USD {x.tarifa.tarifaventa}</strong>
                          
                          <div className='comparar-check'>
                            <input type='checkbox' className='comparar-plan' checked={planSelected.includes(i) ? (true) : (false)} onChange={e => {
                              if (e.target.checked === true) {
                                setPlanSelected(planx => [...planx, i])
                              } else {
                                setPlanSelected(l => l.filter(item => item !== i))
                              }
                            }} />
                            <p>Comparar</p>
                          </div>
                          {x.coberturas.map((y) => {

                            return (
                              <>
                                {y.coberturaDetailed[0].destacada === 1 ? (<div className='contentFocusCover'>
                                  <img src={require('./static/Cobertura Check.png')} alt='cobertura status' className='cobertura-check' />
                                  <p style={{ fontSize: 16, margin: 0 }}>{y.coberturaDetailed[0].nombre}</p>
                                  <p style={{ fontSize: 16, margin: 0 }}><strong>{y.alcance}</strong></p>
                                  {TriggerRendererProp(y.coberturaDetailed[0].informacion)}
                                </div>) : (<></>)}
                              </>
                            )

                          })}
                          <a className='ver-mas-beneficios' onClick={() => { openBeneficios(); setPlanSelection(x) }}><img src={require('./static/Plus.png')} alt='ver mas info' className='plus-img' />Ver más beneficios</a>
                          <Modal isOpen={isOpenModal1} closeModal={closeBeneficios} header={planSelection}>
                            {'plan' in planSelection && (
                              <div className='modalBody'>
                                <div className='coberturas-botones'>
                                  {categorias.map((zz, i) => {
                                    return (
                                      <a className='boton-cobertura' onClick={() => { setActualCategory(zz.id) }} style={actualCategory === zz.id ? { background: '#008DC7', color: 'white', transition: 'all 0.3s linear' } : { background: '#F5F7F8', color: '#959999', transition: 'all 0.2s linear' }}> {zz.nombre}</a>
                                    )
                                  })}
                                </div>

                                {allCoberturas.map((xz) => {
                                  const matchingItem = planSelection.coberturas.find((yy) => yy.coberturaDetailed[0].id === xz.id);
                                  return (
                                    <>
                                      {xz.categoria_id === actualCategory && (
                                        <>
                                          <div className='coberturas-comparar2'>
                                            <h2>{xz.nombre}</h2>
                                            {matchingItem ? (<p className='included'>{matchingItem.alcance}</p>) : (<p className='notIncluded'>No incluida</p>)}
                                          </div>
                                        </>
                                      )}
                                    </>
                                  )
                                })}
                              </div>
                            )}
                          </Modal>

                          <a className='lo-que-debes-saber' onClick={openLoque}><img src={require('./static/Alert.png')} alt='Lo que debes saber' className='lo-que-img' />Lo que debes saber</a>
                          <Modal isOpen={isOpenModal2} closeModal={closeLoque}>

                          </Modal>
                        </div>
                      </div>
                    )}


                </>
              )
            })}
          </div>
        </div>
        <div className='comparar-acordeon'>
          <Acordeon planSelected={planSelected} setPlanSelected={setPlanSelected}></Acordeon>
        </div>
      </MediaQuery>


      {/* <Footer /> */}
    </div>


  );
}

export default Planes;
