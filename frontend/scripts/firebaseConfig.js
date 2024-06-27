import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { Platform } from "react-native";
/* google_services.json
{
  "project_info": {
    "project_number": "584045414447",
    "project_id": "react-native-challenge-regxi",
    "storage_bucket": "react-native-challenge-regxi.appspot.com"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "1:584045414447:android:72958f06c7863358be1eda",
        "android_client_info": {
          "package_name": "com.regxi.rnchallenge"
        }
      },
      "oauth_client": [],
      "api_key": [
        {
          "current_key": "AIzaSyCS_nfYGBo3MKDaf0biZS4wkrctkQrjmG0"
        }
      ],
      "services": {
        "appinvite_service": {
          "other_platform_oauth_client": []
        }
      }
    }
  ],
  "configuration_version": "1"
}
*/

const appIds = {
    android: "1:584045414447:android:72958f06c7863358be1eda",
    ios: "1:584045414447:ios:df915a8e514ec5d0be1eda",
}

const apiKeys = {
    android: "AIzaSyCS_nfYGBo3MKDaf0biZS4wkrctkQrjmG0",
    ios: "AIzaSyBPpqawDuAx0AkWBI7Hl6VhxSy4RY-WNfI",
}

const firebaseConfig = {
    apiKey: apiKeys[Platform.OS],
    authDomain: "react-native-challenge-regxi.firebaseapp.com",
    projectId: "react-native-challenge-regxi",
    storageBucket: "react-native-challenge-regxi.appspot.com",
    messagingSenderId: "584045414447",
    appId: appIds[Platform.OS],
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);