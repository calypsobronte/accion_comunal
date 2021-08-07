
export async function getData() {
    const response = await fetch('http://localhost:3000/chart')
    // const response = await fetch('https://api.covid19api.com/total/dayone/country/mexico/status/confirmed')
    const data = await response.json()
    console.log(data);
    return data
  }
  
  export function sortByDate(data) {
    return import('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js')
    .then(() => {
      const gender = _.sortBy(Object.values(data.gender), ['date'])
      const department = _.sortBy(Object.values(data.department), ['date'])
      const user = _.sortBy(Object.values(data.user), ['date'])
      return {
        gender,
        department,
        user,
      }
    })
  }
  
  export async function getTotalCasesByDate() {
    const data = await getData()
    const dataByDate = {
        gender: {},
        department: {},
        user: {},
    }
    data.forEach((item) => {
      try {
        const cases = (dataByDate[item.Status][item.Date]) ? dataByDate[item.Status][item.Date].cases + item.Cases : item.Cases
        dataByDate[item.Status][item.Date] = {
          cases,
          date: `${item.Date}`,
        }
      } catch {
      }
    })
    return await sortByDate(dataByDate)
  }