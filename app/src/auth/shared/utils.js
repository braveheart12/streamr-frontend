// @flow

import axios from 'axios'
import qs from 'query-string'

import type { FormFields } from './types'

export const onInputChange = (callback: (string, any) => void, inputName: ?string) => (e: SyntheticInputEvent<EventTarget>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    callback(inputName || e.target.name, value)
}

export const post = (url: string, form: FormFields, successWithError: boolean, xhr: boolean): Promise<*> => new Promise((resolve, reject) => {
    axios
        .post(url, qs.stringify(form), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...(xhr ? {
                    'X-Requested-With': 'XMLHttpRequest',
                } : {}),
            },
        })
        .then(({ data }) => {
            if (successWithError && data.error) {
                reject(new Error(data.error))
            } else {
                resolve()
            }
        }, ({ response: { data } }) => {
            reject(new Error(data.error || 'Something went wrong'))
        })
})
