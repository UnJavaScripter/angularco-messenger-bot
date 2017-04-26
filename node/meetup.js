const fetch = require('node-fetch');

class Meetup {
  constructor(API_KEY){
    this.API_KEY = API_KEY;
    this.lastGroupResponse = undefined;
    this.lastEventpResponse = undefined;
  }

  _fetchGroup(groupName) {
    if(this.lastGroupResponse) {
      return new Promise((resolve, reject) => resolve(this.lastGroupResponse));
    }
    return  fetch(`https://api.meetup.com/${groupName}?&sign=true&photo-host=public?key=${this.API_KEY}`).then(r => r.json())
    .then(response => {
      this.lastGroupResponse = response;
      return new Promise((resolve, reject) => resolve(response));
    })
  }

  _fetchEvent(eventId) {
    if(this.lastEventResponse) {
      return new Promise((resolve, reject) => resolve(this.lastEventResponse));
    }

    return  fetch(`https://api.meetup.com/2/events/?offset=0&format=json&limited_events=False&event_id=${eventId}&photo-host=public&page=20&fields=&order=time&desc=false&status=upcoming&key=${this.API_KEY}`).then(r => r.json())
    .then(response => {
      this.lastEventResponse = response;
      return new Promise((resolve, reject) => resolve(response));
    })
  }

  getGroup(groupName) {
    return this._fetchGroup(groupName).then(group => {
      return new Promise((resolve, reject) => {
        resolve(group);
      })
    });
  }

  getNextEvent(groupName) {
    return this._fetchGroup(groupName).then(group => {
      return new Promise((resolve, reject) => {
        resolve(group.next_event);
      })
    });
  }

  getEventData(eventId) {
    return this._fetchEvent(eventId).then(event => {
      return new Promise((resolve, reject) => {
        resolve(event);
      })
    });
  }


}

module.exports = Meetup;
module.exports.default = module.exports;