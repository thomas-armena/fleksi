import React from "react";
import { ThingComponent } from "../utils/types";

type ComponentLibrary = {
    [key: string]: React.FunctionComponent<{ thingComponent: ThingComponent }>
}

declare const Components: ComponentLibrary;

const componentlib: ComponentLibrary = Components;
export default componentlib;