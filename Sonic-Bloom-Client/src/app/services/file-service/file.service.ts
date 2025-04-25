import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

export interface MapFile {
  file: File;
  position?: google.maps.LatLngLiteral;
}

@Injectable({
  providedIn: 'root'
})

export class FileService {
  private filesSubject = new BehaviorSubject<MapFile[]>([]);
  files$ = this.filesSubject.asObservable();

  addFile(file: File, position?: google.maps.LatLngLiteral) {
    const current = this.filesSubject.value;
    this.filesSubject.next([...current, { file, position }]);
  }

  clearFiles() {
    this.filesSubject.next([]);
  }
}
