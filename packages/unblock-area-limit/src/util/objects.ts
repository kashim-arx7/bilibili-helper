import { Strings } from './strings'

export namespace Objects {
    export function convertKeyToSnakeCase<T>(obj: T): T {
        // log(typeof obj, Array.isArray(obj), obj)
        if (Array.isArray(obj)) {
            for (const item of obj) {
                convertKeyToSnakeCase(item)
            }
        } else if (typeof obj === 'object') {
            const o = obj as any;
            for (const key of Object.keys(o)) {
                const value = o[key]
                convertKeyToSnakeCase(value)
                o[Strings.toSnakeCase(key)] = value
            }
        }
        return obj // 该方法会修改传入的obj的内容, 返回obj只是为了调用方便...
    }

    export function stringify<T>(item: T) {
        if (typeof item === 'object') {
            try {
                return JSON.stringify(item)
            } catch (e) {
                console.debug(e)
                return `${item}`
            }
        } else {
            return item
        }
    }

    export function stringifyArray(arr: any[]) {
        return arr.map(stringify).join(' ')
    }
}