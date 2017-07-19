import {AsyncStorage, ImageStore, ImageEditor} from 'react-native'

function getTimestampKey(key) {
    return 'ts_' + key
}

function getTimestamp() {
    return (new Date).getTime()
}

export default function LocalStorage(context) {
    context.localStorage = {
        put: async function put(key, value) {
            await AsyncStorage.setItem(key, value)
            await AsyncStorage.setItem(getTimestampKey(key), getTimestamp().toString())
        },
        get: async function get(key, timeoutSecs) {
            if (timeoutSecs) {
                let ts = await AsyncStorage.getItem(getTimestampKey(key))
                ts = parseFloat(ts)
                if (getTimestamp() > ts + timeoutSecs * 1000 ) {
                    return null
                }
            }
            let cachedValue = await AsyncStorage.getItem(key)
            return cachedValue
        },
        cropImage: async function cropImage(uri, cropData){
            let result = new Promise()
            await ImageEditor.cropImage(uri, 
                cropData,
                (successURI) => {
                    result.resolve(successURI)
                },
                (error) => {
                    result.reject(error)
                }
            )
            return result
        },
        getImage: async function getImage(uri) {
            let result = new Promise()
            return await ImageStore.getBase64ForTag(uri,
                (data) => {
                    result.resolve(data)
                },
                (error) => {
                    result.reject(error)
                }
            )
            return result
        }
    }
    return context
}