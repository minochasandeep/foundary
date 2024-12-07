import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';


class AppInsights extends ApplicationInsights {
    public isInitlized = false;
    initilize(instrumentationKey: string) {
        this.config.instrumentationKey = instrumentationKey;
        this.loadAppInsights();
        this.isInitlized = true;
    }
}

const defaultBrowserHistory = {
    url: '/',
    location: { pathname: '' },
    listen: () => { },
} as any;

let browserHistory = defaultBrowserHistory;

if (typeof window !== 'undefined') {
    browserHistory = { ...browserHistory, ...window.history };
}

const reactPlugin = new ReactPlugin();
const appInsights = new AppInsights({
    config: {
        extensions: [reactPlugin],
        maxBatchSizeInBytes: 1000,
        maxBatchInterval: 15000,
        enableAutoRouteTracking: true,
        excludeRequestFromAutoTrackingPatterns: ['(\/session)'],
        disableInstrumentationKeyValidation: true,
        extensionConfig: {
            [reactPlugin.identifier]: { history: browserHistory }
        }
    }
});

export { reactPlugin, appInsights };