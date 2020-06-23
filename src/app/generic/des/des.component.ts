import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DesService } from '../shared/des.service';
import * as textValidators from 'src/app/shared/text.validators';

function validateLength(desService: DesService): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
      if (control.value) {
          const expectedLength = desService.keyLengthRequiredByAlgorithm(control.parent.get('algorithm').value) * 2
          const valid = expectedLength === control.value.length
          return valid ? null : {'invalidLength': {value: control.value}}
      } else {
          return null
      }

  }
}

@Component({
  selector: 'app-des',
  templateUrl: './des.component.html',
  styleUrls: ['./des.component.css']
})
export class DesComponent implements OnInit {

  algorithmList: string[]
  cipherBlockModeList: string[]
  inputDataFormatList: string[]
  paddingMethodList: string[]
  operationList: string[]

  desForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private desService: DesService,
  ) {
    
   }

  ngOnInit(): void {
    this.algorithmList = this.desService.desAlgorithmNameList()
    this.cipherBlockModeList = this.desService.blockCipherModeNameList()
    this.inputDataFormatList = this.desService.inputDataFormatNameList()
    this.paddingMethodList = this.desService.paddingMethodNameList()
    this.operationList = this.desService.operationNameList()

    this.desForm = this.fb.group({
      algorithm: [this.algorithmList[0], Validators.required],
      cipherBlockMode: [this.cipherBlockModeList[0], Validators.required],
      inputDataFormat: [this.inputDataFormatList[0], Validators.required],
      paddingMethod: [this.paddingMethodList[0], Validators.required],
      key: ['',[
        Validators.required,
        textValidators.validateFormat(/^[\da-fA-F]*$/),
        validateLength(this.desService)
      ]],
      data: ['', Validators.required],
      iv: ['0000000000000000'],
      operation: [this.operationList[0], Validators.required]
    })
  }

  get keyLengthRequired(): number {
    return this.desService.keyLengthRequiredByAlgorithm(
      this.desForm.get('algorithm').value
    )
  }

  onSubmit() {
    this.desService.execute({
      "algorithm": this.desForm.get('algorithm').value,
      "cipherBlockMode": this.desForm.get('cipherBlockMode').value,
      "inputDataFormat": this.desForm.get('inputDataFormat').value,
      "paddingMethod": this.desForm.get('paddingMethod').value,
      "key": this.desForm.get('key').value,
      "data": this.desForm.get('data').value,
      "iv": this.desForm.get('iv').value,
      "operation": this.desForm.get('operation').value
    })
  }

  get key() {
    return this.desForm.get('key')
  }

  get data() {
    return this.desForm.get('data')
  }

}
