import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class RiscvStateService {

  constructor() { 
    const oi = new RiscvState()
  }
}
