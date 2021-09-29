import React from "react";
import { ThingComponent } from "../utils/types";
import Components from '../../example/components';

type ComponentLibrary = {
    [key: string]: React.FunctionComponent<{ thingComponent: ThingComponent }>
}

const componentlib: ComponentLibrary = Components;
console.log(componentlib)
export default componentlib;