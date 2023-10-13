import { useState } from 'react'
import { Button, Form, Row, Col, Alert } from 'react-bootstrap'
import useCategorias from '../hooks/useCategorias'
import useBebidas from "../hooks/useBebidas"
import { toUpperString } from '../helpers'

export default function Formulario() {

    const [busqueda, setBusqueda] = useState({
        nombre: "",
        categoria: ""
    });
    const [alerta, setAlerta] = useState("");
    const { categorias } = useCategorias();
    const { consultarBebidas } = useBebidas();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(busqueda).includes('')) {
            setAlerta('Tosdos los campo son requeridos');
            return
        }
        consultarBebidas(busqueda);
        return setAlerta('');
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                {alerta && <Alert variant='danger' className='text-center'>{alerta}</Alert>}
                <Row>
                    <Col md={6}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='nombre'>Nombre Bebidas</Form.Label>
                            <Form.Control
                                id='nombre'
                                type='text'
                                placeholder='Ej: Tequila, Vodka, Etc'
                                name='nombre'
                                value={toUpperString(busqueda.nombre)}
                                onChange={e => setBusqueda({ ...busqueda, [e.target.name]: e.target.value })}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='categoria'>Categoría Bebida</Form.Label>
                            <Form.Select
                                id='categoria'
                                name='categoria'
                                value={busqueda.categoria}
                                onChange={e => setBusqueda({ ...busqueda, [e.target.name]: e.target.value })}
                            >
                                <option value="">- Selecciona Categoria -</option>
                                {categorias.map(categoria => (
                                    <option
                                        value={categoria.strCategory}
                                        key={categoria.strCategory}
                                    >{categoria.strCategory}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='justify-content-end'>
                    <Col md={3}>
                        <Button
                            variant='danger'
                            className='text-uppercase w-100'
                            type='submit'
                        >
                            Buscar bebidas
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
