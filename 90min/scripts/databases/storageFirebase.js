import firebase from "./firebase"

export default class StorageFirebase {
    listContents(onContentUpdate) {
        firebase.firestore.collections("user").onSnapshot(
            (query) => {
                let contents = [];//vetor temporario
                query.forEach((doc) => { 

                    const { email, nome } = doc.data(); // filtragem de campos
                    contents.push({email, nome}); // preenche o vetor
                });
                onContentUpdate(contents);
            }
        )
    }
}