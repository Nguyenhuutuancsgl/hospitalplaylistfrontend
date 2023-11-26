import EventEmitter from "events";

const _emitter = new EventEmitter();
_emitter.setMaxListeners(0) //ko gh số người nghe

export const emitter = _emitter;

//cấu hình emitter giúp fire event ( làm sạch cái ModalUser sau mỗi lần add new)