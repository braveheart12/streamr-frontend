// @flow

import React from 'react'
import { Form, Input, Row, Col } from '@streamr/streamr-layout'

import type { Product } from '../../../flowtype/product-types'
import { currencies, priceUnits } from '../../../utils/constants'

import FormGroup from '../FormGroup'

export type Props = {
    product: Product,
    onChange: (field: string, value: any) => void,
}

const PriceAndPayments = ({ product, onChange }: Props) => (
    <Form>
        <FormGroup title="pricePerSecond" id="pricePerSecond">
            <Row>
                <Col xs={4}>
                    <Input
                        type="text"
                        name="pricePerSecond"
                        id="pricePerSecond"
                        placeholder="pricePerSecond"
                        value={product.pricePerSecond}
                        onChange={(e: SyntheticInputEvent<EventTarget>) => onChange('pricePerSecond', e.target.value)}
                    />
                </Col>
                <Col xs={4}>
                    <Input
                        type="select"
                        name="priceCurrency"
                        id="priceCurrency"
                        value={currencies[product.priceCurrency] || ''}
                        onChange={(e: SyntheticInputEvent<EventTarget>) => onChange('priceCurrency', e.target.value)}
                    >
                        {Object.keys(currencies).map((currencyId) => (
                            <option
                                key={currencyId}
                                value={currencyId}
                            >
                                {currencies[currencyId]}
                            </option>
                        ))}
                    </Input>
                </Col>
                <Col xs={1}>
                    per
                </Col>
                <Col xs={3}>
                    <Input
                        type="select"
                        name="unit"
                        id="unit"
                        value={product.priceUnit || ''}
                        onChange={(e: SyntheticInputEvent<EventTarget>) => onChange('priceUnit', e.target.value)}
                    >
                        {Object.keys(priceUnits).map((priceUnitKey) => (
                            <option
                                key={priceUnitKey}
                                value={priceUnitKey}
                            >
                                {priceUnits[priceUnitKey]}
                            </option>
                        ))}
                    </Input>
                </Col>
            </Row>
        </FormGroup>
        <FormGroup id="ownerAddress" title="ownerAddress">
            <Input
                type="text"
                name="ownerAddress"
                id="ownerAddress"
                placeholder="ownerAddress"
                value={product.ownerAddress}
                onChange={(e: SyntheticInputEvent<EventTarget>) => onChange('ownerAddress', e.target.value)}
            />
        </FormGroup>
        <FormGroup id="beneficiaryAddress" title="beneficiaryAddress">
            <Input
                type="text"
                name="beneficiaryAddress"
                id="beneficiaryAddress"
                placeholder="beneficiaryAddress"
                value={product.beneficiaryAddress}
                onChange={(e: SyntheticInputEvent<EventTarget>) => onChange('beneficiaryAddress', e.target.value)}
            />
        </FormGroup>
    </Form>
)

export default PriceAndPayments
