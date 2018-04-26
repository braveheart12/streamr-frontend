// @flow

import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import { normalize } from 'normalizr'

import { selectProduct } from '../../modules/product/selectors'
import { productSchema } from '../../modules/entities/schema'
import { updateEntities } from '../../modules/entities/actions'
import { showNotification } from '../../modules/notifications/actions'
import type { EditProduct } from '../../flowtype/product-types'
import type { ReduxActionCreator, ErrorFromApi } from '../../flowtype/common-types'
import { uploadImage } from '../createProduct/actions'
import { selectImageToUpload } from '../createProduct/selectors'

import {
    UPDATE_EDIT_PRODUCT,
    UPDATE_EDIT_PRODUCT_FIELD,
    PUT_EDIT_PRODUCT_REQUEST,
    PUT_EDIT_PRODUCT_SUCCESS,
    PUT_EDIT_PRODUCT_FAILURE,
    RESET_EDIT_PRODUCT,
} from './constants'
import { selectEditProduct } from './selectors'
import { putProduct } from './services'
import type {
    EditProductActionCreator,
    EditProductFieldActionCreator,
    EditProductErrorActionCreator,
} from './types'

export const updateEditProduct: EditProductActionCreator = createAction(
    UPDATE_EDIT_PRODUCT,
    (product: EditProduct) => ({
        product,
    }),
)

export const updateEditProductField: EditProductFieldActionCreator = createAction(
    UPDATE_EDIT_PRODUCT_FIELD,
    (field: string, data: any) => ({
        field,
        data,
    }),
)

export const resetEditProduct: ReduxActionCreator = createAction(RESET_EDIT_PRODUCT)

export const putEditProductRequest: ReduxActionCreator = createAction(PUT_EDIT_PRODUCT_REQUEST)

export const putEditProductSuccess: ReduxActionCreator = createAction(PUT_EDIT_PRODUCT_SUCCESS)

export const putEditProductError: EditProductErrorActionCreator = createAction(
    PUT_EDIT_PRODUCT_FAILURE,
    (error: ErrorFromApi) => ({
        error,
    }),
)

export const initEditProduct = () => (dispatch: Function, getState: Function) => {
    const product = selectProduct(getState())
    return !!product && dispatch(updateEditProduct({
        name: product.name || '',
        description: product.description || '',
        category: product.category || '',
        streams: product.streams || [],
        pricePerSecond: product.pricePerSecond,
        beneficiaryAddress: product.beneficiaryAddress,
        previewConfigJson: product.previewConfigJson || '',
        previewStream: product.previewStream || '',
    }))
}

export const updateEditProductAndRedirect = (redirectPath: string) => (dispatch: Function, getState: Function) => {
    dispatch(putEditProductRequest())
    const product = selectProduct(getState())
    const image = selectImageToUpload(getState())
    const { beneficiaryAddress, ownerAddress, pricePerSecond, ...editProduct } = selectEditProduct(getState())
    return !!product && putProduct(editProduct, product.id || '')
        .then((data) => {
            const { result, entities } = normalize(data, productSchema)
            dispatch(updateEntities(entities))
            if (image) {
                dispatch(uploadImage(editProduct.id || result, image))
            }
            dispatch(putEditProductSuccess())
            dispatch(showNotification('Your product has been updated'))
            dispatch(resetEditProduct())
            dispatch(push(redirectPath))
        })
        .catch((error) => dispatch(putEditProductError(error)))
}