import { getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { DatabaseService } from './Database.service'

class TemplateDatabaseService extends DatabaseService {
  constructor(collectionName: string) {
    super(collectionName)
  }
  createWithId = async (data, id): Promise<any> => {
    const docRef = this.getDocRef(id)
    return await setDoc(docRef, {
      ...data,
      id,
    })
  }
  getAll = async (type?: string, owner?: string): Promise<any> => {
    const collectionRef = this.getCollectionRef()
    const q = query(collectionRef, where('type', '==', type), where('owner', '==', owner))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => {
      return {
        id: doc.id, // append document id to each document
        ...doc.data(),
      }
    })
  }
  updateValue = async (id, value): Promise<any> => {
    const docRef = this.getDocRef(id)
    await updateDoc(docRef, {
      value,
    })
    return await this.getOneById(id)
  }
}

export const TemplateService = new TemplateDatabaseService('templates')
