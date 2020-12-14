/**
 * Class to hold the constants related to JSONNetworkService
 */
import {Injectable} from '@angular/core';
@Injectable()
export class JSONServiceConstants {

    public static readonly PLANON_LOGINPAGE = '<meta name="application-name" content="planon-login-page"';
    public static readonly SUCCESS_PAGE_STRING = 'Currently mounted URL';
    public static readonly URL_SPLIT_DELIMITER = '://';
    public static readonly URL_VALIDATION_LOADER_MSG = 'Validating domain. Please wait...';
    public static readonly URL_VALIDATION_ERR_MSG = 'Invalid domain.';
}
