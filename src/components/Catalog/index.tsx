import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BeatLoader from 'react-spinners/BeatLoader'

import { IState } from '../../store'
import { loadProductsRequest } from '../../store/modules/products/actions'
import { IProduct } from '../../store/modules/products/types'
import CatalogItem from '../CatalogItem'

// import { Container } from './styles';

const Catalog: React.FC = () => {
    const dispatch = useDispatch()

    const products = useSelector<IState, IProduct[]>((state) => state.products.data)
    const isLoading = useSelector<IState, boolean>((state) => state.products.loading)

    useEffect(() => {
        dispatch(loadProductsRequest())
    }, [dispatch])

    return (
        <main>
            <h1>Catalogo</h1>
            {isLoading && <BeatLoader color={'red'} loading={isLoading} size={20} />}
            {products.map((product) => (
                <CatalogItem key={product.id} product={product} />
            ))}
        </main>
    )
}

export default Catalog
