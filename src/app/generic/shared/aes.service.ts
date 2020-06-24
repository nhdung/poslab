import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as Aes from './aes';
import { pad } from 'crypto-js';
import { LoggerService } from 'src/app/shared/logger.service';

@Injectable({
  providedIn: 'root',
})
export class AesService {
  constructor(private loggerService: LoggerService) {}

  algorithmNameList() {
    return Aes.AesAlgorithmNameList;
  }

  algorithmKeyLengthRequiredByName(name: string): number {
    return Aes.algorithmKeyLengthRequiredByName(name);
  }

  cipherBlockNameList() {
    return Aes.CipherBlockModeNameList;
  }

  paddingMethodNameList() {
    return Aes.PaddingMethodNameList;
  }

  inputDataFormatNameList() {
    return Aes.InputDataFormatNameList;
  }

  operationNameList() {
    return Aes.AesOperationNameList;
  }

  execute(params: { [key: string]: string }) {
    const aesParameter = new Aes.AesParameterBuilder()
      .algorithmByName(params['algorithm'])
      .cipherBlockModeByName(params['cipherBlockMode'])
      .paddingMethodByName(params['paddingMethod'])
      .inputDataFormatByName(params['inputDataFormat'])
      .key(params['key'])
      .data(params['data'])
      .iv(params['iv'])
      .operationByName(params['operation'])
      .build();

    const key = CryptoJS.enc.Hex.parse(aesParameter.key);
    const iv = CryptoJS.enc.Hex.parse(aesParameter.iv);

    const data =
      aesParameter.inputDataFormat === Aes.InputDataFormat.Ascii
        ? CryptoJS.enc.Utf8.parse(aesParameter.data)
        : CryptoJS.enc.Hex.parse(aesParameter.data);

    const cipherBlockMode =
      aesParameter.blockCipherMode === Aes.CipherBlockMode.ECB
        ? CryptoJS.mode.ECB
        : CryptoJS.mode.ECB;

    const paddingMethod =
      aesParameter.paddingMethod === Aes.PaddingMethod.ISO9797_1_1
        ? CryptoJS.pad.ZeroPadding
        : CryptoJS.pad.Iso97971;

    const result =
      aesParameter.operation === Aes.AesOperation.Encrypt
        ? this.encrypt(
            data,
            aesParameter.inputDataFormat,
            key,
            iv,
            cipherBlockMode,
            paddingMethod
          )
        : this.decrypt(data, key, iv, cipherBlockMode, paddingMethod);

    console.log('aes result: ' + result);

    let logger = this.loggerService
      .start()
      .log('[' + new Date().toLocaleString('vn') + ']')
      .log('AES operation finished.')
      .log('*'.repeat(30))
      .logKeyValuePair('Key', aesParameter.key)
      .logKeyValuePair(
        'Algorithm',
        `${params['algorithm']} ${params['cipherBlockMode']}`
      )
      .logKeyValuePair('Operation', params['operation'])
      .logKeyValuePair('Data', params['data'])
      .logKeyValuePair('Padding Method', params['paddingMethod'])
      .log('*'.repeat(30))
      .logKeyValuePair(
        aesParameter.operation === Aes.AesOperation.Encrypt
          ? 'Encrypted data'
          : 'Decrypted data',
        result
      )
      .log(' ')
      .log(' ');

    logger.flush();
  }

  private encrypt(
    plaintext: any,
    inputDataFormat: Aes.InputDataFormat,
    key: any,
    iv: any,
    cipherBlockMode: CryptoJS.Mode,
    paddingMethod: CryptoJS.Padding
  ): string {
    let encrypted = CryptoJS.AES.encrypt(plaintext, key, {
      mode: cipherBlockMode,
      padding: paddingMethod,
      iv: iv,
    });

    console.log('key: ' + encrypted.key);
    console.log('iv: ' + encrypted.iv);
    console.log('salt: ' + encrypted.salt);
    console.log('ciphertext: ' + encrypted.ciphertext);
    console.log('encrypted: ' + encrypted);

    return encrypted.ciphertext;
  }

  private decrypt(
    cipher: any,
    key: any,
    iv: any,
    cipherBlockMode: CryptoJS.Mode,
    paddingMethod: CryptoJS.Padding
  ): string {
    console.log('decrypt cipher: ' + cipher);
    return CryptoJS.AES.decrypt(
      {
        ciphertext: cipher,
        salt: undefined,
        iv: iv,
      },
      key,
      {
        mode: cipherBlockMode,
        padding: paddingMethod,
        iv: iv,
      }
    ).toString();
  }
}
