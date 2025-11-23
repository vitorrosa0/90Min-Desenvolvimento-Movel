import { collection, onSnapshot } from "firebase/firestore";
import firebase, { db } from "./firebase"

export default class StorageFirebase {
    listContents(onContentUpdate) {
        const ref = collection(db, "users");

        return onSnapshot(ref, (snapshot) => {
            const contents = [];
            snapshot.forEach((doc) => {
                const { email, nome } = doc.data();
                contents.push({ email, nome });
            });
            
            onContentUpdate(contents);
        });
    }
}