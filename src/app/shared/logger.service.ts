import { Injectable } from '@angular/core';

export interface LoggerOutput {
  print(messages: string[]): void
}

export class LoggerHelper {
  
  logBuffer: string[] = []

  constructor(private loggerService: LoggerService) { }

  log(firstMessage: string, ...restMessage: string[]): LoggerHelper {
    this.logBuffer.push(firstMessage)
    restMessage?.forEach(_message => this.logBuffer.push(_message))
    return this
  }

  logKeyValuePair(key: string, value: string): LoggerHelper {
    let space = ' '
    let numberOfSpaces = key.length < 20 ? 20 - key.length : 0
    this.logBuffer.push(`${key}:${space.repeat(numberOfSpaces)}${value}`)
    return this
  }

  flush(): void {
    this.loggerService.log(this.logBuffer)
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  loggerOutputs: LoggerOutput[] = []

  constructor() { }

  registerLoggerOutput(loggerOutput: LoggerOutput) {
    this.loggerOutputs.push(loggerOutput)
  }

  log(messages: string[]): void {
    this.loggerOutputs.forEach(_loggerOutput => _loggerOutput.print(messages))
  }

  start(): LoggerHelper {
    return new LoggerHelper(this)
  }
}
