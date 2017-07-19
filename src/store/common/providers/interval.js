const intervals = {}

export default function IntervalProvider (context) {
  context.interval = {
    start(signal, interval) {
      if (!(signal in intervals)) {
        intervals[signal] = setInterval(() => context.controller.getSignal(signal)(), interval)
      }
    },
    stop(signal) {
      if (signal in intervals) {
        clearInterval(intervals[signal])
      }
    }
  }

  return context
}