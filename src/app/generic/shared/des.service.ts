import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import {
  DesAlgorithmNameList,
  BlockCipherModeNameList,
  InputDataFormaNameList,
  PaddingMethodNameList,
  algorithmKeyLengthRequiredByName,
  DesOperationNameList,
  DesParameterBuilder,
  DesOperation,
  InputDataFormat,
  BlockCipherMode,
  PaddingMethod,
  DesAlgorithm,
} from './des';
import { LoggerService } from 'src/app/shared/logger.service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class DesService {
  constructor(private loggerService: LoggerService) {}

  desAlgorithmNameList(): string[] {
    return DesAlgorithmNameList;
  }

  blockCipherModeNameList(): string[] {
    return BlockCipherModeNameList;
  }

  inputDataFormatNameList(): string[] {
    return InputDataFormaNameList;
  }

  paddingMethodNameList(): string[] {
    return PaddingMethodNameList;
  }

  operationNameList(): string[] {
    return DesOperationNameList;
  }

  keyLengthRequiredByAlgorithm(name: string): number | undefined {
    return algorithmKeyLengthRequiredByName(name);
  }

  execute(params: { [key: string]: string }) {
    let desParam = new DesParameterBuilder()
      .algorithmByName(params['algorithm'])
      .blockCipherByName(params['cipherBlockMode'])
      .inputDataFormatByName(params['inputDataFormat'])
      .paddingMethodByName(params['paddingMethod'])
      .key(params['key'])
      .data(params['data'])
      .iv(params['iv'])
      .operationByName(params['operation'])
      .build();

    let key = CryptoJS.enc.Hex.parse(params['key']);
    let iv = CryptoJS.enc.Hex.parse(desParam.iv);

    let data =
      desParam.inputDataFormat === InputDataFormat.HEX
        ? CryptoJS.enc.Hex.parse(desParam.data)
        : CryptoJS.enc.Utf8.parse(desParam.data);

    console.log('data: ' + data);
    console.log('data cipher: ' + data.ciphertext)

    let blockCipherMode =
      desParam.blockCipherMode === BlockCipherMode.ECB
        ? CryptoJS.mode.ECB
        : CryptoJS.mode.CBC;

    let paddingMethod =
      desParam.paddingMethod === PaddingMethod.ISO9797_1_1
        ? CryptoJS.pad.ZeroPadding
        : CryptoJS.pad.Iso97971;

    let algo =
      desParam.algorithm === DesAlgorithm.DES
        ? CryptoJS.DES
        : CryptoJS.TripleDES;

    console.log('here');

    let result =
      desParam.operation === DesOperation.Encrypt
        ? this.encrypt(data, key, iv, blockCipherMode, paddingMethod, algo)
        : this.decrypt(
            {
              ciphertext: data,
              salt: undefined,
              iv: iv,
            },
            key,
            iv,
            blockCipherMode,
            paddingMethod,
            algo
          );

    let logger = this.loggerService
      .start()
      .log('[' + new Date().toLocaleString('vn') + ']')
      .log('DES/3DES operation finished.')
      .log('*'.repeat(30))
      .logKeyValuePair('Key', desParam.key)
      .logKeyValuePair(
        'Algorithm',
        `${params['algorithm']} ${params['cipherBlockMode']}`
      )
      .logKeyValuePair('Operation', params['operation'])
      .logKeyValuePair('Data', params['data'])
      .logKeyValuePair('Padding Method', params['paddingMethod'])
      .log('*'.repeat(30))
      .logKeyValuePair(
        desParam.operation === DesOperation.Encrypt
          ? 'Encrypted data'
          : 'Decrypted data',
        result
      )
      .log(' ')
      .log(' ');

    logger.flush();
  }

  private encrypt(
    data: any,
    key: CryptoJS.WordArray,
    iv: any,
    mode: CryptoJS.Mode,
    padding: CryptoJS.Padding,
    algo: CryptoJS.CipherHelper
  ): string {
    return algo.encrypt(data, key, {
      mode: mode,
      padding: padding,
      iv: iv,
    }).ciphertext;
  }

  private decrypt(
    data: CryptoJS.WordArray,
    key: CryptoJS.WordArray,
    iv: any,
    mode: CryptoJS.Mode,
    padding: CryptoJS.Padding,
    algo: CryptoJS.CipherHelper
  ) {
    return algo
      .decrypt(data, key, {
        mode: mode,
        padding: padding,
        iv: iv,
      })
      .toString();
  }
}
