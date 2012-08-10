/*
 * Usefull utlities for your next project.
 *
 * @author	Jacob Groß <kurtextrem@gmail.com>
 * @package	JSUtilities
 * @version	1.0
 */

/**
 * Global namespace
 */
var cache = cache || {}
, dates = dates || {}
, notification = notification || {}


!function() {
	"use strict"; // jshint ;_;

	/**
	 * A cache system.
	 *
	 * cache.store
	 * cache.remove
	 * cache.clear
	 * cache.get
	 * cache.setType
	 *
	 * use cache.setType() befor doing anything with it.
	 */
	cache = {
		/**
		 * @var		storage	the storage object
		 */
		storage: 0,

		/**
		 * Stores "what" as "id" in the selected storage.
		 *
		 * @param	id	string
		 * @param	what	mixed
		 * @return	mixed
		 */
		store: function(id, what) {
			if (!this._storageWorking) return false
			return this.storage[id] = what
		},
		/**
		 * Removes "id" from the storage.
		 *
		 * @param	id	string
		 * @return	mixed
		 */
		remove: function(id) {
			if (!this._storageWorking) return false
			return this.storage.removeItem(id)
		},
		/**
		 * Clears the storage.
		 *
		 * @return	mixed
		 */
		clear: function() {
			if (!this._storageWorking) return false
			return this.storage.clear()
		},
		/**
		 * Returns "id" from the storage.
		 *
		 * @param	id	string
		 * @return	mixed
		 */
		get: function(id) {
			if (!this._storageWorking) return false
			return this.storage[id]
		},
		/**
		 * Sets the storage type.
		 * If no type is set it will initiate a new array, but most of the functions aren't working then.
		 *
		 * @param	which	string
		 * @return	bool
		 */
		setType: function(which) {
			switch (which) {
				case 'local':
					this.storage = window.localStorage
					break

				case 'session':
					this.storage = window.sessionStorage
					break

				default:
					this.storage = []
					break
			}

			return this._storageWorking()
		},
		/**
		 * Checks if the storage is working.
		 *
		 * @return	bool
		 */
		_storageWorking: function() {
			if (!this.storage) return false
			return true
		}
	}

	/**
	 * A notification system.
	 * Only webkit support at the moment.
	 *
	 * new notification()
	 *
	 * Must be initiated for every use.
	 *
	 * @param	url	string
	 * @param	title	string
	 * @param	content	string
	 * @param	howLong	int
	 */
	notification = function(url, title, content, howLong) {
		this.url = url
		this.title = title
		this.content = content
		this.howLong = parseInt(howLong) || 9000

		this.notificate()
	}
	notification.prototype = {
		/**
		 * The constructor.
		 */
		constructor: notification,

		/**
		 * @var		url		string
		 */
		url: '',
		/**
		 * @var		title		string
		 */
		title: '',
		/**
		 * @var		content		string
		 */
		content: '',
		/**
		 * @var		howLong		int
		 */
		howLong: 0,
		/**
		 * @var		notifications	mixed
		 */
		notifications: window.webkitNotifications || '',

		/**
		 * Notificates.
		 *
		 * @return	mixed
		 */
		notificate: function() {
			this.playSound()
			if (this.notifications != '' && this.notifications.checkPermission() == 0) return this.createNotification()

			return this.alert()
		},

		/**
		 * Creates the notification.
		 * Sorry firefox, your notification API is crap, so no support for your notifications here.
		 */
		createNotification: function() {
			var notification = this.notifications.createNotification(this.url, this.title, this.content)

			notification.show()

			window.setTimeout(function() {
				notification.cancel()
			}, this.howLong)
		},

		/**
		 * Alerts the user.
		 *
		 * @return	mixed
		 */
		alert: function() {
			return window.alert(this.content)
		},

		/**
		 * Plays a sound.
		 * 
		 * download this http://www.freesound.org/people/JustinBW/sounds/80921/
		 * <audio id="peep" src="assets/sounds/peep.wav" preload="auto"></audio>
		 */
		playSound: function() {
			window.document.getElementById('peep').play()
		}
	}

	/**
	 * A date parse system.
	 *
	 * new dates()
	 *
	 * Must be initiated for every use.
	 *
	 * @param	tc	mixed
	 * @return	mixed
	 */
	dates = function(tc) {
		if (tc) return this.date = new Date(tc)
		return this.date = new Date()
	}
	dates.prototype = {
		/**
		 * The constructor.
		 */
		constructor: dates,

		/**
		 * @var		date	mixed
		 */
		date: 0,

		/**
		 * Parses a date and returns the parsed date.
		 *
		 * @param	how	string
		 * @return	mixed
		 */
		parse: function(how) {
			return how.replace('H', this.getHours()).replace('i', this.getMinutes()).replace('d', this.getDay()).replace('m', this.getMonth()).replace('Y', this.getYear())
		},
		/**
		 * Returns the hours.
		 *
		 * @return	mixed
		 */
		getHours: function() {
			var hours = this.date.getHours()
			return (hours > 9) ? hours : '0' + hours
		},
		/**
		 * Returns the minutes.
		 *
		 * @return	mixed
		 */
		getMinutes: function() {
			var minutes = this.date.getMinutes()
			return (minutes > 9) ? minutes : '0' + minutes
		},
		/**
		 * Returns the day.
		 *
		 * @return	mixed
		 */
		getDay: function() {
			var days = this.date.getDate()
			return (days > 9) ? days : '0' + days
		},
		/**
		 * Returns the month.
		 *
		 * @return	mixed
		 */
		getMonth: function() {
			var months = this.date.getMonth()
			return (++months > 9) ? months : '0' + months
		},
		/**
		 * Returns the year.
		 *
		 * @return	mixed
		 */
		getYear: function() {
			return this.date.getFullYear()
		}
	}
}