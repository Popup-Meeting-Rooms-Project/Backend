const { sseEvents: sse } = require('../sse/sse')
const { dbWrite: db } = require('../db/dal')
const { mqttClientConfig, logger } = require('../config/config')
const mqtt = require('mqtt')
const mqttClient = mqtt.connect(mqttClientConfig.url, mqttClientConfig.options)

mqttClient.on('connect', function () {
  console.log(
    'mqtt/mqttClient Connected to Broker at URL ' + mqttClientConfig.url
  )
  logger.info(
    'mqtt/mqttClient Connected to Broker at URL ' + mqttClientConfig.url
  )

  const msg = {
    sensor: 'F4:G5:11:13',

    detected: true,
  }

  mqttClient.publish(mqttClientConfig.topic, JSON.stringify(msg), {})
})

mqttClient.on('error', function (error) {
  console.log('mqtt/mqttClient Broker error : ' + error)
  logger.warn('mqtt/mqttClient Broker error : ' + error)
})

mqttClient.subscribe(mqttClientConfig.topic)

// eslint-disable-next-line
mqttClient.on('message', function (topic, message, packet) {
  sse.newEvent(message)

  db.insert(message)
})
