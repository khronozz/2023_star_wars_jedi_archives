import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent {

  @Input() name: string | null = null;
  @Input() type: string | null = null;
  @Input() url: string | null = null;
  @Output() onShowDetails = new EventEmitter<void>();

  onShowDetailsClick(): void {
    this.onShowDetails.emit();
  }
}
