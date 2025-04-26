import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

export interface MapFile {
  file: File;
  position?: google.maps.LatLngLiteral;
  uid: string; // unique key
}

@Injectable({
  providedIn: 'root'
})

export class FileService {
  public filesSubject = new BehaviorSubject<MapFile[]>([]);
  files$ = this.filesSubject.asObservable();

  addFile(file: File, position?: google.maps.LatLngLiteral) {
    const current = this.filesSubject.value;
    this.filesSubject.next([...current, { file, position, uid: `${file.name}-${Date.now()}` }]);
  }

  clearFiles() {
    this.filesSubject.next([]);
  }

  // Add this method for safe updates
  updateFilePosition(uid: string, newPosition: google.maps.LatLngLiteral) {
    const files = this.filesSubject.value.map(f => {
      return f.uid === uid ? { ...f, position: newPosition } : f;
    });
    this.filesSubject.next(files);
  }
}
