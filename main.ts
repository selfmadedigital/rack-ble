bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
let currentMinutes = ""
let currentHours = ""
let currentTemperature = ""
let currentTime: string[] = []
let currentData: string[] = []
let uartData = ""
OLED.init(128, 64)
bluetooth.startButtonService()
bluetooth.startUartService()
let strip = neopixel.create(DigitalPin.P2, 10, NeoPixelMode.RGB)
pins.digitalWritePin(DigitalPin.P1, 0)
smarthome.ledBrightness(AnalogPin.P3, false)
basic.forever(function () {
    strip.setPixelColor(4, neopixel.colors(NeoPixelColors.Red))
    basic.showString(uartData)
    if (input.buttonIsPressed(Button.A)) {
        pins.digitalWritePin(DigitalPin.P1, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P1, 0)
    }
    if (input.buttonIsPressed(Button.B)) {
        smarthome.ledBrightness(AnalogPin.P3, true)
    } else {
        smarthome.ledBrightness(AnalogPin.P3, false)
    }
})
control.inBackground(function () {
    uartData = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
    currentData = uartData.split("|")
    currentTime = currentData[0].split(":")
    currentTemperature = currentData[1]
    currentHours = currentTime[0]
    currentMinutes = currentTime[1]
})
