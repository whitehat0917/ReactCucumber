/* eslint-disable no-underscore-dangle */
import config from 'config';

class CustomAnalytics {
  constructor() {
    this.queue = [];
    // start timer for sending queue events. Will send al the existing events every 30 mins
    this._resetTimer();
    // listening for page unload events in order to send queued events when user closes tab
    window.addEventListener('unload', this._sendEvents.bind(this, true), false);
  }

  _resetTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(this._sendEvents, 30 * 60 * 1000);
  }

  _sendEvents = (beacon = false) => {
    if (this.queue.length) {
      if (!beacon) {
        fetch(`${config.apiUrl}/analytics/event/`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.queue),
        }).then((response) => {
          if (response.ok) {
            this.queue = [];
          }
        });
      } else if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(this.queue)], { type: 'text/plain; charset=UTF-8' });
        navigator.sendBeacon(`${config.apiUrl}/analytics/event/`, blob);
      }
    }

    this._resetTimer();
  }

  _pushEvent = (event) => {
    this.queue.push(event);
    if (this.queue.length >= 30) {
      this._sendEvents();
    }
  }

  // [{"name": "Profile View", "properties": {"ref": "[user_id]"}}]
  // EVENT_MAP = {"Artwork View": {"target_model": Artwork, "interaction_model": ArtworkView, "source": SOURCES.DEFAULT,
  // "interaction_type": INTERACTION_TYPES.VIEW},
  // "Artwork Share": {"target_model": Artwork,
  //                   "interaction_model": ArtworkShare, "source": SOURCES.DEFAULT,
  //                   "interaction_type": INTERACTION_TYPES.SHARE},
  // "Artwork Feed View": {"target_model": Artwork,
  //                       "interaction_model": ArtworkView, "source": SOURCES.FEED,
  //                       "interaction_type": INTERACTION_TYPES.FEEDVIEW},
  // "Profile View": {"target_model": User,
  //                  "interaction_model": UserView, "source": SOURCES.DEFAULT,
  //                  "interaction_type": INTERACTION_TYPES.VIEW},
  // "Profile Share": {"target_model": User,
  //                   "interaction_model": UserShare, "source": SOURCES.DEFAULT,
  //                   "interaction_type": INTERACTION_TYPES.SHARE},
  // "Profile Feed View": {"target_model": User,
  //                       "interaction_model": UserView, "source": SOURCES.FEED,
  //                       "interaction_type": INTERACTION_TYPES.FEEDVIEW},
  // }



  trackGA = (name, properties) => {
    this._pushEvent({
      name,
      properties,
    });
  }

  trackAmplitude = (name, data) => {
    const eventData = { name };
    if (data) {
      eventData.properties = data;
    }
    this._pushEvent(eventData);
  }
}

export default new CustomAnalytics();
