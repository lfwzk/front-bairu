import imagen from '../../../public/Imagen.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ITarjetaModal {
  closeModal: any;
  cuentaTotal?: number;
}

const PagoFallido = ({ closeModal }: ITarjetaModal) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-box h-[1800px] bg-[base-100] shadow-lg rounded-t-[90px]">
      <h1>ERROR EN EL PAGO, INTENTE OTRO METODO DE PAGO</h1>
    </div>
  );
};

export const TarjetaModal = ({ closeModal, cuentaTotal }: ITarjetaModal) => {
  const navigator = useNavigate();

  // const [esperandoPago, setEsperandoPago] = useState(true);
  const [mostrarErrorPago, setMostrarErrorPago] = useState(false);
  const [ipPOS, setIpPOS] = useState<string>('');

  // FUNCTIONS
  function convertirNumero(number: number): number {
    const [wholePart, decimalPart] = number.toString().split('.');
    const wholeNumber = parseInt(wholePart, 10);
    let decimalNumber = decimalPart ? parseInt(decimalPart, 10) : 0;
    if (decimalNumber < 10 && decimalNumber > 0) {
      decimalNumber *= 10;
    }
    const shiftedNumber = wholeNumber * 100 + decimalNumber;

    return isNaN(shiftedNumber) ? 0 : shiftedNumber;
  }

  const pagarConTarjeta = async () => {
    try {
      const pagar = await axios.get(
        `http://${ipPOS}/sale?monto=${convertirNumero(
          cuentaTotal,
        )}&cod_moneda=068`,
        {
          timeout: 5000,
        },
      );
      // setEsperandoPago(true);
      if (pagar.data.estado === 'OK') {
        // setEsperandoPago(false);
        navigator('/pagoconfirmado');
      } else {
        // setEsperandoPago(false);
        setMostrarErrorPago(true);
      }
    } catch (error) {
      // setEsperandoPago(false);
      setMostrarErrorPago(true);
    }
  };

  useEffect(() => {
    let infoKiosco: any = localStorage.getItem('InfoKiosco');
    infoKiosco = JSON.parse(infoKiosco);
    if (infoKiosco !== undefined) {
      setIpPOS(infoKiosco.pago_tarjeta_info.ipLocal);
    }
  }, []);

  useEffect(() => {
    if (cuentaTotal > 0 && ipPOS !== '') {
      pagarConTarjeta().then();
    }
  }, [ipPOS, cuentaTotal, pagarConTarjeta]);

  return (
    <>
      {mostrarErrorPago ? (
        <PagoFallido closeModal={closeModal} />
      ) : (
        <div className="modal-box h-[1800px] bg-[base-100] shadow-lg rounded-t-[90px]">
          <div className="flex items-center flex-col  ">
            <h1 className="text-[60px] font-bold pt-[160px]">
              Pase su tarjeta por el lector{' '}
            </h1>
            <h2 className="text-center text-primary font-bold text-[50px]  py-8">
              Total Bs. {cuentaTotal}
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center pt-[140px]">
            <img src={imagen} alt="producto" className="w-1/2 h-1/2" />
          </div>
        </div>
      )}
    </>
  );
};
