import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';

declare var $: any; // Needs jQuery to Work

@Component({
  selector: 'simple-image-upload',
  templateUrl: './simple-image-upload.component.html',
  styleUrls: ['./simple-image-upload.component.css']
})

export class SimpleImageUploadComponent implements OnInit, AfterViewInit {
  private imageFile;
  @Output() onFileReaded: EventEmitter<any> = new EventEmitter<any>();

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const $element = $(this.element.nativeElement);
    const input = $element.find('input');
    const $div = $element.find('div');

    input.on('change', (e) => {
      this.getImagesFromEvent(e);
      e.stopPropagation();
    }).on('click', (e) => {
      e.stopPropagation();
    });

    $div.on('drag dragstart dragend dragover dragenter dragleave drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
    })
      .on('dragover dragenter', () => {
        $div.addClass('is-dragover');
      })
      .on('dragleave dragend drop', () => {
        $div.removeClass('is-dragover');
      })
      .on('drop', (e) => {
        $element.find('input[type=\'file\']').prop('files', e.originalEvent.target.files || e.originalEvent.dataTransfer.files);
        this.getImagesFromEvent(e);
      })
      .on('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        input.trigger('click');
      });
  }

  getImagesFromEvent(event) {
    const files = event.originalEvent.target.files || event.originalEvent.dataTransfer.files;
    let count = 1;
    let image = null;

    for (const file of files) {
      if (file.type.match('image.*') !== null && count === 1) {
        image = file;
        count += 1;
      } else if (count > 1) {
        console.warn('This directive will only process 1 image every time');
      }
    }
    this.displayImage(image);
  }

  private displayImage(imagen) {
    const lector = this.generateReader(imagen);
    lector.readAsDataURL(imagen);
  }

  private generateReader(img) {
    const reader = new FileReader();
    reader.onload = ((file) => {
      return (e) => {
        this.imageFile = {
          source: e.target.result,
          file: file,
          name: file.name
        };
        this.onFileReaded.emit(this.imageFile);
      };
    })(img);

    return reader;
  }
}
