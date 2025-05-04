class TaskModel {
    constructor(db) {
      this.db = db;
      this.collection = 'tasks';
    }
  
    async getAll() {
      const snapshot = await this.db.collection(this.collection).get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getById(id) {
        const doc = await this.db.collection(this.collection).doc(id).get();
        if (!doc.exists) throw new Error("Task not found");
        return { id: doc.id, ...doc.data() };
      }
  
    async add(title) {
      const task = { 
        title, 
        completed: false, 
        createdAt: new Date().toISOString() 
      };
      const docRef = await this.db.collection(this.collection).add(task);
      return { id: docRef.id, ...task };
    }

    
  async toggleCompleted(id) {
    const docRef = this.db.collection(this.collection).doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      throw new Error("Task not found");
    }

    const currentStatus = doc.data().completed;
    await docRef.update({ completed: !currentStatus });
    
    return { id, ...doc.data(), completed: !currentStatus };
  }

  async delete(id) {
    const docRef = this.db.collection(this.collection).doc(id);
    await docRef.delete();
    return true;
  }
}
  
  
module.exports = TaskModel;