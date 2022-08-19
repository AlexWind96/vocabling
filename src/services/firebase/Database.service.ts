import {
  Firestore,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from './firebase'

export class DatabaseService {
  private database: Firestore

  constructor(private collectionName: string) {
    this.database = db
  }

  // returns list of records as an array of javascript objects
  getAll = async (): Promise<any> => {
    const collectionRef = this.getCollectionRef()
    const snapshot = await getDocs(collectionRef)
    return snapshot.docs.map((doc) => {
      return {
        id: doc.id, // append document id to each document
        ...doc.data(),
      }
    })
  }

  // returns a single document in object format
  getOne = async ({ queryKey }) => {
    const { id } = queryKey[1]
    if (!id) return // entity form is in create mode
    const docRef = this.getDocRef(id)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      return snapshot.data()
    } else {
      throw new Error('No such document!')
    }
  }

  getOneById = async (id: string): Promise<any> => {
    const docRef = this.getDocRef(id)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      return snapshot.data()
    } else {
      throw new Error('No such document!')
    }
  }

  // resolve a relation, returns the referenced document
  getReference = async (documentReference) => {
    const res = await documentReference.get()
    const data = res.data()

    if (data && documentReference.id) {
      data.uid = documentReference.id
    }

    return data
  }

  getCollectionRef = () => {
    return collection(this.database, this.collectionName)
  }

  getDocRef = (id) => {
    return doc(this.database, this.collectionName, id)
  }

  // save a new document in the database
  create = async (data): Promise<any> => {
    const collectionRef = this.getCollectionRef()
    return await addDoc(collectionRef, {
      ...data,
      createdAt: Timestamp.now(),
    })
  }

  createWithId = async (data, id): Promise<any> => {
    const docRef = this.getDocRef(id)
    return await setDoc(docRef, {
      ...data,
      createdAt: Timestamp.now(),
      id,
    })
  }

  // update an existing document with new data
  update = async (id, values): Promise<any> => {
    const docRef = this.getDocRef(id)
    await updateDoc(docRef, {
      ...values,
      createdAt: Timestamp.now(),
    })
    return await this.getOneById(id)
  }

  // delete an existing document from the collection
  remove = async (id) => {
    const docRef = this.getDocRef(id)
    return await deleteDoc(docRef)
  }
  resetCount = async (id, count): Promise<any> => {
    const docRef = this.getDocRef(id)
    await updateDoc(docRef, {
      count,
    })
    return await this.getOneById(id)
  }
  incrementCount = async (id): Promise<any> => {
    const docRef = this.getDocRef(id)
    await updateDoc(docRef, {
      count: increment(1),
    })
    return await this.getOneById(id)
  }
}

// Create services for each entity type
export const WordsService = new DatabaseService('words')

export const UsersService = new DatabaseService('users')
