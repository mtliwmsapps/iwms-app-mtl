/**
 * Class to hold the constants related to JSONNetworkService
 */
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable()
export class GlobalVariables {
    public static loggedIn = false;
    public static masterDataLoaded = false;
    public static backgroundSynchInProgress = false;
    public static extScannerSubscription: Subscription;
    public static keyboardOpen = false;
    public static loginIconName = 'log-in';
    public static lastUsedDomainURL = '';


    public static resetAll() {
        this.loggedIn = false;
        this.masterDataLoaded = false;
        this.backgroundSynchInProgress = false;
        this.keyboardOpen = false;
        if (this.extScannerSubscription) {
            this.extScannerSubscription.unsubscribe();
        }
    }
}
