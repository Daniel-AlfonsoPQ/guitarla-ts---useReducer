import { useMemo } from "react";
import type { CarItem } from "../types/index";
import { CartActions } from "../reducers/cart-reducer";

type HeaderProps = {
    cart: CarItem[]
    dispatch: React.Dispatch<CartActions>
}


export default function Header({cart, dispatch} : HeaderProps) {
    
    const isEmpty = useMemo (() => cart.length === 0, [cart])
    const cartTotal = useMemo (() => cart.reduce( (acc, item) => acc + item.price * item.quantity, 0), [cart])

    return (
        <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="img/logo.svg" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            {isEmpty ? (
                                <p className="text-center">El carrito esta vacio</p>
                            ) : (
                                <>
                                    <p className="text-center">Articulos en el carrito: {cart.length}</p>
                                    <table className="w-100 table">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <img className="img-fluid" src={`/img/${item.image}.jpg`} alt="imagen guitarra" />
                                                    </td>
                                                    <td>{item.name}</td>
                                                    <td className="fw-bold">
                                                        ${item.price}
                                                    </td>
                                                    <td className="flex align-items-start gap-4">
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick = {() => dispatch({type: 'update-cart-quantity', payload: { id: item.id, action: 'decrement' }})}
                                                        disabled={item.quantity === 1}
                                                        >
                                                            -
                                                        </button>
                                                        {item.quantity}
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick = {() => dispatch({type: 'update-cart-quantity', payload: { id: item.id, action: 'increment' }})}
                                                        disabled={item.quantity === 5}
                                                        >
                                                            +
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger"
                                                            type="button"
                                                            onClick= {() => dispatch({type: 'remove-from-cart', payload: { id: item.id }})}
                                                        >
                                                            X
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                </>
                            )}

                            <button 
                            className="btn btn-dark w-100 mt-3 p-2"
                            onClick={() => dispatch({type: 'clear-cart'})}
                            >Vaciar Carrito</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    )
}

