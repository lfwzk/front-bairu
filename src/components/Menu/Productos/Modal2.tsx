export const Modal2 = ({
  productoSeleccionado,
  opcionesSeleccionadas,
  handleOptionChange,
  handleConfirm,
  closeModal,
}) => {
  if (!productoSeleccionado) {
    return null;
  }

  const { opcionesMenu } = productoSeleccionado;

  console.log('opcionesMenu', opcionesMenu);

  return (
    <>
      {productoSeleccionado && (
        <div className="modal-box h-[1700px] bg-[base-100]  shadow-lg rounded-3xl">
          <button className="btn btn-square w-24" onClick={closeModal}>
            X
          </button>

          <img
            src={productoSeleccionado.imagen}
            alt={productoSeleccionado.nombre}
            className="w-[490px] h-[490px] rounded-[30px] object-cover mx-auto mt-[100px] "
          />
          <p className="font-bold text-center text-[65px] pt-[20px]">
            {productoSeleccionado.nombre}
          </p>
          <p className="text-center text-[45px] text-primary font-bold">
            Bs. {productoSeleccionado.precio}
          </p>

          {/* steps section */}

          <div className="mx-24 ">
            <div className="p-6  bg-gray-200  rounded-xl ">
              <div className="container mx-auto">
                <div>
                  <ul className="steps">
                    <li className="step step-primary" data-content="✓"></li>
                    <li className="step " data-content=""></li>
                    <li className="step " data-content=""></li>
                    <li className="step " data-content=""></li>
                  </ul>
                </div>
              </div>
              <p className="text-left pt-4 font-bold ">
                {' '}
                Seleccione una opcion{' '}
              </p>
            </div>
          </div>

          {/* card sections */}

          <div className="flex flex-wrap mx-8 py-8  gap-y-8 items-center justify-between ">
            {opcionesMenu && opcionesMenu.length > 0 ? (
              opcionesMenu.map((opcion) => (
                <div key={opcion.id} className="flex flex-col mr-[32px]">
                  <h2 className="text-[20px] font-semibold text-left ">
                    {opcion.nombre}
                  </h2>
                </div>
              ))
            ) : (
              <p>No hay opciones disponibles</p>
            )}

            <button className="flex flex-col mr-[32px] h-[231px] w-[200px] rounded-md shadow-md">
              <img
                src={productoSeleccionado.imagen}
                alt={productoSeleccionado.nombre}
                className="w-[200px] h-[167px] rounded-xl object-cover"
              />
              <div className="ml-2">
                <h2 className="text-[20px] font-semibold text-left ">
                  {productoSeleccionado.nombre}
                </h2>
                <p className="text-left text-semibold text-lg">
                  Bs. {productoSeleccionado.precio}
                </p>
              </div>
            </button>
          </div>

          <div className="flex justify-between mx-16 fixed bottom-8 left-0 right-0">
            <div className="flex items-center justify-between text-center  mx-2">
              <button
                className="  w-[211px] h-[122px] text-[30px] rounded-[20px] btn 
"
                onClick={closeModal}
              >
                Cancelar
              </button>

              <button className=" mx-8 w-[156px] h-[93px] text-[90px] font-bold rounded-2xl btn">
                -
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-[40px] font-bold ">1</span>
            </div>
            <div className="flex items-center">
              <button className=" btn rounded-2xl btn-primary w-[156px] h-[93px] text-[90px] font-bold mx-8">
                +
              </button>
              <button className="btn btn-primary w-[211px] h-[122px] text-[30px] rounded-[20px] mx-8">
                Siguiente
              </button>
            </div>
          </div>
          {/* end button section */}
        </div>
      )}
    </>
  );
};