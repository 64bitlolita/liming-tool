import {Component} from '@angular/core';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent {

  hct: number = 29.2;

  prbcsToPump: number = 0;
  prbcsToAnesth: number = 0;
  totalPrbcs: number =0;

  totalVolumeProcessed: number = 0;
  totalACDUsed: number = 0;
  totalFieldVolume: number =0;

  epl: number = 0;
  tbl: number = 0;
  estIrrigation: number =0;

  totalNSUsed: number = 0;

  calculateTotalPrbcs(): void {

    if (isNaN(this.prbcsToPump) || isNaN(this.prbcsToAnesth)) {
      return;
    }

    this.totalPrbcs = (+this.prbcsToPump) + (+this.prbcsToAnesth);

    this.calculateIrrigation();
  }

  calculateTotalFieldVolume(): void {

    if (isNaN(this.totalVolumeProcessed) || isNaN(this.totalACDUsed)) {
      return;
    }

    this.totalFieldVolume = (+this.totalVolumeProcessed) - (+this.totalACDUsed);

    this.calculateIrrigation();
  }

  calculateIrrigation(): void {
    if (isNaN(this.hct) || +this.hct === 0) {
      return;
    }
    this.epl = Math.floor(this.totalPrbcs * 0.55 / this.hct * (100 - this.hct));
    this.tbl = Math.floor(this.epl + this.totalPrbcs / 2);

    this.estIrrigation = Math.ceil(this.totalFieldVolume - this.tbl);

  }
}
