import { ButtonInjector } from "./button-injector.js";
import { QualityTracker } from "./quality-tracker.js";

QualityTracker.listenForInterceptions();
ButtonInjector.startButtonObserver();