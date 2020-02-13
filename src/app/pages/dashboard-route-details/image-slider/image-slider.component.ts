import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent {

  public pozicije: any = null;         // sve pozicije (tabovi)
  /* https://medium.com/@bharat.tiwari/intercept-input-property-change-in-angular-690567eb63ec */
  @Input() set pozicijeIn(val: any) {
    this.pozicije = val;
    // if (val.length) {
    //   this.loadSinglePosition(val[0].Sifra); // load first tab data (images)
    // }
  }

  private singlePosition: any = null;  // single tab - sve slike na jednoj poziciji\tabu
  @Input() set singlePositionIn(val: any) {
    this.activeImageIndex = 0;
    // console.log(`singlePositionIn`);
    // console.log(val);
    this.singlePosition = val;
  }

  private activeImageIndex = 0;                   // pomocna
  @Input() set activeImageIndexIn(val: any) {
    // console.log(`activeImageIndexIn ${val}`);
    this.activeImageIndex = val;
  }

  public route: any = null;
  @Input() set routeIn(val: any) {
    // console.log(`routeIn`);
    // console.log(val);
    this.route = val;
  }

  private isFullScreenSlider = null;             // pomocna, ui, fullscreen image slider
  // private pageDimmed = null;
  // @Input() set pageDimmedIn(val: any) {
  //   this.pageDimmed = val;
  // }
  // private segmentDimmed = true;
  // @Input() set segmentDimmedIn(val: any) {
  //   this.segmentDimmed = val;
  // }
  @Output() moveToNextImageAction = new EventEmitter();
  @Output() moveToPrevImageAction = new EventEmitter();
  @Output() isFullscreenSliderAction = new EventEmitter();

  private isDevMode = isDevMode();
  constructor() { }

  moveToNextImage($event) {
    console.log('moveToNextImage', $event);
    // this.dim();
    this.moveToNextImageAction.emit();
    console.log('moveToNextImage ... isFS?', this.isFullScreenSlider);
  }
  moveToPrevImage($event) {
    console.log('moveToPrevImage', $event);
    // this.dim();
    this.moveToPrevImageAction.emit();
    console.log('moveToPrevImage ... isFS?', this.isFullScreenSlider);
  }

  //

  clickFullScreenSliderToggle() {
    console.log('clickFullScreenSliderToggle');
    this.isFullScreenSlider = !this.isFullScreenSlider;
    this.isFullscreenSliderAction.emit(this.isFullScreenSlider);
    console.log('clickFullScreenSliderToggle', this.isFullScreenSlider);
    // this.isFullscreenSliderAction.emit();
  }

  swipeFullScreen(isFullscreen) {
    console.log('swipeFullScreen', isFullscreen);
    // this.isFullscreenSliderAction.emit(isFullscreen);
  }

  //

  /* dim page or segment */
  // dim() {
  //   this.pageDimmed = this.isFullScreenSlider;
  //   this.segmentDimmed = !this.isFullScreenSlider; // true only if not fullscreen slider
  //   console.log('dim...  isFS?', this.isFullScreenSlider, 'pageDimmed', this.pageDimmed, ' segmentDimmed', this.segmentDimmed);
  // }

  // /* undim page or segment */
  // unDim() {
  //   this.pageDimmed = false;
  //   this.segmentDimmed = false;
  //   console.log('unDim, isFullScreenSlider', this.isFullScreenSlider, 'page\\segm dimmed', this.pageDimmed, this.segmentDimmed);
  // }

}
