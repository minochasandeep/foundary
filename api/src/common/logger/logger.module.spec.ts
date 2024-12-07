import { Test } from "@nestjs/testing";
import { LoggerModule } from "./logger.module";
import Logger from "./logger";

describe("LoggerModule", () => {
    let logger: Logger;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [LoggerModule],
        }).compile();

        logger = await moduleRef.resolve<Logger>(Logger);
    });

    it("should provide the Logger service", () => {
        expect(logger).toBeDefined();
    });

});