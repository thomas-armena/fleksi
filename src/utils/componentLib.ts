import React from "react";
import { ThingComponent } from "./types";
import Components from '../../example/components';

export type ComponentLibrary = {
    [key: string]: React.FunctionComponent<{ thingComponent: ThingComponent }>
}

const componentLib: ComponentLibrary = Components;
export default componentLib;