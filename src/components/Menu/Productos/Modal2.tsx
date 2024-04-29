import { useState } from 'react';
// REDUX
import { RootState } from '../../../redux/store.ts';
import {
  quitarUltimoProducto,
  seleccionarOpcion,
  deseleccionarOpcion,
} from '../../../redux/actions/nuevaOrden.action';
import { editarCantidadProducto } from '../../../redux/actions/nuevaOrden.action.ts';
import { useDispatch, useSelector } from 'react-redux';

interface IModal2 {
  closeModal: any;
}

// interface IOpcion {
//   cantidadMaximaSeleccion: number;
//   cantidadSeleccionadaOpcionMenu: number;
//   opcionMenuIndex: number;
//   opcionIndex: number;
//   seleccionado: boolean;
//   imagen: string;
//   nombre: string;
//   precio: number;
// }
//
// const Opcion = ({
//   cantidadMaximaSeleccion,
//   cantidadSeleccionadaOpcionMenu,
//   opcionMenuIndex,
//   opcionIndex,
//   seleccionado,
//   imagen,
//   nombre,
//   precio,
// }: IOpcion) => {
//   const dispatch = useDispatch();
//
//   const seleccionarOpcionFunc = (
//     indexOpcionMenu: number,
//     indexOpcion: number,
//   ) => {
//     const cantidadMaxima = cantidadMaximaSeleccion;
//     const cantidadSeleccionada = cantidadSeleccionadaOpcionMenu;
//     if (cantidadSeleccionada < cantidadMaxima) {
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-expect-error
//       dispatch(seleccionarOpcion(indexOpcionMenu, indexOpcion));
//     }
//   };
//
//   const deseleccionarOpcionFunc = (
//     indexOpcionMenu: number,
//     indexOpcion: number,
//   ) => {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-expect-error
//     dispatch(deseleccionarOpcion(indexOpcionMenu, indexOpcion));
//   };
//
//   return (
//     <div>
//       <div className="flex flex-wrap mx-8   gap-y-8 items-center justify-between ">
//         <button
//           className={`flex flex-col mr-[32px] h-[231px] w-[200px] rounded-md shadow-md ${seleccionado ? 'focus:outline-none focus:ring focus:ring-primary ' : ''}`}
//           onClick={() => {
//             if (seleccionado) {
//               deseleccionarOpcionFunc(opcionMenuIndex, opcionIndex);
//             } else {
//               seleccionarOpcionFunc(opcionMenuIndex, opcionIndex);
//             }
//           }}
//         >
//           <img
//             src={imagen}
//             alt={nombre}
//             className="w-[200px] h-[167px] rounded-xl object-cover"
//           />
//           <div className="ml-2">
//             <h2 className="text-[20px] font-semibold text-left ">
//               {nombre}
//               {/*{seleccionado === true}*/}
//             </h2>
//             <p className="text-left text-semibold text-lg">+Bs. {precio}</p>
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// };

export const Modal2 = ({ closeModal }: IModal2) => {
  const dispatch = useDispatch();
  // TODO: SOLUCIONAR EL BUG DEL MODAL 2
  // WAIT 🕐
  // TODO: SI OPCION MENU ESTA SELECCIONADO, RESALTARLO COMO EN EL FIGMA
  // TODO: si se selecciona mas opciones deberia aparecer todas las opciones seleccionadas.

  const productoSeleccionadoIndex =
    useSelector((state: RootState) => state.nuevaOrdenReducer.productos)
      .length - 1;
  const productoSeleccionado = useSelector(
    (state: RootState) =>
      state.nuevaOrdenReducer.productos[
        state.nuevaOrdenReducer.productos.length - 1
      ],
  );

  const [cantidad, setCantidad] = useState<number>(1);

  const editarCantidad = (incremento: number) => {
    setCantidad((cantidadPrevia) => {
      const cantidadNueva = cantidadPrevia + incremento;
      const cantidadMinima = Math.max(cantidadNueva, 1);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(editarCantidadProducto(productoSeleccionadoIndex, incremento));
      return cantidadMinima;
    });
  };

  const [opcionMenuSeleccionadoIndex, setOpcionMenuSeleccionadoIndex] =
    useState<number>(0);

  const opcionMenuSeleccionado =
    productoSeleccionado.opcionesMenu[opcionMenuSeleccionadoIndex];
  const cantidadSeleccionadaOpcionMenu = useSelector(
    (state: RootState) =>
      state.nuevaOrdenReducer.productos[productoSeleccionadoIndex].opcionesMenu[
        opcionMenuSeleccionadoIndex
      ].cantidadSeleccionada,
  );

  const opciones = useSelector(
    (state: RootState) =>
      state.nuevaOrdenReducer.productos[productoSeleccionadoIndex].opcionesMenu[
        opcionMenuSeleccionadoIndex
      ].opciones,
  );

  // FUNCIONES
  const opcionMenuSiguiente = () => {
    if (
      opcionMenuSeleccionadoIndex <
      productoSeleccionado.opcionesMenu.length - 1
    ) {
      setOpcionMenuSeleccionadoIndex((prevIndex) => prevIndex + 1);
    }
  };

  const seleccionarOpcionFunc = (
    indexOpcionMenu: number,
    indexOpcion: number,
  ) => {
    const cantidadMaxima = cantidadMaximaSeleccion;
    const cantidadSeleccionada = cantidadSeleccionadaOpcionMenu;
    if (cantidadSeleccionada < cantidadMaxima) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dispatch(seleccionarOpcion(indexOpcionMenu, indexOpcion));
    }
  };

  const deseleccionarOpcionFunc = (
    indexOpcionMenu: number,
    indexOpcion: number,
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(deseleccionarOpcion(indexOpcionMenu, indexOpcion));
  };

  const cantidadMaximaSeleccion = opcionMenuSeleccionado.cantidadSeleccion;

  // const seleccionado = useSelector((state: RootState) =>
  //   state.nuevaOrdenReducer.productos[productoSeleccionadoIndex].opcionesMenu[
  //     opcionMenuSeleccionadoIndex
  //   ].opciones.map((opcion) => opcion.seleccionado),
  // );

  // const seleccionado = useSelector((state: RootState) => state.nuevaOrdenReducer.productos[0].opcionesMenu[1].opciones[5].seleccionado);
  console.log('seleccion obligatoria...', opcionMenuSeleccionado.obligatorio);
  console.log(
    'cantidad maxima de seleccion..',
    opcionMenuSeleccionado.cantidadSeleccion,
  );
  console.log('cantidad seleccionada...', cantidadSeleccionadaOpcionMenu);

  return (
    <>
      {productoSeleccionado && (
        <div className="modal-box h-[1700px] bg-[base-100]  shadow-lg rounded-3xl ">
          <button
            className="btn btn-square w-24"
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              dispatch(quitarUltimoProducto());

              closeModal();
            }}
          >
            X
          </button>
          <img
            src={productoSeleccionado.imagen}
            alt={productoSeleccionado.nombre}
            className="w-[490px] h-[490px] rounded-[30px] object-cover mx-auto mt-[50px] "
          />
          <p className="font-bold text-center text-[65px] pt-[20px]">
            {productoSeleccionado.nombre}
          </p>
          <p className="text-center text-[45px] text-primary font-bold">
            Bs. {productoSeleccionado.precioTotal}
          </p>

          {/*HACEMOS EL MAP DE OPCIONES MENU DEL PRODUCTO SELECCIONADO*/}

          <div className="mx-24">
            <div className="p-6 bg-accent rounded-xl overflow-x-auto">
              <div className="container mx-auto">
                <div>
                  <ul className="steps">
                    {productoSeleccionado.opcionesMenu.map(
                      (opcionMenu, index) => (
                        <li
                          key={index}
                          className={`step ${index === opcionMenuSeleccionadoIndex ? 'selected' : ''} ${index === opcionMenuSeleccionadoIndex ? 'step-primary' : ''}`}
                          data-content={
                            index === opcionMenuSeleccionadoIndex ? '✓' : ''
                          }
                        >
                          {index === opcionMenuSeleccionadoIndex && (
                            <span
                              className={
                                index === opcionMenuSeleccionadoIndex
                                  ? 'font-bold'
                                  : ''
                              }
                            >
                              {opcionMenu.nombre}
                            </span>
                          )}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
              <p className="text-left pt-4 font-bold text-2xl"> </p>
            </div>
          </div>

          {/*HACEMOS EL MAP DE LAS OPCIONES */}
          <div className="flex flex-wrap mx-[56px] py-8  gap-y-8 overflow-auto overflow-y-auto max-h-[500px]">
            {opciones.map((opcion, index) => (
              // <Opcion
              //   key={opcion.id}
              //   cantidadMaximaSeleccion={cantidadMaximaSeleccion}
              //   cantidadSeleccionadaOpcionMenu={
              //     opcionMenuSeleccionado.cantidadSeleccionada
              //   }
              //   imagen={opcion.imagen}
              //   nombre={opcion.nombre}
              //   opcionIndex={index}
              //   opcionMenuIndex={opcionMenuSeleccionadoIndex}
              //   precio={opcion.precio}
              //   seleccionado
              // />
              <div key={opcion.id}>
                <div className="flex flex-wrap mx-8   gap-y-8 items-center justify-between ">
                  <button
                    className={`flex flex-col mr-[32px] h-[231px] w-[200px] rounded-md shadow-md ${opcion.seleccionado ? 'select select-secondary' : ''}`}
                    onClick={() => {
                      if (opcion.seleccionado) {
                        deseleccionarOpcionFunc(
                          opcionMenuSeleccionadoIndex,
                          index,
                        );
                      } else {
                        seleccionarOpcionFunc(
                          opcionMenuSeleccionadoIndex,
                          index,
                        );
                      }
                    }}
                  >
                    <img
                      src={opcion.imagen}
                      alt={opcion.nombre}
                      className="w-[200px] h-[167px] rounded-xl object-cover"
                    />
                    <div className="ml-2">
                      <h2 className="text-[20px] font-semibold text-left ">
                        {opcion.nombre}
                        {/*{opcion.seleccionado === true}*/}
                      </h2>
                      <p className="text-left text-semibold text-lg">
                        +Bs. {opcion.precio}
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* BOTONES DE ANADIR ELIMINAR Y CANCELAR */}

          <div className="flex justify-between mx-16 fixed bottom-8 left-0 right-0">
            <div className="flex items-center justify-between text-center  mx-2">
              <button
                className="  w-[211px] h-[122px] text-[30px] rounded-[20px] btn"
                disabled={
                  !!(
                    opcionMenuSeleccionado.obligatorio &&
                    opcionMenuSeleccionado.cantidadSeleccionada < 1
                  )
                }
                onClick={() => {
                  if (opcionMenuSeleccionadoIndex > 0) {
                    setOpcionMenuSeleccionadoIndex(
                      opcionMenuSeleccionadoIndex - 1,
                    );
                  } else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    dispatch(quitarUltimoProducto());
                    closeModal();
                  }
                }}
              >
                {opcionMenuSeleccionadoIndex !== 0 ? 'Atrás' : 'Cancelar'}
              </button>

              <button
                className=" mx-8 w-[156px] h-[93px] text-[90px] font-bold rounded-2xl btn"
                onClick={() => {
                  editarCantidad(-1);
                }}
              >
                -
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-[40px] font-bold ">{cantidad}</span>
            </div>
            <div className="flex items-center">
              <button
                className=" btn rounded-2xl btn-primary w-[156px] h-[93px] text-[90px] font-bold mx-8"
                onClick={() => {
                  editarCantidad(1);
                }}
              >
                +
              </button>
              <button
                disabled={
                  !!(
                    opcionMenuSeleccionado.obligatorio &&
                    opcionMenuSeleccionado.cantidadSeleccionada < 1
                  )
                }
                className="btn btn-primary w-[211px] h-[122px] text-[30px] rounded-[20px] mx-8"
                onClick={() => {
                  if (
                    opcionMenuSeleccionadoIndex ===
                    productoSeleccionado.opcionesMenu.length - 1
                  ) {
                    closeModal();
                  } else {
                    opcionMenuSiguiente();
                  }
                }}
              >
                {opcionMenuSeleccionadoIndex ===
                productoSeleccionado.opcionesMenu.length - 1
                  ? 'Añadir'
                  : 'Siguiente'}
              </button>
            </div>
          </div>
          {/* end button section */}
        </div>
      )}
    </>
  );
};
