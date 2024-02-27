import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'barcode-scanner',
  templateUrl: './barcodeScanner.component.html',
  styleUrls: ['./barcodeScanner.component.scss'],
})
export class BarcodeScannerComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() openCam = false;

  @Output() sendCode = new EventEmitter<any>();

  scanActive = false;
  result = null;

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.startScanner();
  }

  ngAfterViewInit(): void {
    BarcodeScanner.prepare();
  }

  ngOnDestroy(): void {
    this.stopScanner();
  }

  async startScanner() {
    const allowed = await this.checkPermission();
    if (allowed) {
      this.scanActive = true;
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        this.scanActive = false;
        this.sendCode.emit(result.content);
        this.result = result.content;
      }
    }
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        const alert = await this.alertCtrl.create({
          header: 'No permission',
          message: 'Please allow camera access in your settings',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
            },
            {
              text: 'Open Settings',
              handler: () => {
                BarcodeScanner.openAppSettings();
                resolve(false);
              },
            },
          ],
        });
        await alert.present();
      } else {
        resolve(false);
      }
    });
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }
}
