// import React, { useState } from "react";
// import Navbar from "./components/Navbar";
// import { FaChevronLeft } from "react-icons/fa6";
// import tarjeta from "./static/tarjeta-pago.svg";

// const Pagos = () => {
//   const [selectedMethod, setSelectedMethod] = useState("");

//   const handleGoBack = (event) => {
//     event.preventDefault();
//     window.history.back();
//   };

//   const handleRadioClick = (method) => {
//     setSelectedMethod(selectedMethod === method ? "" : method);
//   };

//   return (
//     <div className="Pagos" id="Pagos">
//       <Navbar section={4} notSticky={true}></Navbar>
//       <div className="volver-btn">
//         <a href="#" onClick={handleGoBack}>
//           <FaChevronLeft style={{ color: "#009c8c" }} size={25} />
//         </a>
//       </div>
//       <div className="pagos-section">
//         <div className="pagos-left-section">
//           <div className="titulo-pagos">
//             <h1>Medios de pago</h1>
//           </div>
//           <div className="card-pagos">
//             <div className="method">
//               <div className="content-method">
//                 <input
//                   type="radio"
//                   name="creditoDebito"
//                   id="creditoDebito"
//                   checked={selectedMethod === "creditoDebito"}
//                   onClick={() => handleRadioClick("creditoDebito")}
//                 />
//                 <img src={tarjeta} alt="tarjeta" className="tarjeta-icon" />
//                 <label className="pay-method" htmlFor="creditoDebito">
//                   Tarjeta de Crédito, débito o prepago
//                 </label>
//               </div>

//               <div
//                 className={`credito-debito-metod ${
//                   selectedMethod === "creditoDebito" ? "open" : ""
//                 }`}
//               >
//                 <p>prueba 1</p>
//                 <p>prueba 2</p>
//                 <p>prueba 3</p>
//                 <p>prueba 4</p>
//               </div>
//             </div>
//             <div className="method">
//               <div className="content-method">
//                 <input
//                   type="radio"
//                   name="paypal"
//                   id="paypal"
//                   checked={selectedMethod === "paypal"}
//                   onClick={() => handleRadioClick("paypal")}
//                 />
//                 <img src={tarjeta} alt="tarjeta" className="tarjeta-icon" />
//                 <label className="pay-method" htmlFor="paypal">
//                   Paypal
//                 </label>
//               </div>

//               <div
//                 className={`credito-debito-metod ${
//                   selectedMethod === "paypal" ? "open" : ""
//                 }`}
//               >
//                 <p>prueba 5</p>
//                 <p>prueba 6</p>
//                 <p>prueba 7</p>
//                 <p>prueba 8</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pagos;
