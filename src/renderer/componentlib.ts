import React from "react";
import { ThingConfig } from "../thing";

interface ThingComponent {
    config: ThingConfig
}

type ComponentLibrary = {
    [key: string]: React.ComponentType<ThingComponent>
}
const componentlib: ComponentLibrary = Components;
export default componentlib;