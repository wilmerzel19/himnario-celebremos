import { storage } from "./firebaseConfig";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

export const uploadAudio = async (file) => {

  const storageRef = ref(storage, `tracks/${Date.now()}-${file.name}`);

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);

  return url;
};