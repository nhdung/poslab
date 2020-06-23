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

export enum DesAlgorithm {
    DES,
    TripleDES
}

export const DesAlgorithmDescriptions = [
    { algo: DesAlgorithm.DES, name: "DES", keyLength: 8 },
    { algo: DesAlgorithm.TripleDES, name: "3DES", keyLength: 24 },
]

export const DesAlgorithmNameList = map(prop('name'))(DesAlgorithmDescriptions)

export function algorithmKeyLengthRequiredByName(name: string): number | undefined {
    return find(prop('name'), name)(DesAlgorithmDescriptions)?.keyLength
}

export enum BlockCipherMode {
    ECB,
    CBC
}

export const BlockCipherModeDescription = [
    { mode: BlockCipherMode.ECB, name: "ECB" },
    { mode: BlockCipherMode.CBC, name: "CBC" },
]

export const BlockCipherModeNameList = map(prop('name'))(BlockCipherModeDescription) 

export enum InputDataFormat {
    ASCII,
    HEX
}

export const InputDataFormatDescription = [
    { format: InputDataFormat.ASCII, name: "ASCII" },
    { format: InputDataFormat.HEX, name: "Hexadecimal" },
]

export const InputDataFormaNameList = map(prop('name'))(InputDataFormatDescription)

export enum PaddingMethod {
    ISO9797_1_1,
    ISO9797_1_2
}

export const PaddingMethodDescription = [
    { padding: PaddingMethod.ISO9797_1_1, name: "ISO9797-1 (Padding Method 1)" },
    { padding: PaddingMethod.ISO9797_1_2, name: "ISO9797-1 (Padding Method 2)" },
]

export const PaddingMethodNameList = map(prop('name'))(PaddingMethodDescription)

export enum DesOperation {
    Encrypt, 
    Decrypt
}

export const DesOperationDescription = [
    { operation: DesOperation.Encrypt, name: 'Encrypt' },
    { operation: DesOperation.Decrypt, name: 'Decrypt' },
]

export const DesOperationNameList = map(prop('name'))(DesOperationDescription)

export interface DesParameter {
    algorithm?: DesAlgorithm;
    blockCipherMode?: BlockCipherMode;
    inputDataFormat?: InputDataFormat;
    paddingMethod?: PaddingMethod;
    key?: string;
    data?: string;
    iv?: string;
    operation?: DesOperation;
}

export class DesParameterBuilder {
    private desParameter: DesParameter;

    constructor() {
        this.desParameter = {}
    }

    algorithmByName(name: string): DesParameterBuilder {
        this.desParameter.algorithm = find(prop('name'), name)(DesAlgorithmDescriptions)?.algo
        return this
    }

    blockCipherByName(name: string): DesParameterBuilder {
        this.desParameter.blockCipherMode = find(prop('name'), name)(BlockCipherModeDescription)?.mode
        return this
    }

    inputDataFormatByName(name: string): DesParameterBuilder {
        this.desParameter.inputDataFormat = find(prop('name'), name)(InputDataFormatDescription)?.format
        return this
    }

    paddingMethodByName(name: string): DesParameterBuilder {
        this.desParameter.paddingMethod = find(prop('name'), name)(PaddingMethodDescription)?.padding
        return this
    }
    
    key(key: string): DesParameterBuilder {
        this.desParameter.key = key
        return this
    }

    data(data: string): DesParameterBuilder {
        this.desParameter.data = data
        return this
    }

    iv(iv: string): DesParameterBuilder {
        this.desParameter.iv = iv
        return this
    }

    operationByName(name: string): DesParameterBuilder {
        this.desParameter.operation = find(prop('name'), name)(DesOperationDescription)?.operation
        return this
    }

    build(): DesParameter {
        return this.desParameter
    }

}



