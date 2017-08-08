
const calendarClassMap = (event) => {
  return {
    'rbc-event-weight': event.category === 'Weight Measurement',
    'rbc-event-heartrate': event.category === 'Heart Rate Measurement',
    'rbc-event-medicine': event.category === 'Take Medicine'
  }
};

export default calendarClassMap;
