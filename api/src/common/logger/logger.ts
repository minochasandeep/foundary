import { Logger as NestLogger, Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export default class Logger extends NestLogger {

    constructor() {
        super();
    }

    setContext(context: string) {
        this.context = context;
    }
}
