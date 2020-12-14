import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  loading = false;
  loader: any;
  progressLoadingMsg: string;
  successMsgForOrder: any;
  constructor(
    private loadingController: LoadingController,
    private translateService: TranslateService
  ) {
    console.log('services/common-service (CommonService)');
  }
  loadTranslations() {
    this.translateService
      .get(['REQUEST_SUBMITTED', 'progressLoadingMsg'])
      .subscribe((values) => {
        this.successMsgForOrder = values.REQUEST_SUBMITTED;
        this.progressLoadingMsg = values.progressLoadingMsg;
      });
  }
  /**
   * Method to show loading with msg input if message is not passed default Loading message is displayed.
   * @param message loading message
   * @param source
   */
  async showLoading(msg?: any, source?: any): Promise<any> {
    if (this.loading) {
      if (this.loader) {
        this.dismissLoading();
      }
    }
    if (msg) {
      this.loader = await this.loadingController.create({
        message: msg,
        spinner: 'crescent',
      });
    } else {
      this.loader = await this.loadingController.create({
        message: '',
        spinner: 'crescent',
      });
      this.loader.setContent(this.progressLoadingMsg);
    }
    this.loading = true;
    return this.loader.present();
  }

  dismissLoading(): void {
    if (this.loading && this.loader) {
      this.loader.dismiss();
      this.loading = false;
    }
  }


}
