export default [
  {
    'id': 1,
    'title': 'All Day Event',
    'allDay': true,
    'start': new Date(2015, 3, 0),
    'end': new Date(2015, 3, 1),
    'type': 'Event',
    'category': 'Other'
  },
  {
    'id': 2,
    'title': 'Long Event',
    'start': new Date(2015, 3, 7),
    'end': new Date(2015, 3, 10),
    'type': 'Event',
    'category': 'Other'
  },

  {
    'id': 3,
    'title': 'DTS STARTS',
    'start': new Date(2016, 2, 13, 0, 0, 0),
    'end': new Date(2016, 2, 20, 0, 0, 0),
    'type': 'Event',
    'category': 'Other'
  },

  {
    'id': 4,
    'title': 'DTS ENDS',
    'start': new Date(2016, 10, 6, 0, 0, 0),
    'end': new Date(2016, 10, 13, 0, 0, 0),
    'type': 'Event',
    'category': 'Other'
  },

  {
    'id': 5,
    'title': 'Some Event',
    'start': new Date(2015, 3, 9, 0, 0, 0),
    'end': new Date(2015, 3, 9, 0, 0, 0),
    'type': 'Event',
    'category': 'Other'
  },
  {
    'id': 6,
    'title': 'Conference',
    'start': new Date(2015, 3, 11),
    'end': new Date(2015, 3, 13),
    desc: 'Big conference for important people',
    'type': 'Event',
    'category': 'Other'
  },
  {
    'id': 7,
    'title': 'Meeting',
    'start': new Date(2015, 3, 12, 10, 30, 0, 0),
    'end': new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
    'type': 'Event',
    'category': 'Other'
  },
  {
    'id': 8,
    'title': 'Meeting',
    'start':new Date(2015, 3, 12,14, 0, 0, 0),
    'end': new Date(2015, 3, 12,15, 0, 0, 0),
    'type': 'Event',
    'category': 'Other'
  },
  {
    'id': 9,
    'title': 'Custom Task',
    'start':new Date(2015, 3, 12, 20, 0, 0, 0),
    'end': new Date(2015, 3, 12, 21, 0, 0, 0),
    'type': 'Task',
    'category': 'Other'
  },
  {
    'id': 10,
    'title': 'Video Conference with Doctor Smith',
    'start':new Date(2015, 3, 13, 15, 0, 0),
    'end': new Date(2015, 3, 13, 16, 30, 0),
    'type': 'Event',
    'category': 'Video Conference'
  },
  {
    'id': 11,
    'title': 'Weight Measurement',
    'start':new Date(2015, 3, 13, 10, 0, 0, 0),
    'end': new Date(2015, 3, 13, 13, 0, 0, 0),
    'type': 'Task',
    'category': 'Weight Measurement'
  },
  {
    'id': 12,
    'title': 'Weight Measurement',
    'start':new Date(2015, 3, 14, 10, 0, 0, 0),
    'end': new Date(2015, 3, 14, 13, 0, 0, 0),
    'type': 'Task',
    'category': 'Weight Measurement'
  },
  {
    'id': 13,
    'title': 'Weight Measurement',
    'start':new Date(2015, 3, 15, 10, 0, 0, 0),
    'end': new Date(2015, 3, 15, 13, 0, 0, 0),
    'type': 'Task',
    'category': 'Weight Measurement'
  },
  {
    'id': 14,
    'title': 'Weight Measurement',
    'start':new Date(2015, 3, 16, 10, 0, 0, 0),
    'end': new Date(2015, 3, 16, 13, 0, 0, 0),
    'type': 'Task',
    'category': 'Weight Measurement'
  },
  {
    'id': 15,
    'title': 'Weight Measurement',
    'start':new Date(2015, 3, 17, 10, 0, 0, 0),
    'end': new Date(2015, 3, 17, 13, 0, 0, 0),
    'type': 'Task',
    'category': 'Weight Measurement'
  },
  {
    'id': 16,
    'title': 'Take Medicine',
    'start':new Date(2015, 3, 13, 11, 0, 0),
    'end': new Date(2015, 3, 13, 14, 30, 0),
    'type': 'Task',
    'category': 'Take Medicine'
  },
  {
    'id': 17,
    'title': 'Take Medicine',
    'start':new Date(2015, 3, 13, 18, 0, 0),
    'end': new Date(2015, 3, 13, 20, 30, 0),
    'type': 'Task',
    'category': 'Take Medicine'
  },
  {
    'id': 18,
    'type': 'Task',
    'category': 'Heart Rate Measurement',
     "meta":[
        {
           "units":[
              "day"
           ],
           "after":28800000,
           "meta":[

           ],
           "before":36000000,
           "data":{
              "target":1
           }
        },
        {
           "units":[
              "day"
           ],
           "after":39600000,
           "meta":[

           ],
           "before":46800000,
           "data":{
              "target":1
           }
        },
        {
           "units":[
              "day"
           ],
           "after":55800000,
           "meta":[

           ],
           "before":61200000,
           "data":{
              "target":1
           }
        }
     ]
  }
]
