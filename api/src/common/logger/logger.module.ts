import { Global, Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import Logger from "./logger";

@Global()
@Module({
    imports: [
        WinstonModule.forRoot({
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            level: "info",
            exitOnError: false,
            transports: [
                new winston.transports.Console({ level: "verbose" }),
                //new winston.transports.File({ filename: "logs.log" }),
            ],
        })
    ],
    controllers: [],
    providers: [Logger],
    exports: [Logger],
})
export class LoggerModule { }