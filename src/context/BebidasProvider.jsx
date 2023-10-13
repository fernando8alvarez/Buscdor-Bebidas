import axios from 'axios';
import { useState, useEffect, createContext } from 'react';

const BebidasContext = createContext();
const url1 = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?';
const url2 = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?'

export function BebidasProvider({ children }) {

    const [bebidas, setBebidas] = useState([]);
    const [modal, setModal] = useState(false);
    const [bebidaId, setBebidaId] = useState(null);
    const [receta, setReceta] = useState({});
    const [cargando, setCargando] = useState(false);

    const consultarBebidas = async (datos) => {
        try {
            const { data } = await axios(`${url1}i=${datos.nombre}&c=${datos.categoria}`);
            setBebidas(data?.drinks);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setCargando(true);
        const consultarDetallesBebida = async () => {
            if (!bebidaId) return
            try {
                const { data } = await axios(`${url2}i=${bebidaId}`)
                setReceta(data.drinks[0]);
            } catch (error) {
                console.log(error);
            }
            finally {
                setCargando(false)
            }
        }
        consultarDetallesBebida();
    }, [bebidaId])

    const handleModalClick = () => {
        setModal(!modal)
    }

    const handleBebidaIdClick = (id) => {
        setBebidaId(id)
    }

    return (
        <BebidasContext.Provider
            value={{
                consultarBebidas,
                bebidas,
                modal,
                handleModalClick,
                handleBebidaIdClick,
                receta,
                setReceta,
                cargando
            }}>
            {children}
        </BebidasContext.Provider>
    )
}

export default BebidasContext;
