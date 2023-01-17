const fs = require('fs')

module.exports = {
  // Get drug by id
  getDrug: function getDrug(drugId) {
    return new Promise((resolve, reject) => {
      fs.readFile('./drugs.json', 'utf8', (error, data) => {
        if (error) {
          reject(error)
        } else {
          const drugs = JSON.parse(data)
          const drug = drugs.find((drug) => drug.id == drugId)
          resolve(drug || null)
        }
      })
    })
  },

  // get all drugs
  getDrugs: function getDrugs() {
    return new Promise((resolve, reject) => {
      fs.readFile('./drugs.json', 'utf8', (error, data) => {
        if (error) {
          reject(error)
        } else {
          const drugs = JSON.parse(data)
          resolve(drugs)
        }
      })
    })
  },

  // create one drug
  createDrug: function createDrug(drugData) {
    return new Promise((resolve, reject) => {
      fs.readFile('./drugs.json', 'utf8', (error, data) => {
        if (error) {
          reject(error)
        } else {
          const drugs = JSON.parse(data)
          drugs.push(drugData)
          fs.writeFile('./drugs.json', JSON.stringify(drugs), (error) => {
            if (error) {
              reject(error)
            } else {
              resolve()
            }
          })
        }
      })
    })
  },

  //delete one drug
  deleteDrug: function deleteDrug(drugId) {
    return new Promise((resolve, reject) => {
      fs.readFile('./drugs.json', 'utf8', (error, data) => {
        if (error) {
          reject(error)
        } else {
          let drugs = JSON.parse(data)
          drugs = drugs.filter((drug) => drug.id != drugId)
          fs.writeFile('./drugs.json', JSON.stringify(drugs), 'utf8', (error) => {
            if (error) {
              reject(error)
            } else {
              resolve()
            }
          })
        }
      })
    })
  },

  //update drugs
  updateDrug: function updateDrug(drugId, updatedDrug) {
    return new Promise((resolve, reject) => {
      fs.readFile('./drugs.json', 'utf8', (error, data) => {
        if (error) {
          reject(error)
        } else {
          const drugs = JSON.parse(data)
          const drugIndex = drugs.findIndex((drug) => drug.id == drugId)
          if (drugIndex === -1) {
            reject(new Error(`Drug with ID ${drugId} not found`))
          } else {
            drugs[drugIndex] = updatedDrug
            fs.writeFile('./drugs.json', JSON.stringify(drugs), (error) => {
              if (error) {
                reject(error)
              } else {
                resolve()
              }
            })
          }
        }
      })
    })
  }
}