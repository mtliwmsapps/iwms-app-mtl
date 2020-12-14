import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserOptions } from '../../interfaces/user-options';
import { GlobalVariables } from '../../models/global-variables';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { JSONServiceConstants } from '../../models/jsonservice-constants';
import { CommonService } from '../../services/common.service';
import { Http } from '@angular/http';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})

export class LoginPage {
  private loginErrorString: string;
  //////////////////////////
  login: UserOptions = { username: '', password: '' };
  private errorTitle: string;
  private errorClose: string;
  private mandatoryMessage: string;
  private domainMandatoryMsg: string;
  private loginProgressMsg: string;
  public domain = '';
  private urlRegExp: any = new RegExp('^(http|https)://([a-z]|[A-Z]|[0-9])+');
  private intRegExp: any = new RegExp(/^\d+$/);
  public validURL: boolean;
  public inProgress: boolean;
  public validDomain: boolean;
  public passwordVisible: boolean;
  public username = '';
  public password = '';

  constructor(
    public router: Router,
    private translateService: TranslateService,
    private alertController: AlertController,
    private commonService: CommonService,
    private toastController: ToastController,
    public navCtrl: NavController,
    public http: Http
  ) {
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });
    translateService
      .get([
        'LOGIN_ALERT',
        'PASSWORD',
        'USERNAME',
        'ERRORCANCEL',
        'EMPTY_ERROR_LOGIN',
        'EMPTY_ERROR_LOGIN_DOMAIN',
        'LOGIN_PROGRESS_MSG',
      ])
      .subscribe((values) => {
        this.errorTitle = values.LOGIN_ALERT;
        this.errorClose = values.ERRORCANCEL;
        this.mandatoryMessage = values.EMPTY_ERROR_LOGIN;
        this.domainMandatoryMsg = values.EMPTY_ERROR_LOGIN_DOMAIN;
        this.loginProgressMsg = values.LOGIN_PROGRESS_MSG;
      });
    console.log('In cus : ' + GlobalVariables.lastUsedDomainURL);
    if (
      GlobalVariables.lastUsedDomainURL &&
      GlobalVariables.lastUsedDomainURL != null
    ) {
      this.domain = GlobalVariables.lastUsedDomainURL;
      this.validateURL();
    }
  }

  validateURL(): boolean {
    console.log('Validate URL clicked');

    let domainToTest = '';
    if (this.domain) {
      domainToTest = this.domain.toLocaleLowerCase();
      this.validURL = this.urlRegExp.test(domainToTest);
      return this.validURL;
    } else {
      return false;
    }
  }

  async validateDomain(): Promise<boolean> {
    this.inProgress = true;
    if (!this.validateURL()) {
      const alert = await this.alertController.create({
        header: this.errorTitle,
        message: this.domainMandatoryMsg,
        buttons: [
          {
            text: this.errorClose,
            handler: () => {},
          },
        ],
      });
      alert.present();
      this.validDomain = false;
    } else {
      this.domain = this.domain.trim();
      const domainSplit = this.domain.split(
        JSONServiceConstants.URL_SPLIT_DELIMITER
      );
      this.domain =
        domainSplit[0] +
        JSONServiceConstants.URL_SPLIT_DELIMITER +
        domainSplit[1].split('/')[0] +
        '/sdk';
      this.commonService
        .showLoading(JSONServiceConstants.URL_VALIDATION_LOADER_MSG)
        .then(() => {
          if (domainSplit[1].split(':').length > 1) {
            const portNumber: any = domainSplit[1].split(':')[1].split('/')[0];
            if (!this.intRegExp.test(portNumber)) {
              this.commonService.dismissLoading();
              this.presentToast(JSONServiceConstants.URL_VALIDATION_ERR_MSG);
              return;
            }
          }
          this.http.get(this.domain).subscribe(
            (res) => {
              const stringRes = '' + res.text();
              console.log('stringRes', stringRes);

              this.commonService.dismissLoading();
              if (
                stringRes.indexOf(JSONServiceConstants.PLANON_LOGINPAGE) >= 0 ||
                stringRes.indexOf(JSONServiceConstants.SUCCESS_PAGE_STRING) >= 0
              ) {
                this.validDomain = true;
                GlobalVariables.lastUsedDomainURL = this.domain;
              } else {
                this.commonService.dismissLoading();
                this.presentToast(JSONServiceConstants.URL_VALIDATION_ERR_MSG);
              }
            },
            (error) => {
              this.commonService.dismissLoading();
              this.presentToast(JSONServiceConstants.URL_VALIDATION_ERR_MSG);
            }
          );
        })
        .catch((e) => {
          console.log(e);
        });
    }

    this.inProgress = false;
    return this.validDomain;
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: 'dark',
      position: 'bottom',
      duration: 3000,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }


  async onLogin() {
    const usernameVal = this.username;
    const pwdVal = this.password;
    this.inProgress = true;
    if (!usernameVal || !pwdVal || !usernameVal.trim() || !pwdVal.trim()) {
      const alert = await this.alertController.create({
        header: this.errorTitle,
        message: this.mandatoryMessage,
        buttons: [
          {
            text: this.errorClose,
            handler: () => {},
          },
        ],
      });
      alert.present();
      this.inProgress = false;
    } else {
      this.router.navigateByUrl('/home');
    }
}


  // if (form.valid) {
    //   this.userData.login(this.login.username);
    //   this.router.navigateByUrl('/app/tabs/schedule');
    // }
onCancel(): void {
    this.inProgress = false;
    this.username = '';
    this.password = '';
    this.validDomain = false;
}

  togglePassword(passwordField): void {
    this.passwordVisible = !this.passwordVisible;
    passwordField.setFocus();
}

navigateToHome(): void {
  this.commonService.dismissLoading();
}

}
