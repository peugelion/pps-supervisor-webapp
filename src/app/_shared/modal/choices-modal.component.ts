import { Component } from '@angular/core';
import {SuiModal, ComponentModalConfig, ModalSize} from 'ng2-semantic-ui';

interface IRouteUnblockModalContext {
    title: string;
    question: string;
    // Fk_St_670: Array<Number>; // [6160, 6161, 6165];
    choicesArr: Array<any>; // [6160, 6161, 6165];
}

@Component({
    selector: 'app-choices-modal',
    templateUrl: './choices-modal.component.html',
    styleUrls: ['./choices-modal.component.css']
})
export class ChoicesModalComponent {
    eRadio;
    constructor(public modal: SuiModal<IRouteUnblockModalContext, void, void>) {}
}

//

export class RouteUnblockModal extends ComponentModalConfig<IRouteUnblockModalContext, void, void> {
    constructor(title: string, question: string, choicesArr: Array<any>, size = ModalSize.Normal) {
        super(ChoicesModalComponent, { title, question, choicesArr });

        this.isClosable = false;
        this.transitionDuration = 200;
        this.size = size;
        // this.isFullScreen = true;
        this.isClosable = true;
    }
}
