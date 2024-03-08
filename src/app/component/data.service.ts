import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Data {
  data: string;
}
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private state$ = new BehaviorSubject<Data>({ data: 'default' });
  constructor() {}

  public setState(state: Data): void {
    this.state$.next(state);
  }
  public getState(): Observable<Data> {
    return this.state$.asObservable();
  }
}
