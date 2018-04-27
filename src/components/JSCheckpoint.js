function getShow(name) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve({id: name.length, name })
        }, 10)
    })
}
class ViewTracker {
    constructor(name) {
        this.showName = name
        this.views = []
    }

    trackView = async () => {
        let show = await getShow(this.showName)
        const showObj = {
            ...show,
            'date': new Date(Date.now())
        }
        this.views.push(showObj)
        console.log("Pushed")
    }

    summary = () => {
        let summaryList = this.views.map((showObj) => {
            return `${showObj.name} (${showObj.id}) ${showObj.date}`
        })
        return summaryList
    }
}
const tracker = new ViewTracker('Friends')

setTimeout(tracker.trackView, 100)
setTimeout(tracker.trackView, 200)
setTimeout(tracker.trackView, 300)
setTimeout(() => {
    console.log(tracker.summary())
}, 400)

const tracker2 = new ViewTracker('Seinfeld')

setTimeout(tracker2.trackView, 100)
setTimeout(tracker2.trackView, 200)
setTimeout(tracker2.trackView, 300)
setTimeout(() => {
    console.log(tracker2.summary())
}, 400)