import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { AesService } from '../shared/aes.service';
import * as texValidators from 'src/app/shared/text.validators';

function validateLength(aesService: AesService): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | any => {
    if (control.value) {
      const expectedLength =
        aesService.algorithmKeyLengthRequiredByName(
          control.parent.get('algorithm').value
        ) * 2;
      const valid = expectedLength === control.value.length;
      return valid ? null : { invalidLength: { value: control.value } };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-aes',
  templateUrl: './aes.component.html',
  styleUrls: ['./aes.component.css'],
})
export class AesComponent implements OnInit {
  algorithmNameList: string[];
  cipherBlockModeNameList: string[];
  paddingMethodNameList: string[];
  inputDataFormatNameList: string[];
  operationNameList: string[];

  aesForm: FormGroup;

  constructor(private fb: FormBuilder, private aesService: AesService) {}

  ngOnInit(): void {
    this.algorithmNameList = this.aesService.algorithmNameList();
    this.cipherBlockModeNameList = this.aesService.cipherBlockNameList();
    this.paddingMethodNameList = this.aesService.paddingMethodNameList();
    this.inputDataFormatNameList = this.aesService.inputDataFormatNameList();
    this.operationNameList = this.aesService.operationNameList();

    this.aesForm = this.fb.group({
      algorithm: [this.algorithmNameList[0], Validators.required],
      cipherBlockMode: [this.cipherBlockModeNameList[0], Validators.required],
      paddingMethod: [this.paddingMethodNameList[0], Validators.required],
      inputDataFormat: [this.inputDataFormatNameList[0], Validators.required],
      key: [
        '',
        [
          Validators.required,
          texValidators.validateFormat(/^[\da-fA-F]*$/),
          validateLength(this.aesService),
        ],
      ],
      data: ['', [Validators.required]],
      iv: ['0'.repeat(32), Validators.required],
      operation: [this.operationNameList[0], Validators.required],
    });
  }

  get key() {
    return this.aesForm.get('key');
  }

  get keyLengthRequired(): number {
    return this.aesService.algorithmKeyLengthRequiredByName(
      this.aesForm.get('algorithm').value
    );
  }

  get data() {
    return this.aesForm.get('data');
  }

  onSubmit() {
    this.aesService.execute({
      'algorithm': this.aesForm.get('algorithm').value,
      'cipherBlockMode': this.aesForm.get('cipherBlockMode').value,
      'paddingMethod': this.aesForm.get('paddingMethod').value,
      'inputDataFormat': this.aesForm.get('inputDataFormat').value,
      'key': this.aesForm.get('key').value,
      'data': this.aesForm.get('data').value,
      'iv': this.aesForm.get('iv').value,
      'operation': this.aesForm.get('operation').value
    })
  }
}
