import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { LoggerService, LoggerOutput } from '../shared/logger.service';

@Component({
  selector: 'app-logger-console',
  templateUrl: './logger-console.component.html',
  styleUrls: ['./logger-console.component.css']
})
export class LoggerConsoleComponent implements OnInit, LoggerOutput, AfterViewInit {
  @ViewChild('consoleContainer')
  private consoleContainer: ElementRef

  @ViewChildren('line')
  private lineElements: QueryList<any>


  messages: string[] = []

  constructor(
    private loggerService: LoggerService
  ) { 
    this.loggerService.registerLoggerOutput(this)
  }

  ngAfterViewInit(): void {
    this.lineElements.changes.subscribe(_ => this.onLinesChanged())
  }

  ngOnInit(): void {

  }

  print(messages: string[]): void {
    messages.forEach(_message => this.messages.push(_message))
  }

  private scrollToBottom(): void {
    this.consoleContainer.nativeElement.scroll({
      top: this.consoleContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    })
  }

  private onLinesChanged(): void {
    this.scrollToBottom()
  }

}
