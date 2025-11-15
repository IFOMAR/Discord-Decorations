var e, s;
(s = e || (e = {})).LOAD = "LOAD",
s.EXEC = "EXEC",
s.FFPROBE = "FFPROBE",
s.WRITE_FILE = "WRITE_FILE",
s.READ_FILE = "READ_FILE",
s.DELETE_FILE = "DELETE_FILE",
s.RENAME = "RENAME",
s.CREATE_DIR = "CREATE_DIR",
s.LIST_DIR = "LIST_DIR",
s.DELETE_DIR = "DELETE_DIR",
s.ERROR = "ERROR",
s.DOWNLOAD = "DOWNLOAD",
s.PROGRESS = "PROGRESS",
s.LOG = "LOG",
s.MOUNT = "MOUNT",
s.UNMOUNT = "UNMOUNT";
const t = (()=>{
    let e = 0;
    return ()=>e++
}
)()
  , a = new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first")
  , r = new Error("called FFmpeg.terminate()");
class E {
    #e = null;
    #s = {};
    #t = {};
    #a = [];
    #r = [];
    loaded = !1;
    #E = ()=>{
        this.#e && (this.#e.onmessage = ({data: {id: s, type: t, data: a}})=>{
            switch (t) {
            case e.LOAD:
                this.loaded = !0,
                this.#s[s](a);
                break;
            case e.MOUNT:
            case e.UNMOUNT:
            case e.EXEC:
            case e.FFPROBE:
            case e.WRITE_FILE:
            case e.READ_FILE:
            case e.DELETE_FILE:
            case e.RENAME:
            case e.CREATE_DIR:
            case e.LIST_DIR:
            case e.DELETE_DIR:
                this.#s[s](a);
                break;
            case e.LOG:
                this.#a.forEach(e=>e(a));
                break;
            case e.PROGRESS:
                this.#r.forEach(e=>e(a));
                break;
            case e.ERROR:
                this.#t[s](a)
            }
            delete this.#s[s],
            delete this.#t[s]
        }
        )
    }
    ;
    #i = ({type: e, data: s},r=[],E)=>this.#e ? new Promise((a,i)=>{
        const o = t();
        this.#e && this.#e.postMessage({
            id: o,
            type: e,
            data: s
        }, r),
        this.#s[o] = a,
        this.#t[o] = i,
        E?.addEventListener("abort", ()=>{
            i(new DOMException(`Message # ${o} was aborted`,"AbortError"))
        }
        , {
            once: !0
        })
    }
    ) : Promise.reject(a);
    on(e, s) {
        "log" === e ? this.#a.push(s) : "progress" === e && this.#r.push(s)
    }
    off(e, s) {
        "log" === e ? this.#a = this.#a.filter(e=>e !== s) : "progress" === e && (this.#r = this.#r.filter(e=>e !== s))
    }
    load = ({classWorkerURL: s, ...t}={},{signal: a}={})=>(this.#e || (this.#e = s ? new Worker(new URL(s,import.meta.url),{
        type: "module"
    }) : new Worker(new URL("/assets/worker-BU9fmUEi.js",import.meta.url),{
        type: "module"
    }),
    this.#E()),
    this.#i({
        type: e.LOAD,
        data: t
    }, void 0, a));
    exec = (s,t=-1,{signal: a}={})=>this.#i({
        type: e.EXEC,
        data: {
            args: s,
            timeout: t
        }
    }, void 0, a);
    ffprobe = (s,t=-1,{signal: a}={})=>this.#i({
        type: e.FFPROBE,
        data: {
            args: s,
            timeout: t
        }
    }, void 0, a);
    terminate = ()=>{
        const e = Object.keys(this.#t);
        for (const s of e)
            this.#t[s](r),
            delete this.#t[s],
            delete this.#s[s];
        this.#e && (this.#e.terminate(),
        this.#e = null,
        this.loaded = !1)
    }
    ;
    writeFile = (s,t,{signal: a}={})=>{
        const r = [];
        return t instanceof Uint8Array && r.push(t.buffer),
        this.#i({
            type: e.WRITE_FILE,
            data: {
                path: s,
                data: t
            }
        }, r, a)
    }
    ;
    mount = (s,t,a)=>this.#i({
        type: e.MOUNT,
        data: {
            fsType: s,
            options: t,
            mountPoint: a
        }
    }, []);
    unmount = s=>this.#i({
        type: e.UNMOUNT,
        data: {
            mountPoint: s
        }
    }, []);
    readFile = (s,t="binary",{signal: a}={})=>this.#i({
        type: e.READ_FILE,
        data: {
            path: s,
            encoding: t
        }
    }, void 0, a);
    deleteFile = (s,{signal: t}={})=>this.#i({
        type: e.DELETE_FILE,
        data: {
            path: s
        }
    }, void 0, t);
    rename = (s,t,{signal: a}={})=>this.#i({
        type: e.RENAME,
        data: {
            oldPath: s,
            newPath: t
        }
    }, void 0, a);
    createDir = (s,{signal: t}={})=>this.#i({
        type: e.CREATE_DIR,
        data: {
            path: s
        }
    }, void 0, t);
    listDir = (s,{signal: t}={})=>this.#i({
        type: e.LIST_DIR,
        data: {
            path: s
        }
    }, void 0, t);
    deleteDir = (s,{signal: t}={})=>this.#i({
        type: e.DELETE_DIR,
        data: {
            path: s
        }
    }, void 0, t)
}
var i, o;
(o = i || (i = {})).MEMFS = "MEMFS",
o.NODEFS = "NODEFS",
o.NODERAWFS = "NODERAWFS",
o.IDBFS = "IDBFS",
o.WORKERFS = "WORKERFS",
o.PROXYFS = "PROXYFS";
export {i as FFFSType, E as FFmpeg};
