import {GcpLogger} from "@yashghatti-auto/gcp-logging-client";


console.log("Hello");

const logger: GcpLogger = new GcpLogger("building-access-service");

logger.info("first message");