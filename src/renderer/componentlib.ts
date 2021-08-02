import React from "react";
import { ThingConfig } from "../thing";

interface ThingComponent {
    config: ThingConfig
}

declare const Components: ComponentLibrary;

type ComponentLibrary = {
    [key: string]: React.ComponentType<ThingComponent>
}

const componentlib: ComponentLibrary = Components;
export default componentlib;