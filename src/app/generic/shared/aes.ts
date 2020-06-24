import { ECONNABORTED } from 'constants';
import { Input } from '@angular/core';

const map = <T, K>(fn: (item: T) => K) => (descriptions: Array<T>): Array<K> => {
    let names = []
    for (let _item of descriptions) {
        names.push(fn(_item))
    }
    return names;
}

const find = <T, K>(fn: (item: T) => K, valueExpected: K) => (descriptions: Array<T>): T | undefined => {
    return descriptions.find(_item => fn(_item) === valueExpected);  
}

const prop = (name: string) => (obj: any) => obj[name]

export enum AesAlgorithm {
    AES_128,
    AES_192,
    AES_256
}

export const AesAlgorithmDescriptions = [
    { algorithm: AesAlgorithm.AES_128, name: 'AES-128', keyLength: 16 },
    { algorithm: AesAlgorithm.AES_192, name: 'AES-192', keyLength: 24 }, 
    { algorithm: AesAlgorithm.AES_256, name: 'AES-256', keyLength: 32 }
]

export const AesAlgorithmNameList = map(prop('name'))(AesAlgorithmDescriptions)

export function algorithmKeyLengthRequiredByName(name: string): number | undefined {
    return find(prop('name'), name)(AesAlgorithmDescriptions)?.keyLength
}

export enum CipherBlockMode {
    ECB, 
    CBC
}

export const CipherBlockModeDescriptions = [
    { mode: CipherBlockMode.ECB, name: 'ECB' },
    { mode: CipherBlockMode.CBC, name: 'CBC' }
]

export const CipherBlockModeNameList = map(prop('name'))(CipherBlockModeDescriptions)

export enum PaddingMethod {
    ISO9797_1_1,
    ISO9797_1_2
}

export const PaddingMethodDescription = [
    { padding: PaddingMethod.ISO9797_1_1, name: 'ISO9797-1 (Padding method 1)' },
    { padding: PaddingMethod.ISO9797_1_2, name: 'ISO9797-1 (Padding method 2)' },
]

export const PaddingMethodNameList = map(prop('name'))(PaddingMethodDescription)

export enum InputDataFormat {
    Ascii, 
    Hex
}

export const InputDataFormatDescriptions = [
    { format: InputDataFormat.Ascii, name: 'ASCII' },
    { format: InputDataFormat.Hex, name: 'Hexadecimal'}
]

export const InputDataFormatNameList = map(prop('name'))(InputDataFormatDescriptions)

export enum AesOperation {
    Encrypt, 
    Decrypt
}

export const AesOperationDescription = [
    { operation: AesOperation.Encrypt, name: 'Encrypt' },
    { operation: AesOperation.Decrypt, name: 'Decrypt' }
]

export const AesOperationNameList = map(prop('name'))(AesOperationDescription)

export interface AesParameter {
    algorithm?: AesAlgorithm,
    blockCipherMode?: CipherBlockMode,
    paddingMethod?: PaddingMethod
    inputDataFormat?: InputDataFormat,
    key?: string,
    data?: string,
    iv?: string,
    operation?: AesOperation
}

export class AesParameterBuilder {
    private aesParameter: AesParameter

    constructor() {
        this.aesParameter = {}
    }

    algorithmByName(name: string): AesParameterBuilder {
        this.aesParameter.algorithm =   find(prop('name'), name)(AesAlgorithmDescriptions)?.algorithm
        return this
    }

    cipherBlockModeByName(name: string): AesParameterBuilder {
        this.aesParameter.blockCipherMode = find(prop('name'), name)(CipherBlockModeDescriptions)?.mode
        return this
    }

    paddingMethodByName(name: string): AesParameterBuilder {
        this.aesParameter.paddingMethod = find(prop('name'), name)(PaddingMethodDescription)?.padding
        return this
    }

    inputDataFormatByName(name: string): AesParameterBuilder {
        this.aesParameter.inputDataFormat = find(prop('name'), name)(InputDataFormatDescriptions)?.format
        return this
    }

    key(key: string): AesParameterBuilder {
        this.aesParameter.key = key
        return this
    }

    data(data: string): AesParameterBuilder {
        this.aesParameter.data = data
        return this
    }

    iv(iv: string): AesParameterBuilder {
        this.aesParameter.iv = iv
        return this
    }

    operationByName(name: string): AesParameterBuilder {
        this.aesParameter.operation = find(prop('name'), name)(AesOperationDescription)?.operation
        return this
    }

    build(): AesParameter {
        return this.aesParameter
    }
}
