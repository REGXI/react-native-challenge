import { initializeApp, getApps, getApp } from "firebase/app";
import { FullMetadata, UploadTaskSnapshot, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
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
    windows: "",
    macos: "",
    web: "",
}

const apiKeys = {
    android: "AIzaSyCS_nfYGBo3MKDaf0biZS4wkrctkQrjmG0",
    ios: "AIzaSyBPpqawDuAx0AkWBI7Hl6VhxSy4RY-WNfI",
    windows: "",
    macos: "",
    web: "",
}

const firebaseConfig = {
    apiKey: apiKeys[Platform.OS],
    authDomain: "react-native-challenge-regxi.firebaseapp.com",
    projectId: "react-native-challenge-regxi",
    storageBucket: "react-native-challenge-regxi.appspot.com",
    messagingSenderId: "584045414447",
    appId: appIds[Platform.OS],
};

if (getApps().length == 0) {
  initializeApp(firebaseConfig);
}

const app = getApp();

export const uploadToFirebase = async (uri: string, name: string, onProgress?: ((snapshot: number) => any)) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(getStorage(), `images/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise<{downloadUrl: string, metadata: FullMetadata}>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};